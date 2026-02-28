'use client'

import { useState, useEffect } from 'react'
import { useDevice } from '@/hooks/useDevice'

interface User {
  email: string
  name: string
}

interface Stats {
  sessionsAttended: number
  currentStreak: number
  ranking: string
  nextSession: {
    day: string
    time: string
    type: string
  }
  paymentStatus: {
    status: 'paid' | 'pending' | 'overdue'
    amount: string
    dueDate: string
  }
}

const mockStats: Stats = {
  sessionsAttended: 24,
  currentStreak: 6,
  ranking: '#12',
  nextSession: {
    day: 'Tuesday',
    time: '6:00 AM',
    type: 'Foundation Training'
  },
  paymentStatus: {
    status: 'paid',
    amount: 'KES 8,000',
    dueDate: 'Mar 1, 2026'
  }
}

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const AlertIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

export default function DashboardPage() {
  const { isPhone, isHydrated } = useDevice()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<Stats>(mockStats)

  const isMobile = isPhone && isHydrated

  useEffect(() => {
    const userData = localStorage.getItem('portal_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const statCards = [
    {
      label: 'Sessions Attended',
      value: stats.sessionsAttended,
      color: 'var(--m-accent-primary)',
    },
    {
      label: 'Current Streak',
      value: `${stats.currentStreak} weeks`,
      color: '#22c55e',
    },
    {
      label: 'Ranking',
      value: stats.ranking,
      color: 'var(--chalk)',
    },
  ]

  const cardStyle = isMobile ? {
    background: 'var(--m-glass-bg)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    border: '1px solid var(--m-glass-border)',
    borderRadius: '20px',
    padding: '20px',
  } : {
    background: 'rgba(238, 236, 229, 0.03)',
    border: '1px solid rgba(238, 236, 229, 0.1)',
    borderRadius: '12px',
    padding: '24px',
  }

  return (
    <div style={{ 
      padding: isMobile ? '20px' : '40px', 
      maxWidth: '1200px', 
      margin: '0 auto' 
    }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: isMobile ? '24px' : '40px' }}>
        <h1 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: isMobile ? '28px' : '32px',
          color: 'var(--chalk)',
          marginBottom: '8px',
        }}>
          Welcome back, {user?.name || 'Member'}
        </h1>
        <p style={{ 
          color: isMobile ? 'var(--m-text-secondary)' : 'rgba(238, 236, 229, 0.5)', 
          fontSize: isMobile ? '13px' : '14px' 
        }}>
          Track your progress and stay up to date with STTA
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: isMobile ? '12px' : '16px',
        marginBottom: isMobile ? '20px' : '32px',
      }}>
        {statCards.map((card, index) => (
          <div
            key={index}
            style={cardStyle}
          >
            <p style={{
              fontSize: isMobile ? '10px' : '11px',
              fontWeight: 600,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: isMobile ? 'var(--m-text-tertiary)' : 'rgba(238, 236, 229, 0.5)',
              marginBottom: '8px',
            }}>
              {card.label}
            </p>
            <p style={{
              fontFamily: 'var(--f-disp)',
              fontSize: isMobile ? '32px' : '28px',
              color: card.color,
            }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Next Session & Payment */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: isMobile ? '12px' : '16px',
      }}>
        {/* Next Session */}
        <div style={cardStyle}>
          <h3 style={{
            fontSize: isMobile ? '10px' : '11px',
            fontWeight: 600,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: isMobile ? 'var(--m-text-tertiary)' : 'rgba(238, 236, 229, 0.5)',
            marginBottom: '16px',
          }}>
            Next Session
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: isMobile ? '44px' : '48px',
              height: isMobile ? '44px' : '48px',
              borderRadius: isMobile ? '14px' : '12px',
              background: 'rgba(255, 107, 53, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--m-accent-primary)',
              flexShrink: 0,
            }}>
              <CalendarIcon />
            </div>
            <div>
              <p style={{ color: 'var(--chalk)', fontSize: isMobile ? '15px' : '16px', fontWeight: 600 }}>
                {stats.nextSession.type}
              </p>
              <p style={{ 
                color: isMobile ? 'var(--m-text-secondary)' : 'rgba(238, 236, 229, 0.5)', 
                fontSize: isMobile ? '12px' : '13px' 
              }}>
                {stats.nextSession.day} at {stats.nextSession.time}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div style={cardStyle}>
          <h3 style={{
            fontSize: isMobile ? '10px' : '11px',
            fontWeight: 600,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: isMobile ? 'var(--m-text-tertiary)' : 'rgba(238, 236, 229, 0.5)',
            marginBottom: '16px',
          }}>
            Payment Status
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: isMobile ? '44px' : '48px',
              height: isMobile ? '44px' : '48px',
              borderRadius: isMobile ? '14px' : '12px',
              background: stats.paymentStatus.status === 'paid' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 68, 68, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: stats.paymentStatus.status === 'paid' ? '#22c55e' : '#ff4444',
              flexShrink: 0,
            }}>
              {stats.paymentStatus.status === 'paid' ? <CheckIcon /> : <AlertIcon />}
            </div>
            <div>
              <p style={{ 
                color: stats.paymentStatus.status === 'paid' ? '#22c55e' : '#ff4444', 
                fontSize: isMobile ? '15px' : '16px', 
                fontWeight: 600,
                textTransform: 'capitalize',
              }}>
                {stats.paymentStatus.status}
              </p>
              <p style={{ 
                color: isMobile ? 'var(--m-text-secondary)' : 'rgba(238, 236, 229, 0.5)', 
                fontSize: isMobile ? '12px' : '13px' 
              }}>
                {stats.paymentStatus.amount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
