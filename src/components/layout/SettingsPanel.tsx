'use client'

import { useState, useEffect } from 'react'
import { useDevice } from '@/hooks/useDevice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface SettingItem {
  id: string
  label: string
  icon: React.ReactNode
  action?: (value?: boolean) => void
  href?: string
  toggle?: boolean
  value?: boolean
}

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const VolumeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
)

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) => (
  <button
    onClick={() => onChange(!enabled)}
    style={{
      width: '48px',
      height: '28px',
      borderRadius: '14px',
      border: 'none',
      background: enabled ? 'var(--m-accent-primary)' : 'rgba(255, 255, 255, 0.1)',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background 0.2s',
    }}
  >
    <span style={{
      position: 'absolute',
      top: '4px',
      left: enabled ? '24px' : '4px',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: 'white',
      transition: 'left 0.2s',
    }} />
  </button>
)

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { isPhone, isHydrated } = useDevice()
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [sound, setSound] = useState(true)

  useEffect(() => {
    if (!isHydrated || !isPhone) return
  }, [isPhone, isHydrated])

  if (!isHydrated || !isPhone) return null

  const handleLogout = () => {
    localStorage.removeItem('portal_user')
    router.push('/login')
  }

  const settingsItems: SettingItem[] = [
    {
      id: 'notifications',
      label: 'Push Notifications',
      icon: <BellIcon />,
      toggle: true,
      value: notifications,
      action: () => setNotifications(!notifications),
    },
    {
      id: 'sound',
      label: 'Sound & Haptics',
      icon: <VolumeIcon />,
      toggle: true,
      value: sound,
      action: () => setSound(!sound),
    },
    {
      id: 'account',
      label: 'Account',
      icon: <UserIcon />,
      href: '/portal',
    },
    {
      id: 'about',
      label: 'About',
      icon: <InfoIcon />,
      action: () => {},
    },
    {
      id: 'contact',
      label: 'Contact Support',
      icon: <PhoneIcon />,
      href: 'mailto:apex@stteresas.edu',
    },
    {
      id: 'privacy',
      label: 'Privacy Policy',
      icon: <ShieldIcon />,
      action: () => {},
    },
  ]

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={handleBackdropClick}
        >
          <div
            className="m-panel-slide-in"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '85%',
              maxWidth: '400px',
              background: 'var(--m-bg-secondary)',
              borderLeft: '1px solid var(--m-glass-border)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px',
              paddingTop: 'max(20px, env(safe-area-inset-top))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--m-glass-border)',
            }}>
              <h2 style={{
                fontFamily: 'var(--f-disp)',
                fontSize: '24px',
                color: 'var(--chalk)',
                letterSpacing: '-0.5px',
              }}>
                Settings
              </h2>
              <button
                onClick={onClose}
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
                }}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Settings List */}
            <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
              {settingsItems.map((item) => {
                const content = (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 20px',
                      cursor: 'pointer',
                      borderBottom: '1px solid var(--m-glass-border)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ color: 'var(--m-accent-primary)' }}>
                        {item.icon}
                      </span>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        color: 'var(--chalk)',
                      }}>
                        {item.label}
                      </span>
                    </div>
                    {item.toggle ? (
                      <Toggle
                        enabled={item.value || false}
                        onChange={() => item.action?.()}
                      />
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--m-text-tertiary)' }}>
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </div>
                )

                if (item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {content}
                    </Link>
                  )
                }

                return (
                  <div key={item.id} onClick={() => item.action?.(true)}>
                    {content}
                  </div>
                )
              })}

              {/* Quick Links */}
              <div style={{ padding: '16px 20px', marginTop: '16px' }}>
                <p style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--m-text-tertiary)',
                  marginBottom: '12px',
                }}>
                  Quick Links
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Link
                    href="/portal"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 0',
                      color: 'var(--chalk)',
                      textDecoration: 'none',
                      fontSize: '14px',
                    }}
                  >
                    <span style={{ color: 'var(--m-accent-primary)' }}><UserIcon /></span>
                    Member Portal
                  </Link>
                  <Link
                    href="/"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 0',
                      color: 'var(--chalk)',
                      textDecoration: 'none',
                      fontSize: '14px',
                    }}
                  >
                    <span style={{ color: 'var(--m-accent-primary)' }}><HomeIcon /></span>
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '20px',
              borderTop: '1px solid var(--m-glass-border)',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: '11px',
                color: 'var(--m-text-tertiary)',
              }}>
                STTA v1.0.0
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
