'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface PortalMoreMenuProps {
  isOpen: boolean
  onClose: () => void
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

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

export function PortalMoreMenu({ isOpen, onClose }: PortalMoreMenuProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('portal_user')
    router.push('/login')
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const menuItems = [
    {
      id: 'announcements',
      label: 'Announcements',
      icon: <BellIcon />,
      href: '/portal/announcements',
    },
    {
      id: 'account',
      label: 'Account Settings',
      icon: <UserIcon />,
      href: '/portal',
    },
    {
      id: 'home',
      label: 'Back to Home',
      icon: <HomeIcon />,
      href: '/',
    },
  ]

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
                More
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

            {/* Menu Items */}
            <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--m-glass-border)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
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
                </Link>
              ))}

              {/* Logout */}
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--m-glass-border)',
                  background: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderTop: 'none',
                  width: '100%',
                  textAlign: 'left',
                  color: '#ff6b35',
                }}
              >
                <LogoutIcon />
                <span style={{
                  fontSize: '15px',
                  fontWeight: 500,
                }}>
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
