"""
LiveKit Live Interpreter Agent

===============================

A real-time, two-way voice interpreter using DeepL for translation and ElevenLabs TTS.

The agent is instructed by the application on which two languages to translate between.
"""
import asyncio
import logging
import os
import sys
import textwrap
import uuid
from dataclasses import dataclass
from typing import Optional

import httpx
from dotenv import load_dotenv
from livekit import agents
from livekit.agents import APIConnectionError, APIStatusError, Agent, AgentSession
from livekit.agents.tts import ChunkedStream, TTSCapabilities, TTS
from livekit.plugins import deepgram, silero

# Load environment variables
load_dotenv(".env")

# Enable detailed logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stdout
)
logger = logging.getLogger(__name__)

# A simple helper to make prompts more human-readable for the LLM
LANGUAGE_MAP = {
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
    "it": "Italian",
    "pt": "Portuguese",
    "ru": "Russian",
    "ja": "Japanese",
    "ko": "Korean",
    "zh": "Chinese",
    "ar": "Arabic",
    "hi": "Hindi",
    "tr": "Turkish",
    "nl": "Dutch",
    "sv": "Swedish",
}

DEEPL_LANGUAGE_OVERRIDES = {
    "en": "EN",
    "en-us": "EN-US",
    "en-gb": "EN-GB",
    "fr": "FR",
    "es": "ES",
    "de": "DE",
    "it": "IT",
    "pt": "PT-PT",
    "pt-pt": "PT-PT",
    "pt-br": "PT-BR",
    "ru": "RU",
    "ja": "JA",
    "zh": "ZH",
    "zh-cn": "ZH",
    "zh-tw": "ZH",
    "ko": "KO",
    "ar": "AR",
    "hi": "HI",
    "tr": "TR",
    "nl": "NL",
    "sv": "SV",
}


def _to_deepl_code(code: str) -> Optional[str]:
    if not code:
        return None
    normalized = code.strip().lower()
    if normalized in DEEPL_LANGUAGE_OVERRIDES:
        return DEEPL_LANGUAGE_OVERRIDES[normalized]
    if len(normalized) == 2:
        return normalized.upper()
    if "-" in normalized:
        parts = normalized.split("-")
        return "-".join([parts[0].upper(), parts[1].upper()])
    return normalized.upper()


def _lang_matches(a: Optional[str], b: Optional[str]) -> bool:
    if not a or not b:
        return False
    a_norm = a.upper()
    b_norm = b.upper()
    if a_norm == b_norm:
        return True
    return a_norm.split("-")[0] == b_norm.split("-")[0]


@dataclass
class TranslationResult:
    text: str
    detected_source_language: Optional[str]


class DeepLTranslator:
    """Minimal async DeepL client."""

    def __init__(
        self,
        *,
        api_key: str,
        lang1_code: str,
        lang2_code: str,
        base_url: str,
        timeout_seconds: float = 15.0,
    ) -> None:
        self._api_key = api_key
        self._lang1_code = lang1_code.lower()
        self._lang2_code = lang2_code.lower()
        self._lang1_deepl = _to_deepl_code(lang1_code)
        self._lang2_deepl = _to_deepl_code(lang2_code)
        if not self._lang1_deepl or not self._lang2_deepl:
            raise ValueError(
                f"Unsupported language mapping for DeepL (lang1={lang1_code}, lang2={lang2_code})"
            )
        self._base_url = base_url.rstrip("/")
        self._timeout = httpx.Timeout(timeout_seconds)
        self._lock = asyncio.Lock()

    async def translate(self, text: str) -> Optional[str]:
        cleaned = text.strip()
        if not cleaned:
            return None

        async with self._lock:
            first = await self._request(
                text=cleaned,
                target_lang=self._lang2_deepl,
            )
            if not first:
                return None

            detected = first.detected_source_language
            if _lang_matches(detected, self._lang1_deepl):
                return first.text

            if _lang_matches(detected, self._lang2_deepl):
                second = await self._request(
                    text=cleaned,
                    target_lang=self._lang1_deepl,
                )
                if second and _lang_matches(
                    second.detected_source_language, self._lang2_deepl
                ):
                    return second.text
                return None

            logger.info(
                "DeepL detected unsupported language '%s'; suppressing response",
                detected,
            )
            return None

    async def _request(
        self,
        *,
        text: str,
        target_lang: str,
    ) -> Optional[TranslationResult]:
        headers = {"Authorization": f"DeepL-Auth-Key {self._api_key}"}
        data = {
            "text": text,
            "target_lang": target_lang,
            "preserve_formatting": "1",
        }

        try:
            async with httpx.AsyncClient(timeout=self._timeout) as client:
                response = await client.post(
                    self._base_url,
                    data=data,
                    headers=headers,
                )
                response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            logger.error(
                "DeepL translation failed with status %s: %s",
                exc.response.status_code,
                exc.response.text,
            )
            return None
        except httpx.RequestError as exc:
            logger.error("DeepL translation request error: %s", exc)
            return None

        payload = response.json()
        translations = payload.get("translations") or []
        if not translations:
            logger.warning("DeepL translation returned empty response")
            return None

        first = translations[0]
        return TranslationResult(
            text=first.get("text", "").strip(),
            detected_source_language=first.get("detected_source_language"),
        )


class ElevenLabsChunkedStream(ChunkedStream):
    def __init__(
        self,
        *,
        tts: "ElevenLabsTTS",
        input_text: str,
        conn_options,
        client: httpx.AsyncClient,
        api_key: str,
        voice_id: str,
        model_id: str,
        base_url: str,
        voice_settings: dict,
        format_mime: str,
    ):
        super().__init__(tts=tts, input_text=input_text, conn_options=conn_options)
        self._client = client
        self._api_key = api_key
        self._voice_id = voice_id
        self._model_id = model_id
        self._base_url = base_url.rstrip("/")
        self._voice_settings = voice_settings
        self._format_mime = format_mime

    async def _run(self, output_emitter) -> None:
        text = self.input_text.strip()
        if not text:
            output_emitter.initialize(
                request_id=str(uuid.uuid4()),
                sample_rate=self._tts.sample_rate,
                num_channels=self._tts.num_channels,
                mime_type=self._format_mime,
            )
            return

        url = (
            f"{self._base_url}/v1/text-to-speech/{self._voice_id}/stream"
        )
        headers = {
            "xi-api-key": self._api_key,
            "accept": self._format_mime,
        }
        payload = {
            "text": text,
            "model_id": self._model_id,
            "voice_settings": self._voice_settings,
        }

        try:
            async with self._client.stream(
                "POST",
                url,
                headers=headers,
                json=payload,
                timeout=self._conn_options.timeout,
            ) as response:
                response.raise_for_status()
                request_id = (
                    response.headers.get("x-request-id")
                    or response.headers.get("request-id")
                    or str(uuid.uuid4())
                )
                output_emitter.initialize(
                    request_id=request_id,
                    sample_rate=self._tts.sample_rate,
                    num_channels=self._tts.num_channels,
                    mime_type=self._format_mime,
                )
                async for chunk in response.aiter_bytes():
                    if chunk:
                        output_emitter.push(chunk)
        except httpx.HTTPStatusError as exc:
            raise APIStatusError(
                "ElevenLabs TTS request failed",
                status_code=exc.response.status_code,
                body=exc.response.text,
            ) from exc
        except httpx.RequestError as exc:
            raise APIConnectionError(
                f"Failed to reach ElevenLabs TTS service: {exc}"
            ) from exc


class ElevenLabsTTS(TTS):
    def __init__(
        self,
        *,
        api_key: str,
        voice_id: str,
        model_id: str = "eleven_multilingual_v2",
        base_url: str = "https://api.elevenlabs.io",
        sample_rate: int = 44100,
        num_channels: int = 1,
        stability: float = 0.5,
        similarity_boost: float = 0.75,
        style: float = 0.0,
        use_speaker_boost: bool = True,
        output_format: str = "audio/mpeg",
    ) -> None:
        super().__init__(
            capabilities=TTSCapabilities(streaming=False),
            sample_rate=sample_rate,
            num_channels=num_channels,
        )
        self._api_key = api_key
        self._voice_id = voice_id
        self._model_id = model_id
        self._base_url = base_url.rstrip("/")
        self._voice_settings = {
            "stability": stability,
            "similarity_boost": similarity_boost,
            "style": style,
            "use_speaker_boost": use_speaker_boost,
        }
        self._format_mime = output_format
        self._client = httpx.AsyncClient(http2=False)

    @property
    def provider(self) -> str:
        return "ElevenLabs"

    @property
    def model(self) -> str:
        return self._model_id

    def synthesize(
        self, text: str, *, conn_options=agents.DEFAULT_API_CONNECT_OPTIONS
    ) -> ChunkedStream:
        return ElevenLabsChunkedStream(
            tts=self,
            input_text=text,
            conn_options=conn_options,
            client=self._client,
            api_key=self._api_key,
            voice_id=self._voice_id,
            model_id=self._model_id,
            base_url=self._base_url,
            voice_settings=self._voice_settings,
            format_mime=self._format_mime,
        )

    async def aclose(self) -> None:
        await self._client.aclose()

class Interpreter(Agent):
    """
    This agent is a silent, two-way interpreter. It does not have conversations.
    It listens for one of two specified languages and translates to the other.
    """

    def __init__(
        self,
        lang1_code: str,
        lang2_code: str,
        translator: DeepLTranslator,
    ):
        self.lang1_code = lang1_code.lower()
        self.lang2_code = lang2_code.lower()
        self._translator = translator
        self._translation_lock = asyncio.Lock()
        lang1_name = LANGUAGE_MAP.get(self.lang1_code, lang1_code)
        lang2_name = LANGUAGE_MAP.get(self.lang2_code, lang2_code)
        instructions = textwrap.dedent(f"""
            You are an expert, real-time AI language interpreter.
            Your sole function is to translate between {lang1_name} ({lang1_code}) and {lang2_name} ({lang2_code}).

            - When you receive text in {lang1_name}, you MUST translate it to {lang2_name}.
            - When you receive text in {lang2_name}, you MUST translate it to {lang1_name}.
            - Your response MUST be ONLY the translated text and nothing else.
            - Do not add any commentary, greetings, or explanations.
            - If the input is not in {lang1_name} or {lang2_name}, do not produce any output. Remain silent.
            - Keep translations concise and natural for spoken conversation.
            - If the translation service is unavailable or uncertain, remain silent.
        """).strip()
        super().__init__(instructions=instructions)

    @staticmethod
    def _latest_user_text(chat_ctx) -> Optional[str]:
        for item in reversed(chat_ctx.items):
            if getattr(item, "type", None) == "message" and getattr(item, "role", None) == "user":
                if hasattr(item, "text_content"):
                    return item.text_content
                content = getattr(item, "content", [])
                if isinstance(content, list):
                    for part in content:
                        if isinstance(part, str):
                            return part
        return None

    async def llm_node(self, chat_ctx, tools, model_settings):
        text = self._latest_user_text(chat_ctx)
        if not text:
            return

        try:
            async with self._translation_lock:
                translation = await self._translator.translate(text)
        except Exception as exc:
            logger.exception("Translation failed: %s", exc)
            return

        if translation:
            yield translation

async def entrypoint(ctx: agents.JobContext):
    """Entry point for the agent."""
    try:
        logger.info("=" * 60)
        logger.info("AGENT JOB RECEIVED - Starting interpreter agent")
        logger.info(f"Job ID: {ctx.job.id if hasattr(ctx.job, 'id') else 'unknown'}")
        logger.info(f"Room: {ctx.room.name if hasattr(ctx.room, 'name') else 'unknown'}")
        
        # The agent gets its instructions from the job metadata
        metadata = ctx.job.metadata
        logger.info(f"Job metadata: {metadata}")
        
        if not metadata:
            error_msg = "Job metadata is required to specify languages (e.g., 'ar,fr')"
            logger.error(error_msg)
            raise ValueError(error_msg)

        languages = metadata.split(',')
        if len(languages) != 2:
            error_msg = f"Expected 2 languages in metadata, got {len(languages)}. Metadata: '{metadata}'"
            logger.error(error_msg)
            raise ValueError(error_msg)

        lang1, lang2 = languages[0].strip(), languages[1].strip()
        logger.info(f"Starting interpreter agent for {lang1} <-> {lang2}")

        # Check and log environment variables
        deepl_api_key = os.getenv("DEEPL_API_KEY")
        if not deepl_api_key:
            error_msg = "DEEPL_API_KEY environment variable is required"
            logger.error(error_msg)
            raise ValueError(error_msg)
        logger.info("DEEPL_API_KEY found")

        deepl_api_url = os.getenv("DEEPL_API_URL", "https://api-free.deepl.com/v2/translate")

        elevenlabs_api_key = os.getenv("ELEVENLABS_API_KEY")
        if not elevenlabs_api_key:
            error_msg = "ELEVENLABS_API_KEY environment variable is required"
            logger.error(error_msg)
            raise ValueError(error_msg)
        logger.info("ELEVENLABS_API_KEY found")

        elevenlabs_voice_id = os.getenv("ELEVENLABS_VOICE_ID")
        if not elevenlabs_voice_id:
            error_msg = "ELEVENLABS_VOICE_ID environment variable is required"
            logger.error(error_msg)
            raise ValueError(error_msg)
        logger.info("ELEVENLABS_VOICE_ID found")

        elevenlabs_model_id = os.getenv("ELEVENLABS_MODEL_ID", "eleven_multilingual_v2")
        elevenlabs_base_url = os.getenv("ELEVENLABS_BASE_URL", "https://api.elevenlabs.io")

        def _float_env(name: str, default: float) -> float:
            raw = os.getenv(name)
            if raw is None:
                return default
            try:
                return float(raw)
            except ValueError:
                logger.warning("Invalid %s value '%s'; falling back to %s", name, raw, default)
                return default

        stability = _float_env("ELEVENLABS_STABILITY", 0.5)
        similarity_boost = _float_env("ELEVENLABS_SIMILARITY", 0.75)
        style = _float_env("ELEVENLABS_STYLE", 0.0)
        use_speaker_boost = os.getenv("ELEVENLABS_SPEAKER_BOOST", "true").lower() != "false"

        # Initialize translation and TTS services
        translator = DeepLTranslator(
            api_key=deepl_api_key,
            lang1_code=lang1,
            lang2_code=lang2,
            base_url=deepl_api_url,
        )
        logger.info("DeepL translator initialized")

        tts = ElevenLabsTTS(
            api_key=elevenlabs_api_key,
            voice_id=elevenlabs_voice_id,
            model_id=elevenlabs_model_id,
            base_url=elevenlabs_base_url,
            stability=stability,
            similarity_boost=similarity_boost,
            style=style,
            use_speaker_boost=use_speaker_boost,
        )
        logger.info("ElevenLabs TTS initialized successfully")

        # Initialize session components
        logger.info("Initializing agent session components...")
        deepgram_api_key = os.getenv("DEEPGRAM_API_KEY")
        if not deepgram_api_key:
            error_msg = "DEEPGRAM_API_KEY environment variable is required"
            logger.error(error_msg)
            raise ValueError(error_msg)
        logger.info("DEEPGRAM_API_KEY found")

        stt_model = "nova-3"
        stt_language = "multi"
        logger.info(f"Initializing Deepgram STT... (model={stt_model}, language={stt_language})")
        stt = deepgram.STT(model=stt_model, language=stt_language, api_key=deepgram_api_key)
        logger.info("Deepgram STT initialized successfully")
        logger.info("  - STT: Deepgram (nova-3, multi-language)")
        logger.info("  - Translation: DeepL")
        logger.info("  - TTS: ElevenLabs")
        logger.info("  - VAD: Silero")
        
        session = AgentSession(
            stt=stt,
            tts=tts,
            vad=silero.VAD.load(),
        )
        logger.info("Agent session components initialized")

        # Create the interpreter agent
        logger.info("Creating Interpreter agent instance...")
        interpreter_agent = Interpreter(
            lang1_code=lang1,
            lang2_code=lang2,
            translator=translator,
        )
        logger.info("Interpreter agent created")

        # Start the session and join the room
        logger.info(f"Starting session and joining room: {ctx.room.name}")
        logger.info("This may take a few seconds...")
        
        await session.start(
            room=ctx.room,
            agent=interpreter_agent
        )
        
        logger.info("=" * 60)
        logger.info("✅ AGENT SUCCESSFULLY JOINED THE ROOM")
        logger.info(f"Room: {ctx.room.name}")
        logger.info(f"Languages: {lang1} <-> {lang2}")
        logger.info("Agent is now listening for speech and will translate in real-time")
        logger.info("=" * 60)
        
        # No greeting, the agent joins silently.
        
    except Exception as e:
        logger.error("=" * 60)
        logger.error(f"❌ ERROR IN AGENT ENTRYPOINT: {type(e).__name__}")
        logger.error(f"Error message: {str(e)}")
        logger.error(f"Room: {ctx.room.name if hasattr(ctx, 'room') else 'unknown'}")
        logger.error("=" * 60)
        raise

if __name__ == "__main__":
    logger.info("=" * 60)
    logger.info("Starting LiveKit Agent Worker")
    logger.info("Agent Name: interpreter-agent")
    logger.info("=" * 60)
    
    # Check environment variables
    livekit_url = os.getenv("LIVEKIT_URL")
    livekit_key = os.getenv("LIVEKIT_API_KEY")
    livekit_secret = os.getenv("LIVEKIT_API_SECRET")
    
    logger.info(f"LIVEKIT_URL: {'SET' if livekit_url else 'MISSING'}")
    logger.info(f"LIVEKIT_API_KEY: {'SET' if livekit_key else 'MISSING'}")
    logger.info(f"LIVEKIT_API_SECRET: {'SET' if livekit_secret else 'MISSING'}")
    
    if not all([livekit_url, livekit_key, livekit_secret]):
        logger.error("Missing required LiveKit environment variables!")
        sys.exit(1)
    
    logger.info("Environment variables check passed")
    logger.info("=" * 60)
    logger.info("Waiting for agent jobs...")
    logger.info("The worker is now connected to LiveKit and ready to receive jobs")
    logger.info("=" * 60)
    
    # This name MUST match the agent_name in your API route
    # The CLI will handle the "start" command automatically
    try:
        agents.cli.run_app(
            agents.WorkerOptions(
                entrypoint_fnc=entrypoint,
                agent_name="interpreter-agent"
            )
        )
    except KeyboardInterrupt:
        logger.info("Agent worker stopped by user")
    except Exception as e:
        logger.error(f"Fatal error in agent worker: {type(e).__name__}: {str(e)}")
        raise

