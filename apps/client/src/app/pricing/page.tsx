import Link from "next/link"

export default function PricingPage() {
  return (
    <main className="space-y-12 relative">
      {/* Background motif to match landing */}
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
      <section className="text-center space-y-5 text-slate-900">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Plans that scale with your voice</h1>
        <p className="mx-auto max-w-3xl text-lg md:text-xl text-slate-700">
          Value = (Global Reach × Emotional Authenticity) ÷ (Delay × Friction). We optimize each lever so you communicate naturally — across every language, instantly.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur px-4 py-2 text-sm text-slate-800">
          <span className="font-semibold">💫 30‑Day Guarantee</span>
          <span aria-hidden>•</span>
          <span>Love it or it&apos;s free. Cancel anytime. Keep your call transcripts and exports.</span>
        </div>
      </section>

      {/* Pricing grid */}
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
        {/* Creator Pass */}
        <PlanCard
          title="Creator Pass"
          pricePrimary="$7/mo"
          priceSecondary="$9 one‑time"
          highlight="Starter • Creator Pass"
          ctaHref="/signup?plan=creator"
          ctaLabel="Start with Creator"
          features={[
            '🌍 100 translation minutes/month',
            '🎙 Voice cloning (1 voice)',
            '🧠 Context-aware translation (up to 90% accuracy)',
            '🎧 Real-time mic-to-mic calls (2 participants)',
            '💾 Export transcripts & audio files',
            '🪄 3 starter templates for calls, podcasts & meetings',
            '🤝 Access to TRAVoices Community',
            '🎁 Share TRAVoices and earn free translation minutes',
          ]}
        />

        {/* Pro Translator (Featured) */}
        <PlanCard
          title="Pro Translator"
          pricePrimary="$29/mo"
          badge="For small teams, creators, and multilingual businesses"
          featured
          ctaHref="/signup?plan=pro"
          ctaLabel="Go Pro"
          features={[
            'Everything in Creator, plus:',
            '⚡️ Unlimited translation minutes',
            '🗣 Up to 3 cloned voices (for multilingual personas)',
            '🌐 Custom AI accents (choose tone & emotion)',
            '🧩 API & WebRTC integration',
            '📊 Conversation summaries & emotion tracking',
            '🔁 Team collaboration dashboard',
            '🕒 Live subtitle & transcript sync',
          ]}
        />

        {/* Team Connect */}
        <PlanCard
          title="Team Connect"
          pricePrimary="$79/mo"
          priceSmall="(3 seats, +$15/extra)"
          badge="Perfect for startups, agencies, and teams"
          ctaHref="/signup?plan=team"
          ctaLabel="Start Team"
          features={[
            'Everything in Pro, plus:',
            '🧑‍💼 Shared workspace for calls & sessions',
            '🧾 Centralized transcript management',
            '🏷 Role-based voice translation (CEO, Dev, Sales)',
            '🗂 Call analytics & performance reports',
            '🔒 Advanced collaboration permissions',
            '💬 Commenting & annotation tools',
          ]}
        />

        {/* Enterprise */}
        <PlanCard
          title="Enterprise Voice Infrastructure"
          pricePrimary="$299+/mo"
          badge="For enterprises, telecoms, and global platforms"
          ctaHref="/signup?plan=enterprise"
          ctaLabel="Talk to Sales"
          features={[
            '🏢 Dedicated translation servers',
            '🔐 SSO & SOC2 readiness',
            '⚙️ White-label & API access',
            '📈 Real-time analytics dashboards',
            '🧑‍💻 Premium onboarding & SLA support',
            '🗣 Model fine-tuning for internal voice data',
            '🧾 Voice identity security suite',
          ]}
        />

        {/* Founding Partner Pass */}
        <PlanCard
          title="Founding Partner Pass"
          pricePrimary="$179 one‑time"
          badge="Limited to 500"
          ctaHref="/signup?plan=founder"
          ctaLabel="Become a Founder"
          features={[
            'Become part of the TRAVoices legacy.',
            'Lifetime Pro access + Founder badge + early access to all upcoming features.',
            '🧬 Lifetime access to all Pro updates',
            '💎 Premium lifetime support',
            '🪪 "Founding Partner" badge',
            '🏆 Your name featured on travoices.ai (optional)',
          ]}
        />
      </section>

      {/* Value boosters */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-6 space-y-3 text-slate-900">
          <h2 className="text-xl font-bold">Voice the World Challenge</h2>
          <p className="text-slate-800">Speak across 5 languages for 7 days and get your AI-generated communication profile — a unique report on your tone, pace, and translation style.</p>
          <ul className="list-disc pl-5 text-slate-800 space-y-1">
            <li>Share your results with #TRAVoicesChallenge</li>
            <li>🎁 Earn 1 free month or unlock a premium accent pack</li>
          </ul>
          <div>
            <Link href="/signup?challenge=7day" className="inline-flex items-center gap-2 rounded-md px-4 py-2 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30" aria-label="Join the 7-Day Challenge">
              Join the 7‑Day Challenge
            </Link>
          </div>
        </div>
        <div className="rounded-xl border border-black/10 bg-white/70 backdrop-blur p-6 space-y-3 text-slate-900">
          <h2 className="text-xl font-bold">Risk‑Free by Design</h2>
          <ul className="list-disc pl-5 text-slate-800 space-y-1">
            <li>✅ 30‑day money‑back guarantee</li>
            <li>✅ Cancel anytime</li>
            <li>✅ Keep all your exports & voice data</li>
            <li>✅ Fast onboarding — no technical setup required</li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-4 text-slate-900">
        <h2 className="text-2xl md:text-3xl font-bold">Ready to speak without barriers?</h2>
        <p className="text-slate-700">Start with the Creator Pass or jump straight into Pro Translator. Upgrade or cancel anytime.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/signup?plan=pro" className="inline-flex items-center gap-2 rounded-md px-5 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30" aria-label="Choose Pro plan">
            Get Pro
          </Link>
          <Link href="/signup?plan=creator" className="inline-flex items-center gap-2 rounded-md px-5 py-3 font-semibold border border-black/10 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-white/30" aria-label="Start with Creator plan">
            Start with Creator
          </Link>
        </div>
      </section>
    </main>
  )
}

type PlanCardProps = {
  title: string
  pricePrimary: string
  priceSecondary?: string
  priceSmall?: string
  badge?: string
  highlight?: string
  featured?: boolean
  ctaHref: string
  ctaLabel: string
  features: string[]
}

function PlanCard(props: PlanCardProps) {
  const { title, pricePrimary, priceSecondary, priceSmall, badge, highlight, featured, ctaHref, ctaLabel, features } = props

  const containerClass = featured
    ? "relative rounded-xl border-2 border-amber-500/70 bg-white/80 backdrop-blur p-6 text-slate-900 shadow-[0_10px_30px_rgba(217,119,6,0.25)]"
    : "relative rounded-xl border border-black/10 bg-white/70 backdrop-blur p-6 text-slate-900"

  return (
    <div className={containerClass}>
      {badge ? (
        <span className="absolute -top-3 left-4 rounded-full border border-black/10 bg-gradient-to-r from-yellow-300 to-amber-400 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
          {badge}
        </span>
      ) : null}
      {highlight ? (
        <span className="absolute -top-3 right-4 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700">
          {highlight}
        </span>
      ) : null}

      <div className="space-y-1">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold">{pricePrimary}</span>
          {priceSmall ? (<span className="text-xs text-slate-600">{priceSmall}</span>) : null}
        </div>
        {priceSecondary ? (
          <div className="text-sm text-slate-700">or <span className="font-semibold">{priceSecondary}</span></div>
        ) : null}
      </div>

      <ul className="mt-4 space-y-2 text-sm text-slate-800">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <Link
          href={ctaHref}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label={ctaLabel}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  )
}


