import { NextRequest, NextResponse } from "next/server";
import * as crypto from "crypto";
import { AgentDispatchClient } from "livekit-server-sdk";

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

// Helper function to check if an agent is already in the room
// Currently not used - commented out to prevent duplicate dispatch blocking
// TODO: Re-enable with better detection logic after verifying agent joins work
/*
async function checkRoomForAgent(roomName: string): Promise<boolean> {
  try {
    const roomInfo = await makeLiveKitRequest(
      `/twirp/livekit.RoomService/ListRooms`,
      "POST",
      { names: [roomName] }
    );
    
    // Log the room info structure for debugging
    console.log(`[Agent Dispatch] Room info for ${roomName}:`, JSON.stringify(roomInfo, null, 2));
    
    // Check if room exists and has participants
    if (roomInfo && typeof roomInfo === 'object') {
      const rooms = (roomInfo as { rooms?: unknown[] }).rooms || [];
      if (rooms.length > 0) {
        const room = rooms[0] as { num_participants?: number; participants?: unknown[] };
        const participants = room.participants || [];
        
        // Check if any participant is an agent (agents typically have specific identity patterns)
        const hasAgent = participants.some((p: unknown) => {
          const participant = p as { identity?: string; name?: string };
          const identity = participant.identity || '';
          const name = participant.name || '';
          // Check if identity or name contains agent indicators
          return identity.includes('agent') || name.includes('agent') || 
                 identity.includes('interpreter') || name.includes('interpreter');
        });
        
        console.log(`[Agent Dispatch] Room ${roomName} has ${participants.length} participants, agent detected: ${hasAgent}`);
        return hasAgent;
      }
    }
    return false;
  } catch (error) {
    console.warn(`[Agent Dispatch] Could not check room for existing agent:`, error);
    // If we can't check, allow the dispatch (fail open)
    return false;
  }
}
*/

// Helper function to extract dispatch ID from various response formats
function extractDispatchId(response: unknown): string {
  if (!response || typeof response !== 'object') {
    console.log('[Agent Dispatch] Response is not an object:', typeof response);
    return 'unknown';
  }

  const resp = response as Record<string, unknown>;
  
  // Log the full response structure for debugging
  console.log('[Agent Dispatch] LiveKit API response structure:', JSON.stringify(resp, null, 2));
  
  // Try various possible field names
  const possibleFields = ['job_id', 'id', 'jobId', 'jobId', 'dispatch_id', 'dispatchId'];
  
  for (const field of possibleFields) {
    if (field in resp && resp[field] != null) {
      const value = String(resp[field]);
      console.log(`[Agent Dispatch] Found dispatch ID in field '${field}': ${value}`);
      return value;
    }
  }
  
  // If no standard field found, check all keys
  const keys = Object.keys(resp);
  console.log(`[Agent Dispatch] Response keys: ${keys.join(', ')}`);
  console.log(`[Agent Dispatch] Could not find dispatch ID in response, using generated ID`);
  
  return 'unknown';
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

    console.log(`[Agent Dispatch] Request received for room: ${roomName}, languages: ${lang1} <-> ${lang2}`);

    // Note: We're temporarily disabling duplicate check to allow agent to join
    // The agent worker should handle being dispatched multiple times gracefully
    // TODO: Re-enable with better detection logic after verifying agent joins work
    // const hasExistingAgent = await checkRoomForAgent(roomName);
    // if (hasExistingAgent) {
    //   console.log(`[Agent Dispatch] Agent already active in room ${roomName}, preventing duplicate dispatch`);
    //   return NextResponse.json(
    //     {
    //       error: "An agent is already active in this room. Please wait for it to connect or disconnect first.",
    //       dispatchId: null,
    //     },
    //     { status: 409 } // 409 Conflict
    //   );
    // }

    // This metadata string is what our Python agent will receive
    const metadata = `${lang1},${lang2}`;

    // Generate a fallback dispatch ID in case the API doesn't return one
    const fallbackDispatchId = `dispatch-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;

    // Dispatch agent job using LiveKit SDK AgentDispatchClient
    try {
      console.log(`[Agent Dispatch] Attempting to dispatch agent to room ${roomName} with agent_name: interpreter-agent`);
      
      // Try using LiveKit SDK AgentDispatchClient first
      try {
        const dispatchClient = new AgentDispatchClient(
          livekitUrl.replace(/\/$/, ""),
          apiKey,
          apiSecret
        );
        
        console.log(`[Agent Dispatch] Using AgentDispatchClient from SDK`);
        const dispatch = await dispatchClient.createDispatch(roomName, "interpreter-agent", {
          metadata: metadata,
        });
        
        console.log(`[Agent Dispatch] SDK dispatch successful:`, JSON.stringify(dispatch, null, 2));
        
        // Extract dispatch ID - AgentDispatch may have different property names
        // Cast through unknown first to avoid TypeScript errors
        const dispatchObj = dispatch as unknown as Record<string, unknown>;
        const dispatchId = dispatchObj.jobId 
          || dispatchObj.id 
          || dispatchObj.job_id
          || fallbackDispatchId;
        
        console.log(`[Agent Dispatch] Agent dispatched successfully with ID: ${dispatchId}`);
        console.log(`[Agent Dispatch] Agent worker should now receive the job and join room ${roomName}`);

        return NextResponse.json(
          {
            message: 'Agent dispatched successfully',
            dispatchId: dispatchId,
            roomName: roomName,
          },
          { status: 200 }
        );
      } catch (sdkError) {
        console.warn(`[Agent Dispatch] SDK method failed, trying HTTP API:`, sdkError instanceof Error ? sdkError.message : String(sdkError));
        // Fall through to HTTP API method
      }
      
      // Fallback to HTTP API if SDK doesn't work
      console.log(`[Agent Dispatch] Using HTTP API method`);
      console.log(`[Agent Dispatch] Request payload:`, JSON.stringify({
        room: roomName,
        agent_name: "interpreter-agent",
        metadata: metadata,
      }, null, 2));
      
      const dispatch = await makeLiveKitRequest(
        "/twirp/livekit.AgentService/StartAgentJob",
        "POST",
        {
          room: roomName,
          agent_name: "interpreter-agent",
          metadata: metadata,
        }
      );

      console.log(`[Agent Dispatch] LiveKit API call successful, response:`, JSON.stringify(dispatch, null, 2));
      const dispatchId = extractDispatchId(dispatch);

      // If we couldn't extract an ID, use the fallback
      const finalDispatchId = dispatchId !== 'unknown' ? dispatchId : fallbackDispatchId;

      console.log(`[Agent Dispatch] Agent dispatched successfully with ID: ${finalDispatchId}`);
      console.log(`[Agent Dispatch] Agent worker should now receive the job and join room ${roomName}`);

      return NextResponse.json(
        {
          message: 'Agent dispatched successfully',
          dispatchId: finalDispatchId,
          roomName: roomName,
        },
        { status: 200 }
      );
    } catch (apiError) {
      // Log the full error for debugging
      const errorMessage = apiError instanceof Error ? apiError.message : String(apiError);
      const errorStack = apiError instanceof Error ? apiError.stack : undefined;
      console.error(`[Agent Dispatch] Agent dispatch failed:`, errorMessage);
      if (errorStack) {
        console.error(`[Agent Dispatch] Error stack:`, errorStack);
      }
      
      // Return error instead of success
      return NextResponse.json(
        {
          error: `Failed to dispatch agent: ${errorMessage}`,
          dispatchId: fallbackDispatchId,
          roomName: roomName,
          agentName: 'interpreter-agent',
          metadata: metadata,
          note: 'Check Vercel function logs for detailed error information',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[Agent Dispatch] Error dispatching agent:", error);
    const errorMessage = (error instanceof Error) ? error.message : "Failed to dispatch agent";
    return NextResponse.json({ 
      error: errorMessage,
      dispatchId: null 
    }, { status: 500 });
  }
}

