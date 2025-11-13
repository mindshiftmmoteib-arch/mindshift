"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Tajawal } from "next/font/google"

const tajawal = Tajawal({
  weight: ['400', '500', '700'],
  subsets: ["arabic"],
  display: 'swap',
})

export default function ArabicLandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Set RTL direction on html element
    document.documentElement.setAttribute('dir', 'rtl')
    document.documentElement.setAttribute('lang', 'ar')
    
    return () => {
      // Reset to LTR when leaving
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', 'en')
    }
  }, [])

  return (
    <main className={`space-y-12 sm:space-y-16 relative ${tajawal.className}`}>
      {/* Hero Banner */}
      <section className="relative w-full rounded-xl overflow-hidden shadow-lg">
        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
          <Image
            src="/banner-hero.jpg"
            alt="MINDSHIFT ARABIA - توازن العقول. بناء المستقبل. مدرب القيادة"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Hero */}
      <section className="text-center space-y-4 sm:space-y-6 text-slate-900 px-2">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className={`inline-block transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>بناء قيادة متوازنة</span>{' '}
          <span className={`inline-block transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>مع المدرب مطيب العجمي</span>
        </h1>
        <p className={`mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-slate-700 px-2 transition-all duration-1000 delay-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          مساعدة المديرين على بناء حياة متوازنة من خلال برامج تدريب قيادية مُثبتة.
          حوّل أسلوب إدارتك، قوّي فريقك، واحصل على نجاح دائم.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="https://calendly.com/coach_moteib"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-slate-900 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30 relative overflow-hidden bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            aria-label="احجز مكالمتك"
            style={{
              backgroundSize: '200% 100%',
              animation: isVisible ? 'balayageLTR 3s ease-in-out infinite' : 'none'
            }}
          >
            <span className="relative z-10">احجز مكالمتك</span>
          </Link>
          <Link
            href="/ar/programs"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold border-2 border-amber-500 text-slate-900 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            aria-label="عرض البرامج"
          >
            <span className="relative z-10">عرض البرامج</span>
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

      {/* Coaching Programs */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">اختر رحلتك التدريبية</h2>
          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto">
            برامج قيادية مصممة خصيصًا لتلبية احتياجاتك وتحقيق أهدافك.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {/* 6-Month Program */}
          <div className="rounded-xl border-2 border-slate-200 bg-white shadow-sm p-4 sm:p-6 space-y-4 hover:border-amber-500 transition-colors">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">برنامج 6 أشهر</h3>
              <p className="text-sm text-slate-600">بناء الأساسيات</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>أساسيات القيادة الجوهرية</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>تطوير الوعي الذاتي</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>إتقان مهارات التواصل</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>استراتيجيات التوازن بين العمل والحياة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>جلسات تدريب كل أسبوعين</span>
              </li>
            </ul>
            <Link
              href="https://calendly.com/coach_moteib"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-md px-4 py-2.5 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
            >
              ابدأ الآن
            </Link>
          </div>

          {/* 9-Month Program */}
          <div className="rounded-xl border-2 border-amber-500 bg-white shadow-lg p-4 sm:p-6 space-y-4 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
              الأكثر شعبية
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">برنامج 9 أشهر</h3>
              <p className="text-sm text-slate-600">التطوير المتقدم</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>كل ما في برنامج 6 أشهر</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>ديناميكيات الفريق المتقدمة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>إتقان حل النزاعات</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>اتخاذ القرارات الاستراتيجية</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>جلسات تدريب أسبوعية</span>
              </li>
            </ul>
            <Link
              href="https://calendly.com/coach_moteib"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-md px-4 py-2.5 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
            >
              ابدأ الآن
            </Link>
          </div>

          {/* 12-Month Program */}
          <div className="rounded-xl border-2 border-slate-200 bg-white shadow-sm p-4 sm:p-6 space-y-4 hover:border-amber-500 transition-colors">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">برنامج 12 شهر</h3>
              <p className="text-sm text-slate-600">التحول الكامل</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>كل ما في برنامج 9 أشهر</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>إتقان القيادة الاستراتيجية</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>إدارة التغيير التنظيمي</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>تطوير الحضور التنفيذي</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">✓</span>
                <span>دعم تدريبي مخصص وذو أولوية</span>
              </li>
            </ul>
            <Link
              href="https://calendly.com/coach_moteib"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-md px-4 py-2.5 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
            >
              ابدأ الآن
            </Link>
          </div>
        </div>
      </section>

      {/* About Coach */}
      <section className="grid md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
        <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">تعرّف على مدربك</h2>
          <p className="text-sm sm:text-base text-slate-800">
            <span className="font-semibold">المدرب مطيب العجمي</span> هو مدرب قيادة معتمد من المملكة العربية السعودية يتمتع بسجل حافل في مساعدة المديرين على تحويل أسلوب قيادتهم وبناء حياة متوازنة وناجحة.
          </p>
          <p className="text-sm sm:text-base text-slate-700">
            بفضل سنوات من الخبرة في تطوير القيادة وفهم عميق للتحديات التي تواجه المديرين المعاصرين، يجمع المدرب مطيب بين الاستراتيجيات العملية والإرشاد الشخصي لمساعدتك على تحقيق نمو مستدام.
          </p>
          <Link
            href="/ar/coach"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            اعرف المزيد عن المدرب مطيب
            <span aria-hidden="true">←</span>
          </Link>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6 flex flex-col justify-center items-center">
          <div className="relative w-32 h-32 mb-3">
            <Image
              src="/logo.png"
              alt="شعار MINDSHIFT ARABIA"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-center text-sm text-slate-700 italic">
            توازن العقول. بناء المستقبل.
          </p>
        </div>
      </section>

      {/* What You'll Achieve */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6 space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">ما الذي ستحققه</h2>
        <p className="text-sm sm:text-base text-slate-800">
          برامجنا التدريبية مصممة لخلق تحول دائم في قيادتك وحياتك.
        </p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-800">
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">🎯 اتجاه واضح</span>
            تطوير رؤية واضحة لرحلتك القيادية ومسارك المهني.
          </li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">⚖️ توازن بين العمل والحياة</span>
            بناء عادات مستدامة تدعم النجاح المهني والشخصي.
          </li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">👥 تميّز الفريق</span>
            تعلّم كيفية إلهام وتحفيز وتطوير فرق عالية الأداء.
          </li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">💡 تفكير استراتيجي</span>
            تعزيز قدراتك في اتخاذ القرارات والتخطيط الاستراتيجي.
          </li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">🗣️ تواصل واثق</span>
            إتقان فن التواصل الواضح والمؤثر على جميع المستويات.
          </li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="block font-semibold text-sm sm:text-base mb-1">🚀 نمو دائم</span>
            خلق تغيير مستدام يستمر لفترة طويلة بعد انتهاء التدريب.
          </li>
        </ul>
      </section>

      {/* Coaching Approach */}
      <section className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6 space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">منهجنا</h2>
          <p className="text-sm sm:text-base text-slate-800">
            كل رحلة تدريبية مخصصة لتحدياتك وأهدافك وسياقك الفريد. نجمع بين الأطر المجربة والأدوات العملية التي يمكنك تطبيقها فورًا في دورك القيادي.
          </p>
          <p className="text-sm sm:text-base text-slate-700">
            من خلال جلسات فردية، ومهام قابلة للتنفيذ، ودعم مستمر، ستطور المهارات والعقلية اللازمة للقيادة بثقة وتوازن.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6 space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">لمن هذا البرنامج</h2>
          <p className="text-sm sm:text-base text-slate-800">
            برامجنا مثالية للمديرين والقادة الملتزمين بالنمو الشخصي والراغبين في إحداث تغيير إيجابي في فرقهم ومؤسساتهم.
          </p>
          <p className="text-sm sm:text-base text-slate-700">
            سواء كنت مديرًا جديدًا أو مديرًا تنفيذيًا ذا خبرة، سيلبي تدريبنا احتياجاتك ويساعدك على الوصول إلى إمكاناتك الكاملة.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center space-y-3 sm:space-y-4 text-slate-900 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">هل أنت مستعد لتحويل قيادتك؟</h2>
        <p className="text-sm sm:text-base text-slate-700">احجز مكالمتك الاستشارية المجانية اليوم واكتشف كيف يمكن للتدريب أن يساعدك على بناء الحياة المتوازنة والناجحة التي تستحقها.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="https://calendly.com/coach_moteib"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="احجز مكالمتك اليوم"
          >
            احجز مكالمتك اليوم
          </Link>
          <Link
            href="/ar/programs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold border-2 border-amber-500 text-slate-900 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-colors"
            aria-label="عرض جميع البرامج"
          >
            عرض جميع البرامج
          </Link>
        </div>
      </section>
    </main>
  )
}

