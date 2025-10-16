"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
      <section className="text-center space-y-4 sm:space-y-6 text-slate-900 px-2">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className={`inline-block transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Speak Naturally.</span>{' '}
          <span className={`inline-block transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Be Understood Instantly</span>{' '}
          <span className={`inline-block transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>— with TRAVoices</span>
        </h1>
        <p className={`mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-slate-700 px-2 transition-all duration-1000 delay-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          An AI-powered real-time translation platform that lets people speak any language — and be heard in their own cloned voice.
          Bridge conversations across cultures, languages, and accents — all in real time.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/signup"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-slate-900 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30 relative overflow-hidden bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            aria-label="Start talking"
            style={{
              backgroundSize: '200% 100%',
              animation: isVisible ? 'balayageRTL 3s ease-in-out infinite' : 'none'
            }}
          >
            <span className="relative z-10">Start Talking</span>
          </Link>
          <Link
            href="/signup"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold border border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 relative overflow-hidden transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            aria-label="Create an account"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 100%)',
              backgroundSize: '200% 100%',
              animation: isVisible ? 'balayageLTR 3s ease-in-out infinite' : 'none'
            }}
          >
            <span className="relative z-10">Create Account</span>
          </Link>
        </div>
        <style jsx>{`
          @keyframes balayageRTL {
            0%, 100% {
              background-position: 100% 50%;
            }
            50% {
              background-position: 0% 50%;
            }
          }
          @keyframes balayageLTR {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
        `}</style>
      </section>

      {/* Who we are */}
      <section className="grid md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
        <div className="md:col-span-2 rounded-xl border border-black/10 bg-white/70 backdrop-blur p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Who We Are</h2>
          <p className="text-sm sm:text-base text-slate-800">
            We are <span className="font-semibold">Saudi Innovators</span> — 
            Our mission is to make language barriers disappear — enabling anyone to speak naturally and be understood perfectly.
          </p>
          <p className="text-sm sm:text-base text-slate-700">
            TRAVoices was born from the belief that true connection happens when technology feels invisible — when people can talk, understand, and collaborate effortlessly, no matter their language.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">Leadership</h3>
          <p className="mt-2 text-sm sm:text-base text-slate-800">
            <span className="font-semibold">نــاصـر آل خازم</span>, CEO
          </p>
          <p className="mt-1 text-xs sm:text-sm text-slate-700">
            Founder and visionary leading the mission to create the world&apos;s most human-sounding AI translator.
            Focused on real-time communication, speech synthesis, and contextual understanding that feels truly natural.
          </p>
        </div>
      </section>

      {/* What is the SaaS */}
      <section className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-4 sm:p-6 space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">What is TRAVoices?</h2>
        <p className="text-sm sm:text-base text-slate-800">
          TRAVoices is a Software-as-a-Service platform that performs live multilingual voice translation with near-perfect context understanding and voice cloning.
          Speak once — and be heard in another language, with your own voice.
        </p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-800">
          <li className="rounded-lg border border-black/10 bg-white/70 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">🎙 AI Voice Translation</span>
            Translate speech live between any two languages with context-aware accuracy.
          </li>
          <li className="rounded-lg border border-black/10 bg-white/70 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">🧠 Voice Cloning</span>
            Preserve tone, rhythm, and emotional nuance of the original speaker.
          </li>
          <li className="rounded-lg border border-black/10 bg-white/70 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">🌐 Multi-Language Support</span>
            From English and Arabic to Mandarin, French, and beyond — TRAVoices adapts to every accent and dialect.
          </li>
          <li className="rounded-lg border border-black/10 bg-white/70 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">🔊 Real-Time Calls</span>
            Integrate into apps, video calls, or telephony systems for instant, two-way translation.
          </li>
          <li className="rounded-lg border border-black/10 bg-white/70 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">💬 Cultural Context Engine</span>
            Understand idioms and meaning, not just words.
          </li>
        </ul>
      </section>

      {/* What we do and aim */}
      <section className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-4 sm:p-6 space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">What We Do</h2>
          <p className="text-sm sm:text-base text-slate-800">
            We help individuals, businesses, and governments communicate across borders as if they spoke the same language.
            From international meetings to customer service and education — TRAVoices makes global communication natural and human.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-4 sm:p-6 space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Our Vision</h2>
          <p className="text-sm sm:text-base text-slate-800">
            To become the first universal voice translation layer for the world —
            one that enables every person to speak in their voice, in any language, with clarity and emotion intact.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-3 sm:space-y-4 text-slate-900 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Ready to Speak Without Limits?</h2>
        <p className="text-sm sm:text-base text-slate-700">Experience a new era of voice communication. Start your first live translation in seconds.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Try TRAVoices Now"
          >
            Try TRAVoices Now
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold border border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Login"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center space-y-2 text-slate-700 pb-6 sm:pb-8">
        <p className="text-xs sm:text-sm">© 2025 TRAVoices — Built with passion</p>
        <p className="text-xs sm:text-sm italic">Connecting voices. Uniting worlds.</p>
      </footer>
    </main>
  )
}
