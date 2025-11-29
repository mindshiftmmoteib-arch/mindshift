"use client"

import { usePathname } from 'next/navigation';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <footer
      className="mt-auto w-full text-white py-8 px-4 border-t backdrop-blur-md shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #1A5345 0%, #15483b 100%)',
        borderColor: 'rgba(185, 155, 86, 0.3)',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Newsletter Section */}
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-3">
            <p className="text-xs text-white/70 mb-2">
              {isArabic
                ? 'اشترك لتلقي رؤى القيادة والتحديثات'
                : 'Subscribe for leadership insights and updates'}
            </p>
          </div>
          <NewsletterSignup isArabic={isArabic} compact={true} />
        </div>

        {/* Divider */}
        <div className="border-t border-white/20"></div>

        {/* Copyright */}
        <div className="text-center space-y-1">
          <p className="text-xs font-medium">© {new Date().getFullYear()} MINDSHIFT ARABIA. All rights reserved.</p>
          <p className="text-xs text-white/70 italic">
            {isArabic ? 'مساعدة المديرين على بناء حياة متوازنة' : 'Helping managers build balanced lives'}
          </p>
        </div>
      </div>
    </footer>
  );
}
