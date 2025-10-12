import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Missing authorization header" },
        { status: 401 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { roomName } = body;

    if (!roomName) {
      return NextResponse.json(
        { error: "Room name is required" },
        { status: 400 }
      );
    }

    // Check if room exists and user owns it
    const { data: rooms, error: roomError } = await supabase
      .from("rooms")
      .select("*")
      .eq("room_name", roomName)
      .eq("owner_id", user.id)
      .eq("is_active", true);

    if (roomError || !rooms || rooms.length === 0) {
      return NextResponse.json(
        { error: "Room not found or access denied" },
        { status: 404 }
      );
    }

    const room = rooms[0]; // Take the first (and should be only) room

    // Generate shareable link
    const shareableLink = `${req.nextUrl.origin}/join/${roomName}`;

    return NextResponse.json({ 
      shareableLink,
      room: {
        id: room.id,
        room_name: room.room_name,
        title: room.title,
        description: room.description,
        max_participants: room.max_participants
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error sharing room:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
