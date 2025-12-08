'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { 
  Moon, 
  Sun, 
  Home, 
  Briefcase, 
  User, 
  Wrench, 
  Mail 
} from 'lucide-react'
import { trackEvent, AnalyticsEvents } from '@/lib/analytics'
import { FloatingDock } from '@/components/ui/floating-dock'

const navItems = [
  { href: '#hero', title: 'Home', icon: <Home className="h-full w-full text-fg/70" /> },
  { href: '#work', title: 'Work', icon: <Briefcase className="h-full w-full text-fg/70" /> },
  { href: '#about', title: 'About', icon: <User className="h-full w-full text-fg/70" /> },
  { href: '#skills', title: 'Skills', icon: <Wrench className="h-full w-full text-fg/70" /> },
  { href: '#contact', title: 'Contact', icon: <Mail className="h-full w-full text-fg/70" /> },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    // Use IntersectionObserver instead of scroll event listener (better INP)
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel exits viewport (not intersecting), header should blur
        setIsScrolled(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    )

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Sentinel element at the top of page */}
      <div ref={sentinelRef} className="absolute top-0 h-px w-full" />

      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'border-b border-border bg-bg/80 backdrop-blur-md'
            : 'bg-transparent'
        }`}
        style={{
          paddingInline: 'max(1rem, env(safe-area-inset-left))',
        }}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo/Name */}
          <a
            href="#hero"
            className="text-lg font-semibold italic text-fg transition-colors hover:text-primary"
          >
            BENTOPORTFOLIO
          </a>

          {/* Floating Dock Navigation */}
          <FloatingDock 
            items={navItems}
            desktopClassName="bg-transparent"
            mobileClassName="fixed bottom-6 right-6"
          />

          {/* Theme Toggle */}
          <button
            onClick={() => {
              const newTheme = theme === 'dark' ? 'light' : 'dark'
              setTheme(newTheme)
              trackEvent(AnalyticsEvents.THEME_TOGGLE, { theme: newTheme })
            }}
            className="relative flex aspect-square items-center justify-center rounded-lg transition-colors hover:bg-muted text-fg/70"
            style={{ width: 50, height: 50 }}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        </nav>
      </header>
    </>
  )
}

