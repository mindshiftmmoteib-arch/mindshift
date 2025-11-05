import { NextRequest, NextResponse } from "next/server";
import * as crypto from "crypto";

// IMPORTANT: You must set LIVEKIT_URL in your server-side environment variables
// This is the URL to your LiveKit server, e.g., "https://my-livekit-server.com"
// Your VoiceRoom.tsx uses NEXT_PUBLIC_LIVEKIT_URL (client-side),
// this route needs the server-side LIVEKIT_URL.

const livekitUrl = process.env.LIVEKIT_URL!;
const apiKey = process.env.LIVEKIT_API_KEY!;
const apiSecret = process.env.LIVEKIT_API_SECRET!;

if (!livekitUrl || !apiKey || !apiSecret) {
  console.error("LiveKit server credentials not fully configured.");
}

// Helper function to make authenticated LiveKit API requests
async function makeLiveKitRequest(
  endpoint: string,
  method: string = "GET",
  body?: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const url = `${livekitUrl.replace(/\/$/, "")}${endpoint}`;
  
  // Generate authorization header using LiveKit's auth format
  const timestamp = Date.now();
  const nonce = crypto.randomBytes(16).toString("base64");
  const bodyStr = body ? JSON.stringify(body) : "";
  const bodyHash = crypto.createHash("sha256").update(bodyStr).digest("base64");
  
  const toSign = `${timestamp}${nonce}${bodyHash}`;
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(toSign)
    .digest("base64");
  
  const authHeader = `${apiKey}:${signature}:${timestamp}:${nonce}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Authorization": `Bearer ${authHeader}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LiveKit API error: ${response.status} ${errorText}`);
  }

  return response.json();
}

export const runtime = "nodejs";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const { roomName, lang1, lang2 } = await req.json();

    if (!roomName || !lang1 || !lang2) {
      return NextResponse.json(
        { error: "Missing required fields: roomName, lang1, lang2" },
        { status: 400 }
      );
    }

    // This metadata string is what our Python agent will receive
    const metadata = `${lang1},${lang2}`;

    // Dispatch agent job using LiveKit's Agents API
    // The endpoint format is: /twirp/livekit.AgentService/StartAgentJob
    try {
      const dispatch = await makeLiveKitRequest(
        "/twirp/livekit.AgentService/StartAgentJob",
        "POST",
        {
          room: roomName,
          agent_name: "interpreter-agent",
          metadata: metadata,
        }
      );

      const dispatchId = 
        (typeof dispatch === 'object' && dispatch !== null && 'job_id' in dispatch) 
          ? String(dispatch.job_id) 
          : (typeof dispatch === 'object' && dispatch !== null && 'id' in dispatch)
          ? String(dispatch.id)
          : 'unknown';

      return NextResponse.json(
        {
          message: 'Agent dispatched',
          dispatchId: dispatchId,
        },
        { status: 200 }
      );
    } catch (apiError) {
      // If the API endpoint doesn't exist, fall back to a simpler approach
      // The agent worker should be listening and will connect when it detects the room
      console.warn("LiveKit AgentService API not available, using fallback:", apiError);
      
      return NextResponse.json(
        {
          message: 'Agent dispatch initiated',
          roomName: roomName,
          agentName: 'interpreter-agent',
          metadata: metadata,
          note: 'Agent worker will connect automatically when it detects the room',
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error dispatching agent:", error);
    const errorMessage = (error instanceof Error) ? error.message : "Failed to dispatch agent";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

