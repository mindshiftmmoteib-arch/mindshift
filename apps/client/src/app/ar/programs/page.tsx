"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Tajawal } from "next/font/google"

const tajawal = Tajawal({
  weight: ['400', '500', '700'],
  subsets: ["arabic"],
  display: 'swap',
})

export default function ProgramsPageArabic() {
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
          برامج الكوتشينغ القيادي
        </h1>
        <p className={`mx-auto max-w-3xl text-base sm:text-lg text-slate-700 px-2 transition-all duration-1000 delay-300 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          اختر البرنامج الذي يناسب رحلتك القيادية. جميع البرامج مخصصة لأهدافك وتحدياتك الفريدة.
        </p>
      </section>

      {/* Programs Comparison */}
      <section className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* 6-Month Program */}
          <div className="rounded-xl border-2 border-slate-200 bg-[#f8f4ed] shadow-sm p-6 space-y-6 hover:border-amber-500 transition-colors">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">برنامج 6 أشهر</h2>
              <p className="text-base text-slate-600 font-semibold">بناء الأساسيات</p>
              <p className="text-sm text-slate-700">
                مثالي للمديرين الجدد أو أولئك الذين يتطلعون إلى تعزيز أساسيات قيادتهم.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">ما الذي ستتعلمه</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>أساسيات القيادة الجوهرية:</strong> المهارات الأساسية التي يحتاجها كل قائد</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>تطوير الوعي الذاتي:</strong> فهم نقاط قوتك ومجالات نموك</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>إتقان مهارات التواصل:</strong> تقنيات تواصل واضحة وفعالة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>استراتيجيات التوازن بين العمل والحياة:</strong> مناهج مستدامة لإدارة الحياة المهنية والشخصية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>إدارة الوقت:</strong> أنظمة تحديد الأولويات والإنتاجية</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">هيكل البرنامج</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• جلسات كوتشينغ فردية عبر الإنترنت كل أسبوعين (30 دقيقة)</li>
                <li>• 25 جلسة إجمالاً</li>
                <li>• دعم عبر البريد الإلكتروني بين الجلسات</li>
                <li>• خطط عمل شخصية</li>
                <li>• تقييمات التقدم</li>
              </ul>
            </div>

            <Link
              href="https://calendly.com/coach_moteib"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-md px-4 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
            >
              احجز استشارة مجانية
            </Link>
          </div>

          {/* 9-Month Program */}
          <div className="rounded-xl border-2 border-amber-500 bg-[#f8f4ed] shadow-lg p-6 space-y-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full">
              الأكثر شعبية
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">برنامج 9 أشهر</h2>
              <p className="text-base text-slate-600 font-semibold">التطوير المتقدم</p>
              <p className="text-sm text-slate-700">
                مثالي للمديرين المستعدين للارتقاء بقيادتهم إلى المستوى التالي وبناء فرق عالية الأداء.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">ما الذي ستتعلمه</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>كل ما في برنامج 6 أشهر</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>ديناميكيات الفريق المتقدمة:</strong> بناء وقيادة فرق عالية الأداء</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>إتقان حل النزاعات:</strong> التعامل مع المحادثات الصعبة بثقة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>اتخاذ القرارات الاستراتيجية:</strong> إطار عمل لاتخاذ قرارات أفضل وأسرع</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>الذكاء العاطفي:</strong> القيادة بالتعاطف والوعي</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>التفويض والتمكين:</strong> بناء فرق قادرة ومستقلة</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">هيكل البرنامج</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• جلسات كوتشينغ فردية أسبوعية عبر الإنترنت (30 دقيقة)</li>
                <li>• 37 جلسة إجمالاً</li>
                <li>• دعم غير محدود عبر البريد الإلكتروني والرسائل</li>
                <li>• تقييمات قيادية مخصصة</li>
                <li>• مراجعات التقدم الفصلية</li>
              </ul>
            </div>

            <Link
              href="https://calendly.com/coach_moteib"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-md px-4 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
            >
              احجز استشارة مجانية
            </Link>
          </div>

          {/* 12-Month Program */}
          <div className="rounded-xl border-2 border-slate-200 bg-[#f8f4ed] shadow-sm p-6 space-y-6 hover:border-amber-500 transition-colors">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">برنامج 12 شهر</h2>
              <p className="text-base text-slate-600 font-semibold">التحول الكامل</p>
              <p className="text-sm text-slate-700">
                للقادة الملتزمين بالتحول الشامل وبناء إرث قيادي دائم.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">ما الذي ستتعلمه</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>كل ما في برنامج 9 أشهر</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>إتقان القيادة الاستراتيجية:</strong> الرؤية والتخطيط طويل الأمد</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>إدارة التغيير التنظيمي:</strong> قيادة مبادرات التحول</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>تطوير الحضور التنفيذي:</strong> إبراز الاحترام وإلهام الثقة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>بناء الثقافة:</strong> إنشاء منظمات مزدهرة قائمة على القيم</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 text-lg">✓</span>
                  <span><strong>قيادة الإرث:</strong> بناء تأثير مستدام يتجاوز فترة خدمتك</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-200">
              <h3 className="text-base font-semibold text-slate-900">هيكل البرنامج</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• جلسات كوتشينغ فردية أسبوعية عبر الإنترنت (30 دقيقة)</li>
                <li>• 50 جلسة إجمالاً</li>
                <li>• دعم ذو أولوية على مدار الساعة</li>
                <li>• تقييمات ملاحظات 360 درجة</li>
                <li>• جلسات تخطيط استراتيجي فصلية</li>
                <li>• جلسات خبراء ضيوف حول مواضيع محددة</li>
              </ul>
            </div>

            <Link
              href="https://calendly.com/coach_moteib"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center rounded-md px-4 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
            >
              احجز استشارة مجانية
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-sm p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">مقارنة البرامج</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="text-right py-3 px-2 font-semibold text-slate-900">الميزة</th>
              <th className="text-center py-3 px-2 font-semibold text-slate-900">6 أشهر</th>
              <th className="text-center py-3 px-2 font-semibold text-slate-900 bg-amber-50">9 أشهر</th>
              <th className="text-center py-3 px-2 font-semibold text-slate-900">12 شهر</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-b border-slate-200">
              <td className="py-3 px-2">جلسات الكوتشينغ الفردية</td>
              <td className="text-center py-3 px-2">25 جلسة عبر الإنترنت (30 دقيقة)</td>
              <td className="text-center py-3 px-2 bg-amber-50">37 جلسة عبر الإنترنت (30 دقيقة)</td>
              <td className="text-center py-3 px-2">50 جلسة عبر الإنترنت (30 دقيقة)</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-3 px-2">تكرار الجلسات</td>
              <td className="text-center py-3 px-2">كل أسبوعين</td>
              <td className="text-center py-3 px-2 bg-amber-50">أسبوعي</td>
              <td className="text-center py-3 px-2">أسبوعي</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-3 px-2">دعم البريد الإلكتروني</td>
              <td className="text-center py-3 px-2">✓</td>
              <td className="text-center py-3 px-2 bg-amber-50">✓</td>
              <td className="text-center py-3 px-2">✓</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-3 px-2">دعم غير محدود عبر الرسائل</td>
              <td className="text-center py-3 px-2">—</td>
              <td className="text-center py-3 px-2 bg-amber-50">✓</td>
              <td className="text-center py-3 px-2">✓</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-3 px-2">تقييمات القيادة</td>
              <td className="text-center py-3 px-2">أساسي</td>
              <td className="text-center py-3 px-2 bg-amber-50">متقدم</td>
              <td className="text-center py-3 px-2">360 درجة</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-3 px-2">دعم ذو أولوية</td>
              <td className="text-center py-3 px-2">—</td>
              <td className="text-center py-3 px-2 bg-amber-50">—</td>
              <td className="text-center py-3 px-2">✓</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="py-3 px-2">جلسات خبراء ضيوف</td>
              <td className="text-center py-3 px-2">—</td>
              <td className="text-center py-3 px-2 bg-amber-50">—</td>
              <td className="text-center py-3 px-2">✓</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Core Leadership Fundamentals Section */}
      <section className="rounded-xl border border-slate-200 bg-[#f8f4ed] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">أساسيات القيادة الجوهرية</h2>
          <p className="text-base text-slate-700 max-w-3xl mx-auto">
            نهجنا الكوتشي مبني على مبادئ أساسية تساعد الكوتشيز على التطور ليصبحوا قادة فعالين ومتوازنين. هذه الأساسيات الجوهرية مدمجة في جميع برامجنا.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Self-Awareness */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-3">
            <h3 className="text-xl font-semibold text-slate-900">تعزيز الوعي الذاتي</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              مساعدة الكوتشيز على تطوير وعي ذاتي أعمق من خلال فهم نقاط قوتهم وضعفهم وأسلوب قيادتهم وتأثيرهم على الآخرين. من خلال التقييمات وتمارين التأمل والملاحظات، يتعلم الكوتشيز التعرف على أنماطهم ومحفزاتهم ونقاط العمى لديهم.
            </p>
            <ul className="text-sm text-slate-600 space-y-1.5 mt-3">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>تحديد نقاط القوة القيادية الشخصية ومجالات النمو</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>فهم المحفزات العاطفية والاستجابات</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>إدراك التأثير على ديناميكيات الفريق والأداء</span>
              </li>
            </ul>
          </div>

          {/* Work-Life Balance */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-3">
            <h3 className="text-xl font-semibold text-slate-900">التوازن بين العمل والحياة</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              مساعدة الكوتشيز على تحقيق توازن مستدام بين العمل والحياة من خلال وضع الحدود والأولويات بفعالية وإنشاء أنظمة تدعم التميز المهني والرفاهية الشخصية. تعلم القيادة دون التضحية بصحتك أو علاقاتك أو سعادتك.
            </p>
            <ul className="text-sm text-slate-600 space-y-1.5 mt-3">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>وضع حدود صحية والحفاظ عليها</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>تطوير عادات عمل مستدامة وروتينات</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>دمج الأولويات الشخصية مع الأهداف المهنية</span>
              </li>
            </ul>
          </div>

          {/* Goal Identification */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-3">
            <h3 className="text-xl font-semibold text-slate-900">تحديد الأهداف</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              مساعدة الكوتشيز على تحديد ووضوح أهدافهم من خلال تمارين منظمة وتأمل عميق. التمييز بين ما تعتقد أنك تريده وما يهمك حقًا، وإنشاء أهداف واضحة وذات معنى تتماشى مع قيمك ورؤيتك.
            </p>
            <ul className="text-sm text-slate-600 space-y-1.5 mt-3">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>توضيح الطموحات الشخصية والمهنية</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>محاذاة الأهداف مع القيم الأساسية والغرض</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>وضع أهداف ذكية تلهم العمل</span>
              </li>
            </ul>
          </div>

          {/* Overcoming Leadership Dilemmas */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-3">
            <h3 className="text-xl font-semibold text-slate-900">التغلب على معضلات القيادة</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              مساعدة الكوتشيز على التنقل في معضلات القيادة المعقدة والمواقف الصعبة بثقة. تطوير أطر لاتخاذ القرارات وحل النزاعات وإدارة الأولويات المتعارضة. تعلم اتخاذ قرارات صعبة مع الحفاظ على العلاقات والنزاهة.
            </p>
            <ul className="text-sm text-slate-600 space-y-1.5 mt-3">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>التنقل في القرارات الصعبة والمقايضات</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>حل النزاعات وإدارة توترات الفريق</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>التعامل مع توقعات أصحاب المصلحة المتعارضة</span>
              </li>
            </ul>
          </div>

          {/* Actionable Planning */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-3 md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-semibold text-slate-900">التخطيط القابل للتنفيذ</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              مساعدة الكوتشيز على وضع خطط قابلة للتنفيذ لتحقيق أهدافهم. تحويل الطموحات إلى خطوات ملموسة مع الجداول الزمنية والمعالم وقياسات المساءلة. تعلم تقسيم الأهداف الكبيرة إلى إجراءات قابلة للإدارة وتتبع التقدم بفعالية.
            </p>
            <ul className="text-sm text-slate-600 space-y-1.5 mt-3">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>إنشاء خطط عمل خطوة بخطوة مع معالم واضحة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>إنشاء أنظمة مساءلة وفحوصات</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>تكييف الخطط بناءً على التقدم والظروف المتغيرة</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-5 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-sm text-slate-800 leading-relaxed">
            <strong className="text-slate-900">كيف يعمل:</strong> هذه الأساسيات الجوهرية منسوجة في جميع جلسات الكوتشينغ. سيعمل الكوتش معك لتقييم موقعك في كل مجال، وتحديد التحديات المحددة، وتطوير استراتيجيات شخصية لتعزيز أساس قيادتك. كل جلسة تبني على السابقة، مما يخلق رحلة تطوير شاملة.
          </p>
        </div>
      </section>

      {/* Investment Section */}
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">هل أنت مستعد للاستثمار في قيادتك؟</h2>
        <p className="text-base text-slate-700 max-w-2xl mx-auto">
          يتضمن كل برنامج كوتشينغ شخصيًا واستراتيجيات قابلة للتنفيذ ودعمًا مستمرًا. احجز استشارة مجانية لمناقشة البرنامج المناسب لك.
        </p>
        <Link
          href="https://calendly.com/coach_moteib"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        >
          جدولة استشارة مجانية
        </Link>
      </section>
    </main>
  )
}

