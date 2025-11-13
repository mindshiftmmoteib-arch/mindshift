"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Tajawal } from "next/font/google"

const tajawal = Tajawal({
  weight: ['400', '500', '700'],
  subsets: ["arabic"],
  display: 'swap',
})

export default function ContactPageArabic() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    document.documentElement.setAttribute('dir', 'rtl')
    document.documentElement.setAttribute('lang', 'ar')
    
    return () => {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', 'en')
    }
  }, [])

  return (
    <main className={`space-y-12 sm:space-y-16 relative ${tajawal.className}`}>
      {/* Hero */}
      <section className="text-center space-y-4 px-2">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          احجز استشارتك المجانية
        </h1>
        <p className={`mx-auto max-w-3xl text-base sm:text-lg text-slate-700 px-2 transition-all duration-1000 delay-300 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          اتخذ الخطوة الأولى نحو تحويل قيادتك. جدول استشارة مجانية مع المدرب مطيب العجمي.
        </p>
      </section>

      {/* Main Content */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Calendly Embed */}
        <div className="rounded-xl border-2 border-amber-500 bg-white shadow-lg p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">جدول مكالمتك</h2>
            <p className="text-base text-slate-700">
              اضغط على الزر أدناه لعرض الأوقات المتاحة وحجز مكالمة استشارية مجانية لمدة 30 دقيقة.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>جلسة مجانية لمدة 30 دقيقة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>مناقشة أهدافك القيادية</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>تعرف على برامج التدريب</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>لا يوجد التزام أو تعهد مطلوب</span>
              </li>
            </ul>
          </div>

          <Link
            href="https://calendly.com/coach_moteib"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-md px-6 py-4 font-semibold text-lg text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
          >
            عرض الأوقات المتاحة
          </Link>

          <p className="text-xs text-slate-600 text-center">
            ستتم إعادة توجيهك إلى Calendly لاختيار التاريخ والوقت المفضلين لديك
          </p>
        </div>

        {/* What to Expect */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">ماذا تتوقع</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="text-amber-500">1.</span> التحضير للمكالمة
                </h3>
                <p className="text-sm text-slate-700">
                  بعد الحجز، ستتلقى بريدًا إلكترونيًا تأكيديًا مع استبيان موجز لمساعدتنا على فهم أهدافك وتحدياتك.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="text-amber-500">2.</span> جلسة الاكتشاف
                </h3>
                <p className="text-sm text-slate-700">
                  خلال مكالمتنا، سنناقش رحلتك القيادية والتحديات الحالية والطموحات. هذا وقتك لطرح الأسئلة ومعرفة المزيد عن التدريب.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="text-amber-500">3.</span> توصيات البرنامج
                </h3>
                <p className="text-sm text-slate-700">
                  بناءً على احتياجاتك، سيوصي المدرب مطيب بالبرنامج الذي يتماشى بشكل أفضل مع أهدافك وجدولك الزمني.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="text-amber-500">4.</span> الخطوات التالية
                </h3>
                <p className="text-sm text-slate-700">
                  إذا كنا متوافقين بشكل جيد، سنناقش خيارات التسجيل والخطوات التالية. لا يوجد ضغط—هذه مجرد محادثة استكشافية.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">لديك أسئلة؟</h3>
            <p className="text-sm text-slate-700">
              إذا كنت ترغب في معرفة المزيد قبل الحجز، لا تتردد في استكشاف برامج التدريب الخاصة بنا أو معرفة المزيد عن المدرب مطيب.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/ar/programs"
                className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold border-2 border-slate-300 text-slate-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors"
              >
                عرض البرامج
              </Link>
              <Link
                href="/ar/coach"
                className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold border-2 border-slate-300 text-slate-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors"
              >
                عن المدرب مطيب
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Book Now */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center">لماذا تحجز استشارتك الآن؟</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-slate-900">احصل على الوضوح</h3>
            <p className="text-sm text-slate-700">
              احصل على وضوح تام بشأن أهدافك القيادية والطريق لتحقيقها.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="font-semibold text-slate-900">تسريع النمو</h3>
            <p className="text-sm text-slate-700">
              تعلم كيف يمكن للتدريب المنظم أن يسرع تطوير قيادتك.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="font-semibold text-slate-900">اعثر على ما يناسبك</h3>
            <p className="text-sm text-slate-700">
              اكتشف ما إذا كان التدريب مع المدرب مطيب هو التوافق الصحيح لاحتياجاتك.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 p-8">
        <h2 className="text-2xl font-bold text-slate-900">هل أنت مستعد لتحويل قيادتك؟</h2>
        <p className="text-base text-slate-700 max-w-2xl mx-auto">
          لا تنتظر للاستثمار في تطوير قيادتك. احجز استشارتك المجانية اليوم.
        </p>
        <Link
          href="https://calendly.com/coach_moteib"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
        >
          احجز استشارتك المجانية
        </Link>
      </section>
    </main>
  )
}

