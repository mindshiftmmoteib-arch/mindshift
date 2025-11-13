"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, type CSSProperties } from 'react'
import { usePathname } from 'next/navigation'

const HEADER_BG = '#1A5345'
const HEADER_TEXT = '#FFFFFF'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div
      className="w-full rounded-none md:rounded-lg border-b md:border backdrop-blur"
      style={{
        backgroundColor: HEADER_BG,
        borderColor: HEADER_TEXT,
        color: HEADER_TEXT,
      } as CSSProperties}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        {/* Hamburger Menu Button (Mobile Only) */}
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1 p-2 rounded hover:bg-[#15483b]/60 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="w-5 h-0.5 bg-white transition-transform" />
          <span className="w-5 h-0.5 bg-white transition-transform" />
          <span className="w-5 h-0.5 bg-white transition-transform" />
        </button>

        {/* Left: Logo */}
        <Link
          href="/"
          className="shrink-0 flex items-center gap-2 text-base md:text-lg font-semibold select-none text-[inherit] hover:text-white/80 transition-colors"
          aria-label="MINDSHIFT ARABIA Home"
        >
          <span className="relative h-8 w-8 md:h-10 md:w-10">
            <Image
              src="/logo.png"
              alt="MINDSHIFT ARABIA logo"
              fill
              sizes="(max-width: 768px) 32px, 40px"
              className="object-contain"
              priority
            />
          </span>
          <span className="hidden sm:inline">MINDSHIFT ARABIA</span>
        </Link>

        {/* Center: Nav (Desktop) */}
        <div className="hidden md:flex items-center gap-2 ml-2">
          <Link href={pathname?.startsWith('/ar') ? '/ar' : '/'} className="px-2 py-1 text-sm rounded text-[inherit] hover:bg-[#15483b]/70 transition-colors">
            {pathname?.startsWith('/ar') ? 'الرئيسية' : 'Home'}
          </Link>
          <Link href={pathname?.startsWith('/ar') ? '/ar/coach' : '/coach'} className="px-2 py-1 text-sm rounded text-[inherit] hover:bg-[#15483b]/70 transition-colors">
            {pathname?.startsWith('/ar') ? 'عن المدرب' : 'About Coach'}
          </Link>
          <Link href={pathname?.startsWith('/ar') ? '/ar/programs' : '/programs'} className="px-2 py-1 text-sm rounded text-[inherit] hover:bg-[#15483b]/70 transition-colors">
            {pathname?.startsWith('/ar') ? 'البرامج' : 'Programs'}
          </Link>
          <Link href={pathname?.startsWith('/ar') ? '/ar/contact' : '/contact'} className="px-2 py-1 text-sm rounded text-[inherit] hover:bg-[#15483b]/70 transition-colors">
            {pathname?.startsWith('/ar') ? 'تواصل معنا' : 'Contact'}
          </Link>
        </div>
        <div className="ml-2 flex-1 hidden md:flex"></div>

        {/* Right: Actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Language Switcher */}
          <Link
            href={pathname?.startsWith('/ar') ? pathname.replace('/ar', '') || '/' : `/ar${pathname === '/' ? '' : pathname}`}
            className="inline-flex items-center gap-1 rounded-md px-2 md:px-3 py-1.5 text-xs md:text-sm font-medium border border-white/40 text-[inherit] hover:bg-[#15483b]/60 focus:outline-none focus:ring-2 focus:ring-white/60 transition-colors"
            aria-label="Switch language"
            title={pathname?.startsWith('/ar') ? 'Switch to English' : 'Switch to Arabic'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
            <span className="hidden md:inline">{pathname?.startsWith('/ar') ? 'EN' : 'ع'}</span>
          </Link>
          
          <Link
            href="https://calendly.com/coach_moteib"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 md:gap-2 rounded-md px-2 md:px-3 py-1.5 text-xs md:text-sm font-medium text-[#1A5345] bg-[#B99B56] shadow hover:bg-[#c5a566] focus:outline-none focus:ring-2 focus:ring-[#B99B56]/40 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
            </svg>
            <span className="hidden sm:inline">{pathname?.startsWith('/ar') ? 'احجز استشارة' : 'Book Consultation'}</span>
            <span className="sm:hidden">{pathname?.startsWith('/ar') ? 'احجز' : 'Book'}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/30 bg-[#15483b]/50 backdrop-blur">
          <nav className="flex flex-col px-3 py-2 space-y-1" role="navigation" aria-label="Mobile navigation">
            <Link 
              href={pathname?.startsWith('/ar') ? '/ar' : '/'} 
              className="px-3 py-2 text-sm rounded text-[inherit] hover:bg-[#15483b]/70 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {pathname?.startsWith('/ar') ? 'الرئيسية' : 'Home'}
            </Link>
            <Link 
              href={pathname?.startsWith('/ar') ? '/ar/coach' : '/coach'} 
              className="px-3 py-2 text-sm rounded text-[inherit] hover:bg-[#15483b]/70 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {pathname?.startsWith('/ar') ? 'عن المدرب' : 'About Coach'}
            </Link>
            <Link 
              href={pathname?.startsWith('/ar') ? '/ar/programs' : '/programs'} 
              className="px-3 py-2 text-sm rounded text-[inherit] hover:bg-[#15483b]/70 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {pathname?.startsWith('/ar') ? 'البرامج' : 'Programs'}
            </Link>
            <Link 
              href={pathname?.startsWith('/ar') ? '/ar/contact' : '/contact'} 
              className="px-3 py-2 text-sm rounded text-[inherit] hover:bg-[#15483b]/70 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {pathname?.startsWith('/ar') ? 'تواصل معنا' : 'Contact'}
            </Link>

            {/* Language Switcher in Mobile */}
            <div className="border-t border-white/30 pt-2 mt-2">
              <Link
                href={pathname?.startsWith('/ar') ? pathname.replace('/ar', '') || '/' : `/ar${pathname === '/' ? '' : pathname}`}
                className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm rounded border border-white/40 text-[inherit] hover:bg-[#15483b]/60 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Switch language"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                </svg>
                {pathname?.startsWith('/ar') ? 'Switch to English' : 'التبديل إلى العربية'}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
