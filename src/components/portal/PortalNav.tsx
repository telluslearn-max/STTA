'use client'

import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface User {
  email: string
  name: string
}

const navItems = [
  { href: '/portal', label: 'Dashboard', icon: 'home' },
  { href: '/portal/progress', label: 'Progress', icon: 'chart' },
  { href: '/portal/schedule', label: 'Schedule', icon: 'calendar' },
  { href: '/portal/announcements', label: 'Announcements', icon: 'bell' },
]

const icons: Record<string, ReactNode> = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  chart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  calendar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  bell: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
}

export function PortalNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem('portal_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('portal_user')
    router.push('/login')
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '64px',
      background: 'rgba(10, 10, 10, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(238, 236, 229, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Link href="/portal" style={{
          fontFamily: 'var(--f-disp)',
          fontSize: '18px',
          color: 'var(--chalk)',
          textDecoration: 'none',
          letterSpacing: '.05em',
        }}>
          STTA <span style={{ color: 'var(--orange)' }}>Portal</span>
        </Link>

        <div style={{ display: 'flex', gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontFamily: 'var(--f-ui)',
                  color: isActive ? 'var(--chalk)' : 'rgba(238, 236, 229, 0.5)',
                  background: isActive ? 'rgba(238, 236, 229, 0.1)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                {icons[item.icon]}
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user && (
          <span style={{
            fontSize: '13px',
            color: 'rgba(238, 236, 229, 0.5)',
          }}>
            {user.name}
          </span>
        )}
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid rgba(238, 236, 229, 0.2)',
            borderRadius: '6px',
            color: 'var(--chalk)',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
