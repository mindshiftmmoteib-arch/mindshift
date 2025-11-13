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

  const isActive = (path: string) => {
    if (path === '/' || path === '/ar') {
      return pathname === path
    }
    return pathname?.startsWith(path)
  }

  return (
    <header
      className="w-full rounded-none md:rounded-xl border-b md:border backdrop-blur-md shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${HEADER_BG} 0%, #15483b 100%)`,
        borderColor: 'rgba(185, 155, 86, 0.3)',
        color: HEADER_TEXT,
      } as CSSProperties}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Hamburger Menu Button (Mobile Only) */}
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`w-5 h-0.5 bg-white rounded-full transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-white rounded-full transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-white rounded-full transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Left: Logo with enhanced design */}
        <Link
          href="/"
          className="shrink-0 flex items-center gap-3 text-base md:text-lg font-bold select-none text-[inherit] hover:text-white/90 transition-all group"
          aria-label="MINDSHIFT ARABIA Home"
        >
          <span className="relative h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 p-1.5 group-hover:bg-white/20 transition-all group-hover:scale-105 overflow-hidden">
            <Image
              src="/logo.png"
              alt="MINDSHIFT ARABIA logo"
              fill
              sizes="(max-width: 768px) 40px, 48px"
              className="object-contain drop-shadow-lg rounded-full"
              priority
            />
          </span>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-white font-extrabold tracking-wide text-sm md:text-base">MINDSHIFT</span>
            <span className="text-[#B99B56] font-semibold text-xs md:text-sm" style={{letterSpacing: '0.1em'}}>ARABIA</span>
          </div>
        </Link>

        {/* Center: Nav (Desktop) with active states */}
        <nav className="hidden md:flex items-center gap-1 ml-4" role="navigation">
          <Link 
            href={pathname?.startsWith('/ar') ? '/ar' : '/'} 
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              isActive(pathname?.startsWith('/ar') ? '/ar' : '/') 
                ? 'bg-white/20 text-white shadow-inner' 
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            }`}
          >
            {pathname?.startsWith('/ar') ? 'الرئيسية' : 'Home'}
          </Link>
          <Link 
            href={pathname?.startsWith('/ar') ? '/ar/coach' : '/coach'} 
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              isActive(pathname?.startsWith('/ar') ? '/ar/coach' : '/coach')
                ? 'bg-white/20 text-white shadow-inner' 
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            }`}
          >
            {pathname?.startsWith('/ar') ? 'عن المدرب' : 'About Coach'}
          </Link>
          <Link 
            href={pathname?.startsWith('/ar') ? '/ar/programs' : '/programs'} 
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              isActive(pathname?.startsWith('/ar') ? '/ar/programs' : '/programs')
                ? 'bg-white/20 text-white shadow-inner' 
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            }`}
          >
            {pathname?.startsWith('/ar') ? 'البرامج' : 'Programs'}
          </Link>
          <Link 
            href={pathname?.startsWith('/ar') ? '/ar/contact' : '/contact'} 
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              isActive(pathname?.startsWith('/ar') ? '/ar/contact' : '/contact')
                ? 'bg-white/20 text-white shadow-inner' 
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            }`}
          >
            {pathname?.startsWith('/ar') ? 'تواصل معنا' : 'Contact'}
          </Link>
        </nav>
        <div className="ml-auto flex-1 hidden md:flex"></div>

        {/* Right: Actions with enhanced design */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Language Switcher with modern design */}
          <Link
            href={pathname?.startsWith('/ar') ? pathname.replace('/ar', '') || '/' : `/ar${pathname === '/' ? '' : pathname}`}
            className="inline-flex items-center gap-2 rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm font-medium border-2 border-white/30 text-white hover:bg-white/15 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-[#B99B56] transition-all backdrop-blur-sm shadow-sm hover:shadow-md"
            aria-label="Switch language"
            title={pathname?.startsWith('/ar') ? 'Switch to English' : 'Switch to Arabic'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="drop-shadow">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
            <span className="hidden md:inline font-semibold">{pathname?.startsWith('/ar') ? 'EN' : 'عربي'}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown with enhanced design */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/20 bg-gradient-to-b from-[#15483b]/95 to-[#1A5345]/95 backdrop-blur-md shadow-inner">
          <nav className="flex flex-col px-4 py-3 space-y-1" role="navigation" aria-label="Mobile navigation">
            <Link 
              href={pathname?.startsWith('/ar') ? '/ar' : '/'} 
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                isActive(pathname?.startsWith('/ar') ? '/ar' : '/') 
                  ? 'bg-white/20 text-white shadow-inner' 
                  : 'text-white/90 hover:bg-white/10 active:bg-white/15'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {pathname?.startsWith('/ar') ? 'الرئيسية' : 'Home'}
            </Link>
            <Link 
              href={pathname?.startsWith('/ar') ? '/ar/coach' : '/coach'} 
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                isActive(pathname?.startsWith('/ar') ? '/ar/coach' : '/coach')
                  ? 'bg-white/20 text-white shadow-inner' 
                  : 'text-white/90 hover:bg-white/10 active:bg-white/15'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {pathname?.startsWith('/ar') ? 'عن المدرب' : 'About Coach'}
            </Link>
            <Link 
              href={pathname?.startsWith('/ar') ? '/ar/programs' : '/programs'} 
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                isActive(pathname?.startsWith('/ar') ? '/ar/programs' : '/programs')
                  ? 'bg-white/20 text-white shadow-inner' 
                  : 'text-white/90 hover:bg-white/10 active:bg-white/15'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {pathname?.startsWith('/ar') ? 'البرامج' : 'Programs'}
            </Link>
            <Link 
              href={pathname?.startsWith('/ar') ? '/ar/contact' : '/contact'} 
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                isActive(pathname?.startsWith('/ar') ? '/ar/contact' : '/contact')
                  ? 'bg-white/20 text-white shadow-inner' 
                  : 'text-white/90 hover:bg-white/10 active:bg-white/15'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {pathname?.startsWith('/ar') ? 'تواصل معنا' : 'Contact'}
            </Link>

            {/* Language Switcher in Mobile with enhanced design */}
            <div className="border-t border-white/20 pt-3 mt-2">
              <Link
                href={pathname?.startsWith('/ar') ? pathname.replace('/ar', '') || '/' : `/ar${pathname === '/' ? '' : pathname}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium rounded-lg border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 active:bg-white/15 transition-all"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Switch language"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                </svg>
                <span className="font-semibold">{pathname?.startsWith('/ar') ? 'Switch to English' : 'التبديل إلى العربية'}</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
