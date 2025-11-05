"""
LiveKit Live Interpreter Agent

===============================

A real-time, two-way voice interpreter using Google Gemini and Cartesia TTS.

The agent is instructed by the application on which two languages to translate between.
"""
from dotenv import load_dotenv
from livekit import agents
from livekit.agents import Agent, AgentSession
from livekit.plugins import deepgram, silero, google, cartesia
import os

# Load environment variables
load_dotenv(".env")

# A simple helper to make prompts more human-readable for the LLM
LANGUAGE_MAP = {
    "en": "English", "es": "Spanish", "fr": "French", "de": "German",
    "it": "Italian", "pt": "Portuguese", "ru": "Russian", "ja": "Japanese",
    "ko": "Korean", "zh": "Chinese", "ar": "Arabic", "hi": "Hindi"
    # Add any other languages you plan to support
}

class Interpreter(Agent):
    """
    This agent is a silent, two-way interpreter. It does not have conversations.
    It listens for one of two specified languages and translates to the other.
    """

    def __init__(self, lang1_code: str, lang2_code: str):
        super().__init__()
        lang1_name = LANGUAGE_MAP.get(lang1_code, lang1_code)
        lang2_name = LANGUAGE_MAP.get(lang2_code, lang2_code)
        self.update_instructions(f"""
            You are an expert, real-time AI language interpreter.
            Your sole function is to translate between {lang1_name} ({lang1_code}) and {lang2_name} ({lang2_code}).

            - When you receive text in {lang1_name}, you MUST translate it to {lang2_name}.
            - When you receive text in {lang2_name}, you MUST translate it to {lang1_name}.
            - Your response MUST be ONLY the translated text and nothing else.
            - Do not add any commentary, greetings, or explanations.
            - If the input is not in {lang1_name} or {lang2_name}, do not produce any output. Remain silent.
            - Keep translations concise and natural for spoken conversation.
        """)

async def entrypoint(ctx: agents.JobContext):
    """Entry point for the agent."""
    # The agent gets its instructions from the job metadata
    metadata = ctx.job.metadata
    if not metadata:
        raise ValueError("Job metadata is required to specify languages (e.g., 'ar,fr')")

    languages = metadata.split(',')
    if len(languages) != 2:
        raise ValueError(f"Expected 2 languages in metadata, got {len(languages)}. Metadata: '{metadata}'")

    lang1, lang2 = languages[0].strip(), languages[1].strip()

    print(f"Starting interpreter agent for {lang1} <-> {lang2}")

    google_api_key = os.getenv("GOOGLE_API_KEY")
    if not google_api_key:
        raise ValueError("GOOGLE_API_KEY environment variable is required")

    cartesia_api_key = os.getenv("CARTESIA_API_KEY")
    if cartesia_api_key:
        tts = cartesia.TTS(voice="f786b574-daa5-4673-aa0c-cbe3e8534c02", api_key=cartesia_api_key)
    else:
        raise ValueError("CARTESIA_API_KEY environment variable is required")

    session = AgentSession(
        stt=deepgram.STT(model="nova-2", language=None), # Let Deepgram detect
        llm=google.LLM(model="gemini-2.0-flash-exp", api_key=google_api_key),
        tts=tts,
        vad=silero.VAD.load(),
    )

    await session.start(
        room=ctx.room,
        agent=Interpreter(lang1_code=lang1, lang2_code=lang2)
    )

    # No greeting, the agent joins silently.

if __name__ == "__main__":
    # This name MUST match the agent_name in your API route
    import sys
    
    # If 'start' command is provided, use direct start (production mode)
    # Otherwise, use CLI (for dev mode)
    if len(sys.argv) > 1 and sys.argv[1] == "start":
        agents.start(
            entrypoint_fnc=entrypoint,
            agent_name="interpreter-agent"
        )
    else:
        agents.cli.run_app(
            agents.WorkerOptions(
                entrypoint_fnc=entrypoint,
                agent_name="interpreter-agent"
            )
        )

