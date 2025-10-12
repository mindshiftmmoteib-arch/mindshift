import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vision | TRAVoices",
  description:
    "Building the voice layer for the AI age. TRAVoices turns human speech into universal communication.",
};

export default function VisionPage() {
  return (
    <div className="relative">
      {/* Background motif to match pricing page */}
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

      <section className="mx-auto max-w-5xl">
        <header className="pt-6 pb-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
            Building the voice layer for the AI age
          </h1>
          <p className="mt-3 text-slate-700 max-w-3xl">
            TRAVoices turns human speech into universal communication.
            We blend real-time translation, contextual understanding, and voice cloning into one seamless system.
            This isn&apos;t another translation app — it&apos;s the foundation of global dialogue.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-5">
            <h2 className="text-xl font-semibold text-slate-900">Why now</h2>
            <p className="mt-2 text-slate-800">
              Voice is the new interface — but language still divides us.
              AI models can understand meaning beyond words; yet communication tools remain outdated.
              The world needs native multilingual infrastructure — where speech flows naturally across borders, accents, and cultures.
            </p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-5">
            <h2 className="text-xl font-semibold text-slate-900">What we ship</h2>
            <ul className="mt-2 space-y-2 text-slate-800 list-disc list-inside">
              <li>🎙 Live translation with emotional accuracy</li>
              <li>🧠 Context reasoning engine for idioms, tone, and semantics</li>
              <li>🗣 Voice cloning that mirrors identity and expression</li>
              <li>🌍 Universal real-time communication layer for calls, meetings, and APIs</li>
              <li>📡 Adaptive latency tech ensuring &lt;300ms translations</li>
            </ul>
          </div>
          <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-5">
            <h2 className="text-xl font-semibold text-slate-900">Where it goes</h2>
            <p className="mt-2 text-slate-800">
              From person-to-person calls to enterprise communication layers, TRAVoices is building the operating system for human conversation.
              The endgame: synchronous understanding — no captions, no lag, just voice.
            </p>
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">The investor offer</h3>
          <p className="mt-3 text-slate-800">
            We&apos;re opening a limited round for partners who see voice as the next protocol layer of the internet.
          </p>
          <p className="mt-2 text-slate-800">
            Funds accelerate:
          </p>
          <ul className="mt-2 ml-6 space-y-1 text-slate-800 list-disc">
            <li>AI speech infrastructure & model fine-tuning</li>
            <li>Global voice data partnerships</li>
            <li>Go-to-market across enterprises, telecoms, and creators</li>
          </ul>
          <div className="mt-4 grid md:grid-cols-3 gap-4 text-slate-800">
            <div className="rounded-xl border border-black/10 bg-white/60 backdrop-blur p-4">
              <div className="text-sm uppercase tracking-wide text-slate-600">Model</div>
              <div className="mt-1 font-semibold text-slate-900">Usage-based SaaS with integration-first adoption (SDK, APIs, WebRTC)</div>
            </div>
            <div className="rounded-xl border border-black/10 bg-white/60 backdrop-blur p-4">
              <div className="text-sm uppercase tracking-wide text-slate-600">Moat</div>
              <div className="mt-1 font-semibold text-slate-900">Proprietary voice-context embeddings + cloned-voice network effects</div>
            </div>
            <div className="rounded-xl border border-black/10 bg-white/60 backdrop-blur p-4">
              <div className="text-sm uppercase tracking-wide text-slate-600">Timing</div>
              <div className="mt-1 font-semibold text-slate-900">AI-driven voice agency is happening now — and TRAVoices sits at the inflection point between communication, identity, and intelligence.</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 font-semibold shadow hover:brightness-105"
            >
              Get early access
            </Link>
            <a
              href="mailto:founders@travoices.ai?subject=TRAVoices%20—%20Investor%20Intro"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 border border-black/10 hover:bg-black/5 text-slate-900"
            >
              🎧 Investor Intro
            </a>
          </div>
        </section>

        <footer className="mt-10 pb-2 text-sm text-slate-700">
          Built for those who believe in a world without language barriers. Let&apos;s upgrade human connection.
        </footer>
      </section>
    </div>
  );
}


