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
import sys

# Load environment variables
load_dotenv(".env")

# Enable detailed logging
import logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stdout
)
logger = logging.getLogger(__name__)

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
        google_api_key = os.getenv("GOOGLE_API_KEY")
        if not google_api_key:
            error_msg = "GOOGLE_API_KEY environment variable is required"
            logger.error(error_msg)
            raise ValueError(error_msg)
        logger.info("GOOGLE_API_KEY found")

        cartesia_api_key = os.getenv("CARTESIA_API_KEY")
        if not cartesia_api_key:
            error_msg = "CARTESIA_API_KEY environment variable is required"
            logger.error(error_msg)
            raise ValueError(error_msg)
        logger.info("CARTESIA_API_KEY found")

        # Initialize TTS
        logger.info("Initializing Cartesia TTS...")
        tts = cartesia.TTS(voice="f786b574-daa5-4673-aa0c-cbe3e8534c02", api_key=cartesia_api_key)
        logger.info("TTS initialized successfully")

        # Initialize session components
        logger.info("Initializing agent session components...")
        logger.info("  - STT: Deepgram (nova-2)")
        logger.info("  - LLM: Google Gemini 2.0 Flash")
        logger.info("  - TTS: Cartesia")
        logger.info("  - VAD: Silero")
        
        session = AgentSession(
            stt=deepgram.STT(model="nova-2", language=None), # Let Deepgram detect
            llm=google.LLM(model="gemini-2.0-flash-exp", api_key=google_api_key),
            tts=tts,
            vad=silero.VAD.load(),
        )
        logger.info("Agent session components initialized")

        # Create the interpreter agent
        logger.info("Creating Interpreter agent instance...")
        interpreter_agent = Interpreter(lang1_code=lang1, lang2_code=lang2)
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

