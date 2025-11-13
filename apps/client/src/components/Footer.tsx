"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <footer className="mt-auto w-full bg-[#1A5345] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <p className="text-sm font-medium">© {new Date().getFullYear()} MINDSHIFT ARABIA. All rights reserved.</p>
            <p className="text-xs text-white/80 italic">
              {isArabic ? 'مساعدة المديرين على بناء حياة متوازنة' : 'Helping managers build balanced lives'}
            </p>
          </div>
          <div className="pt-2 border-t border-white/20 w-full max-w-md">
            <Link 
              href="https://www.sitedz.store" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-white/90 hover:text-white underline decoration-white/40 hover:decoration-white transition-colors"
            >
              www.sitedz.store
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
