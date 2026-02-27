'use client'

import { useState, useEffect } from 'react'

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

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<Stats>(mockStats)

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
      color: 'var(--orange)',
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

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: '32px',
          color: 'var(--chalk)',
          marginBottom: '8px',
        }}>
          Welcome back, {user?.name || 'Member'}
        </h1>
        <p style={{ color: 'rgba(238, 236, 229, 0.5)', fontSize: '14px' }}>
          Track your progress and stay up to date with STTA
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {statCards.map((card, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(238, 236, 229, 0.03)',
              border: '1px solid rgba(238, 236, 229, 0.1)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <p style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'rgba(238, 236, 229, 0.5)',
              marginBottom: '8px',
            }}>
              {card.label}
            </p>
            <p style={{
              fontFamily: 'var(--f-disp)',
              fontSize: '28px',
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
      }}>
        {/* Next Session */}
        <div style={{
          background: 'rgba(238, 236, 229, 0.03)',
          border: '1px solid rgba(238, 236, 229, 0.1)',
          borderRadius: '12px',
          padding: '24px',
        }}>
          <h3 style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: 'rgba(238, 236, 229, 0.5)',
            marginBottom: '16px',
          }}>
            Next Session
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 107, 53, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--orange)',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p style={{ color: 'var(--chalk)', fontSize: '16px', fontWeight: 600 }}>
                {stats.nextSession.type}
              </p>
              <p style={{ color: 'rgba(238, 236, 229, 0.5)', fontSize: '13px' }}>
                {stats.nextSession.day} at {stats.nextSession.time}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div style={{
          background: 'rgba(238, 236, 229, 0.03)',
          border: '1px solid rgba(238, 236, 229, 0.1)',
          borderRadius: '12px',
          padding: '24px',
        }}>
          <h3 style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: 'rgba(238, 236, 229, 0.5)',
            marginBottom: '16px',
          }}>
            Payment Status
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: stats.paymentStatus.status === 'paid' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 68, 68, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: stats.paymentStatus.status === 'paid' ? '#22c55e' : '#ff4444',
            }}>
              {stats.paymentStatus.status === 'paid' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
            </div>
            <div>
              <p style={{ 
                color: stats.paymentStatus.status === 'paid' ? '#22c55e' : '#ff4444', 
                fontSize: '16px', 
                fontWeight: 600,
                textTransform: 'capitalize',
              }}>
                {stats.paymentStatus.status}
              </p>
              <p style={{ color: 'rgba(238, 236, 229, 0.5)', fontSize: '13px' }}>
                {stats.paymentStatus.amount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
