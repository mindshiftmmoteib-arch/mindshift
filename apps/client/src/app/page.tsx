import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="space-y-16 relative">
      {/* Landing background: light cream with gold dot grid */}
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
      {/* Hero */}
      <section className="text-center space-y-6 text-slate-900">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Speak Naturally. Be Understood Instantly — with TRAVoices
        </h1>
        <p className="mx-auto max-w-3xl text-lg md:text-xl text-slate-700">
          An AI-powered real-time translation platform that lets people speak any language — and be heard in their own cloned voice.
          Bridge conversations across cultures, languages, and accents — all in real time.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-md px-5 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Start talking"
          >
            Start Talking
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-md px-5 py-3 font-semibold border border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Create an account"
          >
            Create Account
          </Link>
        </div>
      </section>

      {/* Who we are */}
      <section className="grid md:grid-cols-3 gap-6 items-stretch">
        <div className="md:col-span-2 rounded-xl border border-black/10 bg-white/70 backdrop-blur p-6 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Who We Are</h2>
          <p className="text-slate-800">
            We are <span className="font-semibold">Saudi Innovators</span> — 
            Our mission is to make language barriers disappear — enabling anyone to speak naturally and be understood perfectly.
          </p>
          <p className="text-slate-700">
            TRAVoices was born from the belief that true connection happens when technology feels invisible — when people can talk, understand, and collaborate effortlessly, no matter their language.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-6">
          <h3 className="text-lg font-semibold text-slate-900">Leadership</h3>
          <p className="mt-2 text-slate-800">
            <span className="font-semibold">نــاصـر آل خازم</span>, CEO
          </p>
          <p className="mt-1 text-sm text-slate-700">
            Founder and visionary leading the mission to create the world&apos;s most human-sounding AI translator.
            Focused on real-time communication, speech synthesis, and contextual understanding that feels truly natural.
          </p>
        </div>
      </section>

      {/* What is the SaaS */}
      <section className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-6 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">What is TRAVoices?</h2>
        <p className="text-slate-800">
          TRAVoices is a Software-as-a-Service platform that performs live multilingual voice translation with near-perfect context understanding and voice cloning.
          Speak once — and be heard in another language, with your own voice.
        </p>
        <ul className="grid md:grid-cols-3 gap-3 text-sm text-slate-800">
          <li className="rounded-lg border border-black/10 bg-white/70 p-4">
            <span className="block font-semibold">🎙 AI Voice Translation</span>
            Translate speech live between any two languages with context-aware accuracy.
          </li>
          <li className="rounded-lg border border-black/10 bg-white/70 p-4">
            <span className="block font-semibold">🧠 Voice Cloning</span>
            Preserve tone, rhythm, and emotional nuance of the original speaker.
          </li>
          <li className="rounded-lg border border-black/10 bg-white/70 p-4">
            <span className="block font-semibold">🌐 Multi-Language Support</span>
            From English and Arabic to Mandarin, French, and beyond — TRAVoices adapts to every accent and dialect.
          </li>
          <li className="rounded-lg border border-black/10 bg-white/70 p-4">
            <span className="block font-semibold">🔊 Real-Time Calls</span>
            Integrate into apps, video calls, or telephony systems for instant, two-way translation.
          </li>
          <li className="rounded-lg border border-black/10 bg-white/70 p-4">
            <span className="block font-semibold">💬 Cultural Context Engine</span>
            Understand idioms and meaning, not just words.
          </li>
        </ul>
      </section>

      {/* What we do and aim */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-6 space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">What We Do</h2>
          <p className="text-slate-800">
            We help individuals, businesses, and governments communicate across borders as if they spoke the same language.
            From international meetings to customer service and education — TRAVoices makes global communication natural and human.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-6 space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
          <p className="text-slate-800">
            To become the first universal voice translation layer for the world —
            one that enables every person to speak in their voice, in any language, with clarity and emotion intact.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-4 text-slate-900">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Ready to Speak Without Limits?</h2>
        <p className="text-slate-700">Experience a new era of voice communication. Start your first live translation in seconds.</p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-md px-5 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Try TRAVoices Now"
          >
            Try TRAVoices Now
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-md px-5 py-3 font-semibold border border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Login"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center space-y-2 text-slate-700 pb-8">
        <p className="text-sm">© 2025 TRAVoices — Built with passion</p>
        <p className="text-sm italic">Connecting voices. Uniting worlds.</p>
      </footer>
    </main>
  )
}
