# LiveKit Translation Agent Worker

This is the Python agent worker that handles real-time voice translation.

## Local Development

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set environment variables**:
   Create a `.env` file in this directory:
   ```env
   LIVEKIT_URL=wss://travcoies-9h1ntokz.livekit.cloud
   LIVEKIT_API_KEY=APIJ3p9EvfKirbr
   LIVEKIT_API_SECRET=VZMtypNewY4UVjb6DWEyqFz3GdDjfzhmVTneLfQcARVA
   DEEPGRAM_API_KEY=sk_your_deepgram_key
   DEEPL_API_KEY=YOUR_DEEPL_KEY:fx
   # Optional override (defaults to https://api-free.deepl.com/v2/translate)
   # DEEPL_API_URL=https://api.deepl.com/v2/translate
   ELEVENLABS_API_KEY=sk_your_elevenlabs_key
   ELEVENLABS_VOICE_ID=f786b574-daa5-4673-aa0c-cbe3e8534c02
   # Optional voice tuning
   # ELEVENLABS_MODEL_ID=eleven_multilingual_v2
   # ELEVENLABS_STABILITY=0.5
   # ELEVENLABS_SIMILARITY=0.75
   # ELEVENLABS_STYLE=0.0
   # ELEVENLABS_SPEAKER_BOOST=true
   ```

3. **Run the agent**:
   ```bash
   python interpreter.py
   ```

## Deployment

See `../AGENT_WORKER_DEPLOYMENT.md` for detailed deployment instructions.

## How It Works

1. The agent connects to LiveKit server and waits for jobs
2. When a user clicks "Start Agent" in the app, a job is dispatched
3. The agent receives the language pair (e.g., "ar,fr") as metadata
4. The agent joins the room and listens for speech
5. When someone speaks, it:
   - Transcribes speech (Deepgram)
   - Translates text (DeepL)
   - Converts translation to speech (ElevenLabs TTS)
   - Plays the translated audio back to the room

## Agent Name

The agent name is `interpreter-agent` - this MUST match in:
- `apps/client/src/app/api/translation/start/route.ts`
- `agent-worker/interpreter.py`

