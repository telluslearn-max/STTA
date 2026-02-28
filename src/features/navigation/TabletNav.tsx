'use client'

import { useState, useEffect } from 'react'
import { useDevice } from '@/core/hooks/useDevice'

const navLinks = [
  { href: '#programs', label: 'Programs' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#notifs', label: 'Updates' },
  { href: '#blog', label: 'Stories' },
  { href: '#join', label: 'Membership' },
]

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

export function TabletNav() {
  const { isTablet, isHydrated } = useDevice()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    const user = localStorage.getItem('portal_user')
    if (user) {
      const userData = JSON.parse(user)
      setIsLoggedIn(userData.isLoggedIn)
    }
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isHydrated || !isTablet) return null

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
          background: scrolled ? 'rgba(10,10,10,.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--edge)' : 'none',
          transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
        }}
      >
        <a href="#" style={{
          fontFamily: 'var(--f-disp)',
          fontSize: '18px',
          letterSpacing: '.1em',
          color: 'var(--chalk)',
          textDecoration: 'none',
        }}>
          ST<em style={{ color: 'var(--orange)', fontStyle: 'normal' }}>.</em> TERESA'S <em style={{ color: 'var(--orange)', fontStyle: 'normal' }}>TT</em>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ul style={{ display: 'flex', gap: '4px', listStyle: 'none', alignItems: 'center' }}>
            {navLinks.slice(0, 3).map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '8px 14px',
                    textDecoration: 'none',
                    fontFamily: 'var(--f-ui)',
                    fontSize: '12px',
                    fontWeight: 400,
                    color: 'rgba(238,236,229,.55)',
                    letterSpacing: '.04em',
                    transition: 'color 0.3s',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setMenuOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'rgba(238,236,229,0.1)',
              border: 'none',
              borderRadius: '10px',
              color: 'var(--chalk)',
              cursor: 'pointer',
            }}
          >
            <MenuIcon />
          </button>
        </div>
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
            padding: '80px 32px 40px',
            overflow: 'auto',
          }}
          onClick={(e) => e.target === e.currentTarget && setMenuOpen(false)}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '24px',
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                    fontSize: '28px',
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

            <div style={{
              fontFamily: 'var(--f-disp)',
              fontSize: '60px',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(238, 236, 229, 0.05)',
              letterSpacing: '0.05em',
              position: 'absolute',
              bottom: '10%',
              right: '-20px',
              pointerEvents: 'none',
            }}>
              APEX
            </div>
          </div>
        </div>
      )}
    </>
  )
}
