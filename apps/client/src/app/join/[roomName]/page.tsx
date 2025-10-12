"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase, supabaseConfigured } from "../../../lib/supabase";

interface Room {
  id: string;
  room_name: string;
  title: string;
  description: string;
  max_participants: number;
  created_at: string;
}

export default function JoinRoomPage() {
  const params = useParams<{ roomName: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState<string>("");
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!params.roomName) {
        setError("Invalid room link");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching room:", params.roomName);
        const response = await fetch(`/api/rooms/join?roomName=${encodeURIComponent(params.roomName)}`);
        
        console.log("Response status:", response.status);
        const responseData = await response.json();
        console.log("Response data:", responseData);
        
        if (!response.ok) {
          throw new Error(responseData.error || "Failed to load room");
        }

        setRoom(responseData.room);
      } catch (err) {
        console.error("Join room error:", err);
        setError(err instanceof Error ? err.message : "Failed to load room");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [params.roomName]);

  const handleJoinRoom = async () => {
    if (!room) return;
    
    setJoining(true);
    
    // Check if user is logged in
    if (!supabaseConfigured || !supabase) {
      // Redirect to login with return URL
      router.push(`/login?redirect=/join/${room.room_name}`);
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // Redirect to login with return URL
      router.push(`/login?redirect=/join/${room.room_name}`);
      return;
    }

    // Join the room
    router.push(`/call/${room.room_name}`);
  };

  if (loading) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <div
          aria-hidden
          className="fixed inset-0 -z-10"
          style={{
            backgroundColor: '#fff8dc',
            backgroundImage: 'radial-gradient(rgba(201,162,39,0.6) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0',
          }}
        />
        <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-8 max-w-md text-slate-900">
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto rounded-full border-4 border-black/10 border-t-amber-500 animate-spin"></div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Loading...</h2>
          <p className="text-slate-700 text-sm">Fetching room details</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <div
          aria-hidden
          className="fixed inset-0 -z-10"
          style={{
            backgroundColor: '#fff8dc',
            backgroundImage: 'radial-gradient(rgba(201,162,39,0.6) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0',
          }}
        />
        <div className="rounded-xl border border-red-300 bg-red-50/70 backdrop-blur p-8 max-w-md text-slate-900">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-xl font-bold text-red-900 mb-2">Room Not Found</h2>
            <p className="text-red-700 mb-6">{error}</p>
            <button
              onClick={() => router.push("/rooms")}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Go to Rooms
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: '#fff8dc',
          backgroundImage: 'radial-gradient(rgba(201,162,39,0.6) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0',
        }}
      />
      
      <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-8 max-w-md w-full text-slate-900">
        <div className="text-center space-y-4">
          <div>
            <svg className="w-16 h-16 mx-auto mb-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <h1 className="text-2xl font-bold text-slate-900">Join Voice Room</h1>
          </div>

          <div className="text-left space-y-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{room?.title}</h2>
              <p className="text-sm text-slate-600 font-mono">{room?.room_name}</p>
            </div>
            
            {room?.description && (
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-1">Description</h3>
                <p className="text-sm text-slate-600">{room.description}</p>
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Max {room?.max_participants} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Active</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleJoinRoom}
            disabled={joining}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
          >
            {joining ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                Joining...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Join Room
              </>
            )}
          </button>

          <p className="text-xs text-slate-600">
            You&apos;ll need to be logged in to join the voice room
          </p>
        </div>
      </div>
    </main>
  );
}
