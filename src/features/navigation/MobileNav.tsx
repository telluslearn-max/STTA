'use client'

import { useState, useEffect } from 'react'
import { useDevice } from '@/core/hooks/useDevice'

interface NavItem {
  id: string
  icon: React.ReactNode
  label: string
  href?: string
}

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const TargetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const CalendarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const LightningIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

export function MobileNav() {
  const { isPhone, isHydrated } = useDevice()
  const [isVisible, setIsVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [lastScrollY, setLastScrollY] = useState(0)

  const navItems: NavItem[] = [
    { id: 'home', icon: <HomeIcon />, label: 'Home', href: '#hero' },
    { id: 'programs', icon: <TargetIcon />, label: 'Programs', href: '#programs' },
    { id: 'schedule', icon: <CalendarIcon />, label: 'Schedule', href: '#schedule' },
    { id: 'join', icon: <LightningIcon />, label: 'Join', href: '#join' },
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

      const sections = ['hero', 'programs', 'schedule', 'join']
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
    if (item.href) {
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Debug: Allow render without hydration check for testing
  // if (!isHydrated || !isPhone) return null
  if (!isHydrated || !isPhone) return null

  return (
    <nav
      className="m-bottom-action-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: 'rgba(17, 17, 17, 0.95)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px 20px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 12px',
        zIndex: 9999,
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
  )
}
