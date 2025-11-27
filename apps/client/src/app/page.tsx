"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="space-y-12 sm:space-y-16 relative">
      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 text-slate-900 px-2">
        <div className={`flex-1 w-full transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}>
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto aspect-square rounded-full overflow-hidden border-4 border-amber-500/70 shadow-2xl">
            <Image
              src="/Design sans titre (1).png"
              alt="Coach Moteib bin Nasser AlAjmi portrait"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className={`flex-1 space-y-4 sm:space-y-6 text-center md:text-left transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div
            className="inline-flex flex-col items-center text-center px-4 py-3 rounded-2xl border border-[#B99B56]/50 text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #1A5345 0%, #15483b 100%)' }}
          >
            <span className="text-base sm:text-lg font-semibold uppercase tracking-widest">Marshall Goldsmith</span>
            <span className="text-xs sm:text-sm font-medium text-[#F7E4B0] tracking-[0.35em]">
              — CERTIFIED EXECUTIVE COACH —
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            <span className={`inline-block transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Build Balanced Leadership</span>{' '}
            <span className={`inline-block transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>with Moteib bin Nasser AlAjmi</span>
          </h1>
          <p className="mx-auto md:mx-0 max-w-3xl text-base sm:text-lg md:text-xl text-slate-700 px-2 md:px-0">
            Helping managers build balanced lives through proven leadership coaching programs.
            Transform your management style, strengthen your team, and achieve lasting success.
          </p>
          <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 pt-2">
            <Link
              href="https://calendly.com/coach_moteib"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-slate-900 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30 relative overflow-hidden bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-1000 delay-900 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              aria-label="Book Your Call"
              style={{
                backgroundSize: '200% 100%',
                animation: isVisible ? 'balayageRTL 3s ease-in-out infinite' : 'none'
              }}
            >
              <span className="relative z-10">Book Your Call</span>
            </Link>
            <Link
              href="/programs"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold border-2 border-amber-500 text-slate-900 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              aria-label="View Programs"
            >
              <span className="relative z-10">View Programs</span>
            </Link>
          </div>
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

      {/* About Coach */}
      <section className="grid md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
        <div className="md:col-span-2 rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-sm p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Meet Your Coach</h2>
          <p className="text-sm sm:text-base text-slate-800">
            <span className="font-semibold">Moteib bin Nasser AlAjmi</span> is a certified leadership coach from Saudi Arabia with a proven track record of helping managers transform their leadership style and build balanced, successful lives.
          </p>
          <p className="text-sm sm:text-base text-slate-700">
            With years of experience in leadership development and a deep understanding of the challenges facing modern managers, Moteib bin Nasser AlAjmi combines practical strategies with personalized guidance to help you achieve sustainable growth.
          </p>
          <Link
            href="/coach"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            Learn more about Moteib bin Nasser AlAjmi
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-sm p-4 sm:p-6 flex flex-col justify-center items-center">
          <div className="relative w-32 h-32 mb-3">
            <Image
              src="/logo.png"
              alt="MINDSHIFT ARABIA Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-center text-sm text-slate-700 italic">
            Balance Minds. Build Futures.
          </p>
        </div>
      </section>

      {/* What You'll Achieve */}
      <section className="rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-sm p-4 sm:p-6 space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">What You&apos;ll Achieve</h2>
        <p className="text-sm sm:text-base text-slate-800">
          Our coaching programs are designed to create lasting transformation in your leadership and life.
        </p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-800">
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">Clear Direction</span>
            Develop a clear vision for your leadership journey and career path.
          </li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">Work-Life Balance</span>
            Build sustainable habits that support both professional and personal success.
          </li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">Team Excellence</span>
            Learn to inspire, motivate, and develop high-performing teams.
          </li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">Strategic Thinking</span>
            Enhance your decision-making and strategic planning capabilities.
          </li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">Confident Communication</span>
            Master the art of clear, impactful communication at all levels.
          </li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">Lasting Growth</span>
            Create sustainable change that continues long after coaching ends.
          </li>
        </ul>
      </section>

      {/* Coaching Approach */}
      <section className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-sm p-4 sm:p-6 space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Our Approach</h2>
          <p className="text-sm sm:text-base text-slate-800">
            Every coaching journey is personalized to your unique challenges, goals, and context. We combine proven frameworks with practical tools that you can apply immediately in your leadership role.
          </p>
          <p className="text-sm sm:text-base text-slate-700">
            Through one-on-one sessions, actionable assignments, and ongoing support, you&apos;ll develop the skills and mindset needed to lead with confidence and balance.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-sm p-4 sm:p-6 space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Who It&apos;s For</h2>
          <p className="text-sm sm:text-base text-slate-800">
            Our programs are ideal for managers and leaders who are committed to personal growth and want to create positive change in their teams and organizations.
          </p>
          <p className="text-sm sm:text-base text-slate-700">
            Whether you&apos;re a new manager or an experienced executive, our coaching will meet you where you are and help you reach your full potential.
          </p>
        </div>
      </section>

      {/* Coaching Programs */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">Choose Your Coaching Journey</h2>
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto">
            Tailored leadership programs designed to meet you where you are and take you where you want to be.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {/* 6-Month Program */}
          <div className="rounded-xl border-2 border-slate-200 bg-[#f8f4ed] shadow-sm p-4 sm:p-6 space-y-4 hover:border-amber-500 transition-colors">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">6-Month Program</h3>
              <p className="text-sm text-slate-600">Foundation Building</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Core leadership fundamentals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Self-awareness development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Communication skills mastery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Work-life balance strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Bi-weekly coaching sessions</span>
              </li>
            </ul>
            <Link
              href="https://calendly.com/coach_moteib"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-md px-4 py-2.5 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* 9-Month Program */}
          <div className="rounded-xl border-2 border-amber-500 bg-[#f8f4ed] shadow-lg p-4 sm:p-6 space-y-4 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">9-Month Program</h3>
              <p className="text-sm text-slate-600">Advanced Development</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Everything in 6-month program</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Advanced team dynamics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Conflict resolution mastery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Strategic decision-making</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Weekly coaching sessions</span>
              </li>
            </ul>
            <Link
              href="https://calendly.com/coach_moteib"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-md px-4 py-2.5 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* 12-Month Program */}
          <div className="rounded-xl border-2 border-slate-200 bg-[#f8f4ed] shadow-sm p-4 sm:p-6 space-y-4 hover:border-amber-500 transition-colors">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">12-Month Program</h3>
              <p className="text-sm text-slate-600">Complete Transformation</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Everything in 9-month program</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Strategic leadership mastery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Organizational change management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Executive presence development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Priority coaching & support</span>
              </li>
            </ul>
            <Link
              href="https://calendly.com/coach_moteib"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-md px-4 py-2.5 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-3 sm:space-y-4 text-slate-900 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Ready to Transform Your Leadership?</h2>
        <p className="text-sm sm:text-base text-slate-700">Book your complimentary consultation call today and discover how coaching can help you build the balanced, successful life you deserve.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/programs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold border-2 border-amber-500 text-slate-900 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors"
            aria-label="View All Programs"
          >
            View All Programs
          </Link>
        </div>
      </section>
    </main>
  )
}
