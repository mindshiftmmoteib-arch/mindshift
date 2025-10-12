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

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get all rooms for debugging
    const { data: allRooms, error: allRoomsError } = await supabase
      .from("rooms")
      .select("*")
      .limit(10);

    let specificRoom = null;
    let specificRoomError = null;

    if (roomName) {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("room_name", roomName);
      
      specificRoom = data;
      specificRoomError = error;
    }

    return NextResponse.json({ 
      debug: {
        supabaseConfigured: Boolean(supabaseUrl && supabaseAnonKey),
        allRooms,
        allRoomsError,
        roomName,
        specificRoom,
        specificRoomError
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
