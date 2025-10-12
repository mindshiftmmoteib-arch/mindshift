Perfect—let’s design this so you get voice rooms in your Next.js 15.4 app today, and you can scale to true, bidirectional live translation using Deepgram (STT) and ElevenLabs (TTS) later. I’ll assume “11ups” = ElevenLabs; if you meant a different vendor, tell me and I’ll adapt.

What you want (recap)

Now: a voice-only call view, embedded directly in your Next.js website.

Soon: A → B translated to French (heard as speech), and B → A translated to English (also speech), i.e., simultaneous two‑way translation.

Vendors you prefer: Deepgram for STT, ElevenLabs for TTS.

Architecture that scales (works now, grows later)

Media layer (rooms & audio): LiveKit Cloud (WebRTC SFU). You mint short‑lived JWTs on your server; the browser joins a room with the JS SDK. This gives you premium reliability, TURN, adaptive bitrate, and a simple dev flow in Next.js. 
LiveKit Docs
+1

Translation layer (later): A Translator Agent that joins each room as a programmatic participant using LiveKit Agents. It:

subscribes to each user’s audio,

runs Deepgram streaming STT (realtime WS) to transcribe,

translates text (Google Cloud Translation or DeepL),

streams ElevenLabs realtime TTS back into the room as a separate audio track for the other participant.
LiveKit Agents are built for this “server participant” pattern and have a Deepgram plugin ready to go. 
LiveKit Docs
+1

Alternative “plumbing” (also supported): Track Egress → WebSocket to your worker (for STT+translate), then Ingress (WHIP) to publish the TTS audio back to the room. Keep this in your pocket if you prefer services that want raw WS/HTTP instead of joining as an agent. 
LiveKit Docs
+1

Vendors (translation brain):

Deepgram Streaming STT (WebSocket/SDK). It supports raw PCM with explicit encoding + sample rate during streaming. 
Deepgram Docs
+1

ElevenLabs Streaming TTS (WebSocket & now WebRTC for conversational use). Low‑latency, streaming output formats (mp3/PCM/opus options). 
ElevenLabs
+2
ElevenLabs
+2

Text translation: Google Cloud Translation (large language coverage; documented quotas/pricing), or DeepL API Free (500k chars/mo free; great quality on many EU languages). Use either behind a small service so you can switch later. 
Google Cloud
+2
Google Cloud
+2

Phase 1 (today): Add a voice call page in Next.js 15.4

Best practice: keep secrets server‑only (Route Handler, Node runtime), keep your call UI as a Client Component (uses getUserMedia), and use Server Actions for DB mutations if you add “Create Room”. 
Next.js
+2
Next.js
+2

1) Install & env
pnpm add livekit-client @livekit/components-react @livekit/components-styles
pnpm add livekit-server-sdk


.env.local

NEXT_PUBLIC_LIVEKIT_URL=wss://<your>.livekit.cloud
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...

2) Token endpoint (Route Handler, Node runtime)

app/api/livekit/token/route.ts

import { NextRequest, NextResponse } from "next/server";
import { AccessToken, VideoGrant } from "livekit-server-sdk";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const room = url.searchParams.get("room");
  const identity = url.searchParams.get("identity") ?? crypto.randomUUID();
  const name = url.searchParams.get("name") ?? "Guest";
  if (!room) return NextResponse.json({ error: "Missing room" }, { status: 400 });

  const at = new AccessToken(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!, { identity, name });
  at.addGrant(<VideoGrant>{ room, roomJoin: true, canPublish: true, canSubscribe: true });

  return NextResponse.json({ token: await at.toJwt() }, { headers: { "Cache-Control": "no-store" } });
}


(LiveKit uses a JWT access token with a VideoGrant specifying room & capabilities.) 
LiveKit Docs

3) Client call UI (audio‑only)

components/VoiceRoom.tsx

"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, RoomAudioRenderer, ControlBar } from "@livekit/components-react";
import type { RoomOptions } from "livekit-client";
import "@livekit/components-styles";

export default function VoiceRoom({ room, displayName }: { room: string; displayName: string }) {
  const [token, setToken] = useState<string | null>(null);
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL!;

  useEffect(() => {
    const identity = crypto.randomUUID();
    fetch(`/api/livekit/token?room=${encodeURIComponent(room)}&name=${encodeURIComponent(displayName)}&identity=${identity}`)
      .then(r => r.json()).then(d => setToken(d.token)).catch(console.error);
  }, [room, displayName]);

  const options: RoomOptions = {
    adaptiveStream: true,
    dynacast: true,
    publishDefaults: { video: false, audio: true },
    audioCaptureDefaults: { autoGainControl: true, echoCancellation: true, noiseSuppression: true },
  };

  if (!token) return <div className="p-6">Connecting…</div>;

  return (
    <LiveKitRoom token={token} serverUrl={wsUrl} audio video={false} connect options={options} style={{ height: "100dvh" }}>
      {/* Renders remote audio streams */}
      <RoomAudioRenderer />
      {/* Bottom dock controls */}
      <div className="fixed bottom-0 left-0 right-0 p-3">
        <ControlBar controls={{ camera: false }} />
      </div>
    </LiveKitRoom>
  );
}


Embed anywhere: add <VoiceRoom room="neurocanvas-demo" displayName="You" /> in any page/section. The component is a Client Component by design. 
Next.js

4) Page

app/call/[room]/page.tsx

import VoiceRoom from "@/components/VoiceRoom";

export default function Page({ params }: { params: { room: string } }) {
  return <VoiceRoom room={params.room} displayName="NeuroCanvas user" />;
}


That’s all you need for a premium-quality voice room embedded in your Next.js site right now.

Phase 2 (ready when you are): Two‑way live translation with Deepgram + ElevenLabs

There are two clean ways to wire it; both scale globally.

Option A — LiveKit Agent (recommended)

Run a Translator Agent that joins rooms as a server participant:

Subscribe to each participant’s audio.

STT: Use Deepgram streaming (Nova‑3, multilingual), via the official LiveKit plugin (Node or Python). 
LiveKit Docs
+1

Translate: call your translation microservice (Google Cloud Translation or DeepL API Free). 
Google Cloud
+1

TTS: stream ElevenLabs speech back (WebSocket/Streaming API), and publish as a translated audio track to the opposite user(s). 
ElevenLabs
+1

The Agents framework is explicitly designed to join rooms as programmatic participants and run low‑latency speech pipelines. 
LiveKit Docs

Sketch (Node):

// packages/translator-agent/src/agent.ts
import { defineAgent, voice } from '@livekit/agents';
import { STT as DeepgramSTT } from '@livekit/agents-plugin-deepgram';
import { RoomEvent, TrackKind } from '@livekit/rtc-node';
// pseudo-code translate() & elevenlabsTTSStream() are your integrations

export default defineAgent({
  entry: async (ctx) => {
    await ctx.connect();

    const stt = new DeepgramSTT({ model: 'nova-3', multilingual: true }); // Deepgram
    const session = new voice.AgentSession({ stt });                      // no LLM; we do pure translate->TTS

    // When we subscribe to a user's audio, start the A->B translation stream
    ctx.room.on(RoomEvent.TrackSubscribed, async (track, _pub, participant) => {
      if (track.kind !== TrackKind.KIND_AUDIO) return;

      // stream STT
      for await (const phrase of session.stt!.streamTrack(track)) {
        const srcLang = phrase.language ?? 'auto';
        const text = phrase.text ?? '';
        // choose a target language based on the *other* participant's preference
        const target = ctx.metadata.targetLangForOther(participant.identity);
        const translated = await translate(text, srcLang, target); // Google/DeepL
        // elevenlabs -> return PCM/MP3 bytes as they stream
        for await (const chunk of elevenlabsTTSStream(translated, { target })) {
          await ctx.room.publishAudioFrame(chunk, { trackName: `translated:${participant.identity}->${target}` });
        }
      }
    });
  }
});


Latency tips: stream partial transcripts to translation + TTS (don’t wait for final STT), and use ElevenLabs streaming/WebRTC to minimize perceived delay. 
LiveKit Docs
+2
ElevenLabs
+2

Option B — Egress → your WS → Ingress (WHIP)

Tap each speaker’s audio track via Track Egress → WebSocket (raw PCM) to your worker. Run STT/translate/TTS there. Push the generated audio back with Ingress/WHIP, which joins the room and publishes as a participant. Good when you want strict isolation between media infra and AI workers. 
LiveKit Docs
+1

Audio formats & wiring notes (to avoid surprises)

Deepgram WS: if you send raw PCM, you must set encoding (e.g., linear16) and sample_rate (16 kHz or 48 kHz are typical). 
Deepgram Docs
+1

ElevenLabs streaming: supports multiple output formats (MP3 22.05/44.1 kHz, PCM 16/22.05/24/44.1, and more); pick PCM 16k/24k for uncomplicated WebRTC re‑encoding, or use their WebRTC path for end‑to‑end low latency. 
ElevenLabs
+2
ElevenLabs
+2

If you publish TTS from the browser (quickest): decode ElevenLabs stream in an AudioContext, route to MediaStreamDestination(), and add that track to your RTCPeerConnection—the remote hears the translated voice; they can mute the original if desired. (This avoids server publish at first; later switch to an Agent.)

Next.js 15.4 best practices you’ll hit here

Server-only token minting (Route Handler, runtime = "nodejs"). 
Next.js

Client components for anything using getUserMedia, useEffect, or SDK hooks—mark with "use client". 
Next.js

Server Actions for DB mutations (create/join room) so you don’t need separate API routes. 
Next.js

Optional: room metadata to drive translation

Store each participant’s preferred language (e.g., "en-US", "fr-FR") in your DB or in LiveKit room metadata and broadcast over DataChannel when someone joins. The agent (or your browser logic) reads it and chooses A→B and B→A targets automatically.

Credits/free tier (so you can experiment)

Deepgram: official pricing page shows $200 free credit to start—enough to prototype STT/Voice Agent streaming. 
Deepgram

DeepL API Free: 500,000 characters/month free. 
DeepL Help Center

Google Cloud Translation: documented quotas and pricing (both Basic/Advanced; check latest terms). 
Google Cloud

ElevenLabs: Streaming/WebSocket and Realtime guides for TTS; choose formats based on your path. 
ElevenLabs
+1

What you can ship right now

Drop the token route and VoiceRoom component above into your Next.js app.

Navigate to /call/my-demo-room in two tabs/devices—voice works.

When you’re ready, spin up a translator‑agent (Option A). Start with Deepgram STT → Google/DeepL → ElevenLabs streaming, and publish a translated audio track back to the other side.

If you want, I’ll sketch the exact translator-agent package (Node) with @livekit/agents, @livekit/agents-plugin-deepgram, a tiny Google/DeepL function, and ElevenLabs streaming glue so you have a runnable service you can deploy next to your app.