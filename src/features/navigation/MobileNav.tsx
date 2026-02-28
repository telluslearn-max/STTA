'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDevice } from '@/core/hooks/useDevice'

interface NavItem {
  id: string
  icon: React.ReactNode
  label: string
  href?: string
  action?: () => void
}

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const ListIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
)

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

interface MobileNavProps {
  onMenuOpen?: () => void
}

export function MobileNav({ onMenuOpen }: MobileNavProps) {
  const { isPhone, isHydrated } = useDevice()
  const [isVisible, setIsVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check auth status
    const user = localStorage.getItem('portal_user')
    if (user) {
      const userData = JSON.parse(user)
      setIsLoggedIn(userData.isLoggedIn)
    }
  }, [])

  const navItems: NavItem[] = [
    { id: 'home', icon: <HomeIcon />, label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { id: 'programs', icon: <ListIcon />, label: 'Programs', href: '#programs' },
    { id: 'schedule', icon: <ListIcon />, label: 'Schedule', href: '#schedule' },
    { id: 'stories', icon: <BookIcon />, label: 'Stories', href: '#blog' },
    { id: 'join', icon: <RocketIcon />, label: 'Join', href: '#join' },
    { id: 'menu', icon: <MenuIcon />, label: 'Menu', action: () => setMenuOpen(true) },
  ]

  useEffect(() => {
    if (!isHydrated || !isPhone) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)

      const sections = ['hero', 'programs', 'blog', 'join']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section === 'hero' ? 'home' : section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isPhone, isHydrated, lastScrollY])

  const handleNavClick = (item: NavItem) => {
    if (item.action) {
      item.action()
    } else if (item.href) {
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  if (!isHydrated || !isPhone) return null

  return (
    <>
      <nav
        className="m-bottom-action-bar"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              className={`m-action-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              <span className="m-action-icon">{item.icon}</span>
              <span className="m-action-label">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '80px 32px 120px',
            overflow: 'auto',
          }}
          onClick={(e) => e.target === e.currentTarget && setMenuOpen(false)}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '28px',
              right: '20px',
              background: 'transparent',
              border: 'none',
              color: 'var(--chalk)',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <CloseIcon />
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { label: 'Programs', href: '#programs' },
                { label: 'Schedule', href: '#schedule' },
                { label: 'About', href: '#about' },
                { label: 'Stories', href: '#blog' },
                { label: 'Join', href: '#join' },
                ...(!isLoggedIn ? [{ label: 'Login', href: '/login' }] : [{ label: 'My Portal', href: '/portal' }]),
                { label: 'Contact', href: 'mailto:apex@stteresas.edu' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--f-disp)',
                    fontSize: 'clamp(32px, 8vw, 56px)',
                    color: 'var(--chalk)',
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
