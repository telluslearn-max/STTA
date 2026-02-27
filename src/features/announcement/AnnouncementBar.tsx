'use client'

import { useState, useEffect } from 'react'

interface AnnouncementBarProps {
  message?: string
  link?: string
  linkLabel?: string
  variant?: 'orange' | 'chalk' | 'gradient'
}

export function AnnouncementBar({
  message = 'New batch registrations now open! Limited spots available.',
  link = '/apply',
  linkLabel = 'Apply Now',
  variant = 'gradient',
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('announcement_dismissed')
    if (dismissed) {
      setIsDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('announcement_dismissed', 'true')
    setTimeout(() => setIsDismissed(true), 300)
  }

  if (isDismissed) return null

  const bgStyles = {
    orange: { background: 'var(--orange)', color: 'var(--ink)' },
    chalk: { background: 'var(--chalk)', color: 'var(--ink)' },
    gradient: { 
      background: 'linear-gradient(90deg, var(--orange) 0%, #ff6b35 50%, var(--orange) 100%)',
      color: 'var(--ink)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 3s ease-in-out infinite',
    },
  }

  return (
    <>
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            fontSize: '13px',
            fontFamily: 'var(--f-ui)',
            fontWeight: 500,
            ...bgStyles[variant],
            transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.3s ease',
          }}
        >
          <span>{message}</span>
          {link && (
            <a
              href={link}
              style={{
                padding: '4px 14px',
                background: 'rgba(0,0,0,0.15)',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 600,
                color: 'inherit',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {linkLabel}
            </a>
          )}
          <button
            onClick={handleDismiss}
            style={{
              position: 'absolute',
              right: '16px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: 'inherit',
              opacity: 0.7,
            }}
            aria-label="Dismiss"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  )
}
