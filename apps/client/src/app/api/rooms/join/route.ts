import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const url = new URL(req.url);
    const roomName = url.searchParams.get("roomName");

    if (!roomName) {
      return NextResponse.json(
        { error: "Room name is required" },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Check if room exists and is active
    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .select("*")
      .eq("room_name", roomName)
      .eq("is_active", true)
      .single();

    console.log("Join room debug:", { roomName, room, roomError });

    if (roomError) {
      console.error("Room query error:", roomError);
      return NextResponse.json(
        { error: `Room not found: ${roomError.message}` },
        { status: 404 }
      );
    }

    if (!room) {
      console.log("No room found for name:", roomName);
      return NextResponse.json(
        { error: "Room not found or is no longer active" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      room: {
        id: room.id,
        room_name: room.room_name,
        title: room.title,
        description: room.description,
        max_participants: room.max_participants,
        created_at: room.created_at
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error joining room:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
