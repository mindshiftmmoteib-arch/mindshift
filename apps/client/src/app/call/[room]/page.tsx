"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import VoiceRoom from "@/components/VoiceRoom";
import { supabase, supabaseConfigured } from "@/lib/supabase";

export default function CallPage({ 
  params 
}: { 
  params: Promise<{ room: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("Guest");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!supabaseConfigured || !supabase) {
        setError("Authentication not configured");
        setLoading(false);
        return;
      }

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        setError("Failed to check authentication");
        setLoading(false);
        return;
      }

      if (!session) {
        router.replace(`/login?redirect=${encodeURIComponent(`/call/${resolvedParams.room}`)}`);
        return;
      }

      setIsAuthenticated(true);
      setDisplayName(session.user.email?.split("@")[0] || "TRAVoices User");
      setLoading(false);
    };

    checkAuth();
  }, [resolvedParams.room, router]);

  if (loading) {
    return (
      <main className="space-y-12 relative min-h-screen">
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
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center rounded-xl border border-black/10 bg-white/70 backdrop-blur p-8 max-w-md text-slate-900">
            <div className="relative mb-6">
              <div className="w-20 h-20 mx-auto rounded-full border-4 border-black/10 border-t-amber-500 animate-spin"></div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Loading...</h2>
            <p className="text-slate-700 text-sm">Checking authentication</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="space-y-12 relative min-h-screen">
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
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center rounded-xl border border-black/10 bg-white/70 backdrop-blur p-8 max-w-md text-slate-900">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Error</h2>
            <p className="text-red-500 text-sm mb-6">{error}</p>
            <button 
              onClick={() => router.push("/login")} 
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Go to Login
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <VoiceRoom room={resolvedParams.room} displayName={displayName} />;
}

