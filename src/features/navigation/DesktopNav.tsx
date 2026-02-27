'use client'

import { useState, useEffect } from 'react'
import { useDevice } from '@/core/hooks/useDevice'

const navLinks = [
  { href: '#programs', label: 'Programs' },
  { href: '#notifs', label: 'Updates' },
  { href: '#blog', label: 'Stories' },
  { href: '#join', label: 'Membership' },
]

export function DesktopNav() {
  const [scrolled, setScrolled] = useState(false)
  const { isHydrated } = useDevice()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isHydrated) return null

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '24px 48px',
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
        fontSize: '20px',
        letterSpacing: '.1em',
        color: 'var(--chalk)',
        textDecoration: 'none',
      }}>
        ST<em style={{ color: 'var(--orange)', fontStyle: 'normal' }}>.</em> TERESA'S <em style={{ color: 'var(--orange)', fontStyle: 'normal' }}>TT</em>
      </a>

      <ul style={{ display: 'flex', gap: '8px', listStyle: 'none' }}>
        {navLinks.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 22px',
                textDecoration: 'none',
                fontFamily: 'var(--f-ui)',
                fontSize: '13px',
                fontWeight: 400,
                color: 'rgba(238,236,229,.55)',
                letterSpacing: '.04em',
                transition: 'color 0.3s',
              }}
            >
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#join"
        style={{
          fontFamily: 'var(--f-ui)',
          fontSize: '13px',
          fontWeight: 700,
          color: 'var(--ink)',
          background: 'var(--chalk)',
          border: 'none',
          padding: '11px 26px',
          borderRadius: '99px',
          cursor: 'pointer',
          letterSpacing: '.04em',
          position: 'relative',
          overflow: 'hidden',
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        <span style={{ position: 'relative', zIndex: 1 }}>Play Now</span>
      </a>
    </nav>
  )
}
