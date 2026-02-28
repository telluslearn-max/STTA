'use client'

import { useState, useEffect } from 'react'
import { useDevice } from '@/core/hooks/useDevice'

interface Notification {
  tag: string
  title: string
  time: string
  isLive: boolean
}

const notifications: Notification[] = [
  { tag: 'Breaking', title: 'Q3 Championship Registration Now Open', time: 'Just now · Deadline 15 Aug 2025', isLive: true },
  { tag: 'Achievement', title: 'Coach Mwangi Named EA Region Coach of the Year', time: '2 hours ago · 4 min read', isLive: false },
  { tag: 'Trials', title: '3 Players Shortlisted for U-18 National Squad', time: 'Yesterday · Kasarani Arena', isLive: false },
  { tag: 'Schedule', title: 'New 6AM Sessions Added — Tuesday & Thursday', time: '2 days ago · Limited spots', isLive: false },
]

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const { isPhone, isHydrated } = useDevice()
  const [readItems, setReadItems] = useState<number[]>([])

  useEffect(() => {
    if (!isHydrated || !isPhone) return
  }, [isPhone, isHydrated])

  if (!isHydrated || !isPhone) return null

  const unreadCount = notifications.filter(n => n.isLive).length

  const markAllAsRead = () => {
    setReadItems(notifications.map((_, i) => i))
  }

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
              <div>
                <h2 style={{
                  fontFamily: 'var(--f-disp)',
                  fontSize: '24px',
                  color: 'var(--chalk)',
                  letterSpacing: '-0.5px',
                }}>
                  Notifications
                </h2>
                <p style={{
                  fontSize: '12px',
                  color: 'var(--m-text-secondary)',
                  marginTop: '4px',
                }}>
                  {unreadCount} unread updates
                </p>
              </div>
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

            {/* Mark all as read */}
            {readItems.length < notifications.length && (
              <button
                onClick={markAllAsRead}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--m-glass-border)',
                  color: 'var(--m-accent-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                Mark all as read
              </button>
            )}

            {/* Notifications List */}
            <div style={{ flex: 1, overflow: 'auto' }}>
              {notifications.map((notif, index) => {
                const isRead = readItems.includes(index) || !notif.isLive
                return (
                  <div
                    key={index}
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid var(--m-glass-border)',
                      background: notif.isLive && !isRead ? 'rgba(255, 107, 53, 0.05)' : 'transparent',
                      opacity: isRead ? 0.6 : 1,
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                    }}>
                      <span className="m-card-tag" style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: 'var(--m-accent-primary)',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 107, 53, 0.15)',
                      }}>
                        {notif.tag}
                      </span>
                      {notif.isLive && !isRead && (
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--m-accent-primary)',
                        }} />
                      )}
                    </div>
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--chalk)',
                      lineHeight: 1.4,
                      marginBottom: '6px',
                    }}>
                      {notif.title}
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: 'var(--m-text-tertiary)',
                    }}>
                      {notif.time}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
