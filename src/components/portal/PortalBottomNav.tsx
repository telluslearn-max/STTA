'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

interface NavItem {
  id: string
  icon: React.ReactNode
  label: string
  href: string
}

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const TrendingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
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

const MoreIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
)

interface PortalBottomNavProps {
  onMoreClick: () => void
}

export function PortalBottomNav({ onMoreClick }: PortalBottomNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const navItems: NavItem[] = [
    { id: 'home', icon: <HomeIcon />, label: 'Home', href: '/portal' },
    { id: 'progress', icon: <TrendingIcon />, label: 'Progress', href: '/portal/progress' },
    { id: 'schedule', icon: <CalendarIcon />, label: 'Schedule', href: '/portal/schedule' },
    { id: 'more', icon: <MoreIcon />, label: 'More', href: '#' },
  ]

  useEffect(() => {
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
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleNavClick = (item: NavItem) => {
    if (item.id === 'more') {
      onMoreClick()
    }
  }

  return (
    <nav
      className="m-bottom-action-bar"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const content = (
          <button
            key={item.id}
            className={`m-action-item ${isActive && item.id !== 'more' ? 'active' : ''}`}
            onClick={() => handleNavClick(item)}
            style={{ textDecoration: 'none' }}
          >
            <span className="m-action-icon">{item.icon}</span>
            <span className="m-action-label">{item.label}</span>
          </button>
        )

        if (item.href && item.id !== 'more') {
          return (
            <Link key={item.id} href={item.href} style={{ textDecoration: 'none', flex: 1, display: 'flex', justifyContent: 'center' }}>
              {content}
            </Link>
          )
        }

        return content
      })}
    </nav>
  )
}
