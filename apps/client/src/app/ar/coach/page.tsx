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

export default function CoachPageArabic() {
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
      {/* Hero Section */}
      <section className="text-center space-y-6 px-2">
        <div className={`transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative w-40 h-40 mx-auto mb-6">
            <Image
              src="/logo.png"
              alt="الكوتش متعب بن ناصر العجمي"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            الكوتش متعب بن ناصر العجمي
          </h1>
          <p className="text-lg sm:text-xl text-amber-600 font-semibold mt-3">
            مدرب قيادة معتمد | المملكة العربية السعودية
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-sm p-6 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">عن الكوتش متعب بن ناصر</h2>
          <p className="text-base text-slate-800 leading-relaxed">
            الكوتش متعب بن ناصر العجمي هو مدرب قيادة معتمد من المملكة العربية السعودية، مكرس لمساعدة المديرين والقادة على بناء حياة متوازنة وناجحة مع تحقيق أهدافهم المهنية.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            بفهم عميق للتحديات الفريدة التي تواجه القادة في عالم اليوم سريع الوتيرة، يجلب الكوتش متعب بن ناصر نهجًا عمليًا موجهًا نحو النتائج في تطوير القيادة. تتمحور فلسفة تدريبه حول خلق تغيير مستدام يمتد إلى ما وراء النجاح المهني ليشمل الإشباع الشخصي والرفاهية.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            بعد عمله مع مديرين عبر مختلف الصناعات والمستويات التنظيمية، طور الكوتش متعب بن ناصر منهجية مثبتة تجمع بين الممارسات القائمة على الأدلة والرؤى ذات الصلة الثقافية المصممة خصيصًا للسياق السعودي والشرق أوسطي.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-sm p-6 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">فلسفة التدريب</h2>
          <p className="text-base text-slate-800 leading-relaxed">
            &ldquo;القيادة الحقيقية ليست في تحقيق المزيد على حساب رفاهيتك. إنها في بناء حياة متوازنة حيث يتعايش التميز المهني والإشباع الشخصي.&rdquo;
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            يؤمن الكوتش متعب بن ناصر بأن القادة الأكثر فعالية هم أولئك الذين:
          </p>
          <ul className="space-y-2 text-base text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>يقودون بأصالة ووعي ذاتي</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>يعطون الأولوية للممارسات المستدامة على المكاسب قصيرة الأجل</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>يطورون الآخرين بينما ينمون باستمرار</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>يوازنون بين الطموح والرفاهية</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">مجالات الخبرة</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">تطوير القيادة</h3>
            <p className="text-sm text-slate-700">
              بناء الكفاءات القيادية الأساسية والحضور التنفيذي
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">أداء الفريق</h3>
            <p className="text-sm text-slate-700">
              إنشاء فرق عالية الأداء ومتماسكة تحقق النتائج
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">التكامل بين العمل والحياة</h3>
            <p className="text-sm text-slate-700">
              تحقيق توازن مستدام بين الحياة المهنية والشخصية
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">التفكير الاستراتيجي</h3>
            <p className="text-sm text-slate-700">
              تطوير الرؤية طويلة الأمد ومهارات اتخاذ القرارات الفعالة
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">إتقان التواصل</h3>
            <p className="text-sm text-slate-700">
              تعزيز المهارات الشخصية والتواصل المؤثر
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">إدارة التغيير</h3>
            <p className="text-sm text-slate-700">
              قيادة التحول التنظيمي بثقة
            </p>
          </div>
        </div>
      </section>

      {/* Credentials & Background */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-sm p-6 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">الشهادات والمؤهلات</h2>
          <ul className="space-y-3 text-base text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-amber-500 text-xl">✓</span>
              <span>مدرب محترف معتمد (CPC)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 text-xl">✓</span>
              <span>أخصائي تطوير القيادة</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 text-xl">✓</span>
              <span>ممارس التطوير التنظيمي</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 text-xl">✓</span>
              <span>شهادة التدريب التنفيذي</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-sm p-6 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">الخلفية</h2>
          <p className="text-base text-slate-700 leading-relaxed">
            يقع الكوتش متعب بن ناصر في المملكة العربية السعودية، ويجلب منظورًا فريدًا يمزج بين أفضل الممارسات الدولية والفهم الثقافي العميق لبيئة الأعمال في الشرق الأوسط.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            يمتد عمله عبر القطاعين الخاص والعام، حيث يساعد القادة على جميع المستويات—من المديرين الناشئين إلى المسؤولين التنفيذيين—على تطوير المهارات والعقلية اللازمة للنجاح المستدام.
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">ماذا يقول القادة</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#f8f4ed] rounded-lg p-6 shadow-sm space-y-3">
            <p className="text-base text-slate-700 italic leading-relaxed">
              &ldquo;العمل مع الكوتش متعب بن ناصر غيّر ليس فقط أسلوب قيادتي، بل نهجي الكامل للحياة. أنا الآن أكثر فعالية في العمل بينما لدي في الواقع وقت لعائلتي.&rdquo;
            </p>
            <p className="text-sm text-slate-600 font-semibold">
              — مدير أول، قطاع التكنولوجيا
            </p>
          </div>
          <div className="bg-[#f8f4ed] rounded-lg p-6 shadow-sm space-y-3">
            <p className="text-base text-slate-700 italic leading-relaxed">
              &ldquo;أطر التفكير الاستراتيجي التي تعلمتها كانت لا تقدر بثمن. ساعدني الكوتش متعب بن ناصر على تطوير الوضوح والثقة في اتخاذ قراراتي.&rdquo;
            </p>
            <p className="text-sm text-slate-600 font-semibold">
              — مدير، منظمة الرعاية الصحية
            </p>
          </div>
          <div className="bg-[#f8f4ed] rounded-lg p-6 shadow-sm space-y-3">
            <p className="text-base text-slate-700 italic leading-relaxed">
              &ldquo;النهج الشخصي والأدوات العملية أحدثت كل الفرق. رأيت تحسينات فورية في أداء فريقي ومعنوياته.&rdquo;
            </p>
            <p className="text-sm text-slate-600 font-semibold">
              — قائد فريق، الخدمات المالية
            </p>
          </div>
          <div className="bg-[#f8f4ed] rounded-lg p-6 shadow-sm space-y-3">
            <p className="text-base text-slate-700 italic leading-relaxed">
              &ldquo;رؤى الكوتش متعب بن ناصر في الموازنة بين التوقعات الثقافية وممارسات القيادة الحديثة كانت بالضبط ما احتجته.&rdquo;
            </p>
            <p className="text-sm text-slate-600 font-semibold">
              — تنفيذي، القطاع العام
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 rounded-xl border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-yellow-50 p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          هل أنت مستعد لبدء رحلتك القيادية؟
        </h2>
        <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto">
          احجز مكالمة استشارية مجانية لمناقشة أهدافك واكتشاف كيف يمكن للتدريب أن يساعدك على تحقيقها.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="https://calendly.com/coach_moteib"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
          >
            احجز استشارتك المجانية
          </Link>
          <Link
            href="/ar/programs"
            className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold border-2 border-slate-900 text-slate-900 hover:bg-[#f8f4ed] focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors"
          >
            عرض برامج التدريب
          </Link>
        </div>
      </section>
    </main>
  )
}

