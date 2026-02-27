'use client'

import { useState } from 'react'
import { Session, programColors } from '@/features/schedule/scheduleData'

interface SessionCardProps {
  session: Session
  onBook?: (session: Session) => void
  onWaitlist?: (session: Session) => void
}

export function SessionCard({ session, onBook, onWaitlist }: SessionCardProps) {
  const [showBooking, setShowBooking] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  
  const isFull = session.booked >= session.maxCapacity
  const spotsLeft = session.maxCapacity - session.booked
  const colors = programColors[session.program] || programColors['Foundation']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Booking request submitted for ${session.program} on ${session.day} at ${session.time}. We'll contact you shortly.`)
    setShowBooking(false)
    setFormData({ name: '', email: '', phone: '' })
  }

  return (
    <div style={{
      background: 'rgba(238, 236, 229, 0.03)',
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '20px',
            background: colors.bg,
            color: colors.text,
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>
            {session.program}
          </span>
          <p style={{
            fontFamily: 'var(--f-ui)',
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--chalk)',
          }}>
            {session.time} - {session.endTime}
          </p>
          <p style={{
            fontSize: '13px',
            color: 'rgba(238, 236, 229, 0.5)',
          }}>
            {session.duration} min • {session.coach}
          </p>
        </div>
        
        {/* Capacity */}
        <div style={{ textAlign: 'right' }}>
          {isFull ? (
            <span style={{
              padding: '4px 10px',
              borderRadius: '6px',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              fontSize: '11px',
              fontWeight: 600,
            }}>
              Full
            </span>
          ) : spotsLeft <= 2 ? (
            <span style={{
              padding: '4px 10px',
              borderRadius: '6px',
              background: 'rgba(255, 107, 53, 0.15)',
              color: 'var(--orange)',
              fontSize: '11px',
              fontWeight: 600,
            }}>
              {spotsLeft} spots left
            </span>
          ) : (
            <span style={{
              padding: '4px 10px',
              borderRadius: '6px',
              background: 'rgba(34, 197, 94, 0.15)',
              color: '#22c55e',
              fontSize: '11px',
              fontWeight: 600,
            }}>
              Available
            </span>
          )}
        </div>
      </div>

      {/* Booking Form */}
      {showBooking ? (
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '16px',
          background: 'rgba(238, 236, 229, 0.05)',
          borderRadius: '8px',
        }}>
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            style={{
              padding: '10px 12px',
              background: 'rgba(238, 236, 229, 0.1)',
              border: '1px solid rgba(238, 236, 229, 0.15)',
              borderRadius: '6px',
              color: 'var(--chalk)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            style={{
              padding: '10px 12px',
              background: 'rgba(238, 236, 229, 0.1)',
              border: '1px solid rgba(238, 236, 229, 0.15)',
              borderRadius: '6px',
              color: 'var(--chalk)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
            style={{
              padding: '10px 12px',
              background: 'rgba(238, 236, 229, 0.1)',
              border: '1px solid rgba(238, 236, 229, 0.15)',
              borderRadius: '6px',
              color: 'var(--chalk)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '10px',
                background: 'var(--chalk)',
                color: 'var(--ink)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setShowBooking(false)}
              style={{
                padding: '10px',
                background: 'transparent',
                border: '1px solid rgba(238, 236, 229, 0.2)',
                borderRadius: '6px',
                color: 'rgba(238, 236, 229, 0.6)',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        /* Actions */
        <div style={{ display: 'flex', gap: '8px' }}>
          {session.isPrivate ? (
            <a
              href={`mailto:apex@stteresa.edu?subject=Private Session Booking - ${session.day} ${session.time}`}
              style={{
                flex: 1,
                padding: '10px',
                background: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              Request Booking
            </a>
          ) : isFull ? (
            <button
              onClick={() => alert('Added to waitlist! We will notify you if a spot opens up.')}
              style={{
                flex: 1,
                padding: '10px',
                background: 'rgba(238, 236, 229, 0.1)',
                border: '1px solid rgba(238, 236, 229, 0.2)',
                borderRadius: '6px',
                color: 'rgba(238, 236, 229, 0.8)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Join Waitlist
            </button>
          ) : (
            <button
              onClick={() => setShowBooking(true)}
              style={{
                flex: 1,
                padding: '10px',
                background: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Book Now
            </button>
          )}
        </div>
      )}
    </div>
  )
}
