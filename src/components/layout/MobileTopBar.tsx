'use client'

import { useState, useEffect } from 'react'
import { useDevice } from '@/core/hooks/useDevice'
import Link from 'next/link'

interface MobileTopBarProps {
  onNotificationsClick: () => void
  onSettingsClick: () => void
  unreadCount?: number
}

const BellIcon = ({ hasUnread }: { hasUnread: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    {hasUnread && (
      <circle cx="18" cy="6" r="3" fill="var(--m-accent-primary)" stroke="none" />
    )}
  </svg>
)

const SettingsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

export function MobileTopBar({ onNotificationsClick, onSettingsClick, unreadCount = 0 }: MobileTopBarProps) {
  const { isPhone, isHydrated } = useDevice()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHydrated || !isPhone) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isPhone, isHydrated])

  if (!isHydrated || !isPhone) return null

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className="m-top-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        padding: '0 20px',
        paddingTop: 'max(12px, env(safe-area-inset-top))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        background: scrolled ? 'rgba(17, 17, 17, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(40px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(40px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
      }}
    >
      <button
        onClick={handleLogoClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          padding: '8px 0',
        }}
      >
        <span style={{
          fontFamily: 'var(--f-disp)',
          fontSize: '16px',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          color: 'var(--chalk)',
        }}>
          ST<span style={{ color: 'var(--m-accent-primary)' }}>.</span>TERESA'S
        </span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={onNotificationsClick}
          className="m-touch-feedback"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            border: '1px solid var(--m-glass-border)',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            color: 'var(--chalk)',
            transition: 'background 0.2s',
          }}
        >
          <BellIcon hasUnread={unreadCount > 0} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--m-accent-primary)',
            }} />
          )}
        </button>

        <button
          onClick={onSettingsClick}
          className="m-touch-feedback"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            border: '1px solid var(--m-glass-border)',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--chalk)',
            transition: 'background 0.2s',
          }}
        >
          <SettingsIcon />
        </button>
      </div>
    </header>
  )
}
