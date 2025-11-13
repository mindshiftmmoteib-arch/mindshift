"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="space-y-12 sm:space-y-16 relative">
      {/* Hero */}
      <section className="text-center space-y-4 px-2">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Book Your Free Consultation
        </h1>
        <p className={`mx-auto max-w-3xl text-base sm:text-lg text-slate-700 px-2 transition-all duration-1000 delay-300 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Take the first step towards transforming your leadership. Schedule a complimentary consultation with Coach Moteib Alajmi.
        </p>
      </section>

      {/* Main Content */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Calendly Embed */}
        <div className="rounded-xl border-2 border-amber-500 bg-white shadow-lg p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Schedule Your Call</h2>
            <p className="text-base text-slate-700">
              Click the button below to view available times and book your free 30-minute consultation call.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>30-minute complimentary session</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Discuss your leadership goals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>Learn about coaching programs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>No obligation or commitment required</span>
              </li>
            </ul>
          </div>

          <Link
            href="https://calendly.com/coach_moteib"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-md px-6 py-4 font-semibold text-lg text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
          >
            View Available Times
          </Link>

          <p className="text-xs text-slate-600 text-center">
            You&apos;ll be redirected to Calendly to select your preferred date and time
          </p>
        </div>

        {/* What to Expect */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">What to Expect</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="text-amber-500">1.</span> Pre-Call Preparation
                </h3>
                <p className="text-sm text-slate-700">
                  After booking, you&apos;ll receive a confirmation email with a brief questionnaire to help us understand your goals and challenges.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="text-amber-500">2.</span> Discovery Session
                </h3>
                <p className="text-sm text-slate-700">
                  During our call, we&apos;ll discuss your leadership journey, current challenges, and aspirations. This is your time to ask questions and learn more about coaching.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="text-amber-500">3.</span> Program Recommendations
                </h3>
                <p className="text-sm text-slate-700">
                  Based on your needs, Coach Moteib will recommend the program that best aligns with your goals and timeline.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="text-amber-500">4.</span> Next Steps
                </h3>
                <p className="text-sm text-slate-700">
                  If we&apos;re a good fit, we&apos;ll discuss enrollment options and next steps. There&apos;s no pressure—this is purely an exploratory conversation.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Have Questions?</h3>
            <p className="text-sm text-slate-700">
              If you&apos;d like to learn more before booking, feel free to explore our coaching programs or learn more about Coach Moteib.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold border-2 border-slate-300 text-slate-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors"
              >
                View Programs
              </Link>
              <Link
                href="/coach"
                className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold border-2 border-slate-300 text-slate-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors"
              >
                About Coach Moteib
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Book Now */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">Why Book Your Consultation Now?</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-slate-900">Gain Clarity</h3>
            <p className="text-sm text-slate-700">
              Get crystal clear on your leadership goals and the path to achieve them.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="font-semibold text-slate-900">Accelerate Growth</h3>
            <p className="text-sm text-slate-700">
              Learn how structured coaching can fast-track your leadership development.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="font-semibold text-slate-900">Find Your Fit</h3>
            <p className="text-sm text-slate-700">
              Discover if coaching with Coach Moteib is the right match for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 p-8">
        <h2 className="text-2xl font-bold text-slate-900">Ready to Transform Your Leadership?</h2>
        <p className="text-base text-slate-700 max-w-2xl mx-auto">
          Don&apos;t wait to invest in your leadership development. Book your free consultation today.
        </p>
        <Link
          href="https://calendly.com/coach_moteib"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
        >
          Book Your Free Consultation
        </Link>
      </section>
    </main>
  )
}

