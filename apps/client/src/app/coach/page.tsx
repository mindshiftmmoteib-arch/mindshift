"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function CoachPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="space-y-12 sm:space-y-16 relative">
      {/* Hero Section */}
      <section className="text-center space-y-6 px-2">
        <div className={`transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative w-40 h-40 mx-auto mb-6">
            <Image
              src="/logo.png"
              alt="Coach Moteib Alajmi"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Coach Moteib Alajmi
          </h1>
          <p className="text-lg sm:text-xl text-amber-600 font-semibold mt-3">
            Certified Leadership Coach | Saudi Arabia
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">About Coach Moteib</h2>
          <p className="text-base text-slate-800 leading-relaxed">
            Coach Moteib Alajmi is a certified leadership coach based in Saudi Arabia, dedicated to helping managers and leaders build balanced, successful lives while achieving their professional goals.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            With a deep understanding of the unique challenges facing leaders in today&apos;s fast-paced world, Coach Moteib brings a practical, results-oriented approach to leadership development. His coaching philosophy centers on creating sustainable change that extends beyond professional success to encompass personal fulfillment and well-being.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            Having worked with managers across various industries and organizational levels, Coach Moteib has developed a proven methodology that combines evidence-based practices with culturally relevant insights tailored to the Saudi Arabian and Middle Eastern context.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Coaching Philosophy</h2>
          <p className="text-base text-slate-800 leading-relaxed">
            &ldquo;True leadership isn&apos;t about achieving more at the expense of your well-being. It&apos;s about building a balanced life where professional excellence and personal fulfillment coexist.&rdquo;
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            Coach Moteib believes that the most effective leaders are those who:
          </p>
          <ul className="space-y-2 text-base text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Lead with authenticity and self-awareness</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Prioritize sustainable practices over short-term gains</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Develop others while continuously growing themselves</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Balance ambition with well-being</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Areas of Expertise</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Leadership Development</h3>
            <p className="text-sm text-slate-700">
              Building core leadership competencies and executive presence
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Team Performance</h3>
            <p className="text-sm text-slate-700">
              Creating high-performing, cohesive teams that deliver results
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Work-Life Integration</h3>
            <p className="text-sm text-slate-700">
              Achieving sustainable balance between professional and personal life
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Strategic Thinking</h3>
            <p className="text-sm text-slate-700">
              Developing long-term vision and effective decision-making skills
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Communication Mastery</h3>
            <p className="text-sm text-slate-700">
              Enhancing interpersonal skills and influential communication
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Change Management</h3>
            <p className="text-sm text-slate-700">
              Leading organizational transformation with confidence
            </p>
          </div>
        </div>
      </section>

      {/* Credentials & Background */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Credentials & Certifications</h2>
          <ul className="space-y-3 text-base text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-amber-500 text-xl">✓</span>
              <span>Certified Professional Coach (CPC)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 text-xl">✓</span>
              <span>Leadership Development Specialist</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 text-xl">✓</span>
              <span>Organizational Development Practitioner</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 text-xl">✓</span>
              <span>Executive Coaching Certification</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Background</h2>
          <p className="text-base text-slate-700 leading-relaxed">
            Based in Saudi Arabia, Coach Moteib brings a unique perspective that blends international best practices with deep cultural understanding of the Middle Eastern business environment.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            His work spans private and public sectors, helping leaders at all levels—from emerging managers to C-suite executives—develop the skills and mindset needed for sustainable success.
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">What Leaders Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-3">
            <p className="text-base text-slate-700 italic leading-relaxed">
              &ldquo;Working with Coach Moteib transformed not just my leadership style, but my entire approach to life. I&apos;m now more effective at work while actually having time for my family.&rdquo;
            </p>
            <p className="text-sm text-slate-600 font-semibold">
              — Senior Manager, Technology Sector
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-3">
            <p className="text-base text-slate-700 italic leading-relaxed">
              &ldquo;The strategic thinking frameworks I learned have been invaluable. Coach Moteib helped me develop clarity and confidence in my decision-making.&rdquo;
            </p>
            <p className="text-sm text-slate-600 font-semibold">
              — Director, Healthcare Organization
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-3">
            <p className="text-base text-slate-700 italic leading-relaxed">
              &ldquo;The personalized approach and practical tools made all the difference. I saw immediate improvements in my team&apos;s performance and morale.&rdquo;
            </p>
            <p className="text-sm text-slate-600 font-semibold">
              — Team Lead, Financial Services
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-3">
            <p className="text-base text-slate-700 italic leading-relaxed">
              &ldquo;Coach Moteib&apos;s insights into balancing cultural expectations with modern leadership practices were exactly what I needed.&rdquo;
            </p>
            <p className="text-sm text-slate-600 font-semibold">
              — Executive, Public Sector
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 rounded-xl border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-yellow-50 p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Ready to Start Your Leadership Journey?
        </h2>
        <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto">
          Book a complimentary consultation call to discuss your goals and discover how coaching can help you achieve them.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="https://calendly.com/coach_moteib"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
          >
            Book Your Free Consultation
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold border-2 border-slate-900 text-slate-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors"
          >
            View Coaching Programs
          </Link>
        </div>
      </section>
    </main>
  )
}

