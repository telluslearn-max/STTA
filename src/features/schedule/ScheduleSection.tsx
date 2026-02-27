'use client'

import { useState } from 'react'
import { schedule, days, Session, programColors } from '@/features/schedule/scheduleData'
import { SessionCard } from '@/components/schedule/SessionCard'

type FilterType = 'all' | 'Foundation' | 'Juniors' | 'Elite' | 'Competitive' | 'Private'

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All Sessions' },
  { value: 'Foundation', label: 'Foundation' },
  { value: 'Juniors', label: 'Juniors' },
  { value: 'Elite', label: 'Elite' },
  { value: 'Competitive', label: 'Competitive' },
  { value: 'Private', label: 'Private' },
]

export function ScheduleSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filteredSchedule: Session[] = activeFilter === 'all'
    ? schedule
    : schedule.filter(s => s.program === activeFilter)

  // Group by day
  const scheduleByDay = days.map(day => ({
    day,
    sessions: filteredSchedule.filter(s => s.day === day)
  }))

  return (
    <section id="schedule" style={{
      padding: '120px 48px',
      background: '#0a0a0a',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: 'var(--f-disp)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            color: 'var(--chalk)',
            marginBottom: '16px',
            lineHeight: 1.1,
          }}>
            Training <span style={{ color: 'var(--orange)' }}>Schedule</span>
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'rgba(238, 236, 229, 0.5)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Book your training sessions. Morning and evening slots available.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '48px',
          flexWrap: 'wrap',
        }}>
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              style={{
                padding: '10px 20px',
                background: activeFilter === filter.value ? 'var(--chalk)' : 'transparent',
                border: '1px solid rgba(238, 236, 229, 0.2)',
                borderRadius: '99px',
                color: activeFilter === filter.value ? 'var(--ink)' : 'rgba(238, 236, 229, 0.6)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}>
          {Object.entries(programColors).map(([program, colors]) => (
            <div key={program} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                background: colors.text,
              }} />
              <span style={{ fontSize: '11px', color: 'rgba(238, 236, 229, 0.5)' }}>
                {program}
              </span>
            </div>
          ))}
        </div>

        {/* Schedule Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {scheduleByDay.map(dayData => (
            <div key={dayData.day}>
              <h3 style={{
                fontFamily: 'var(--f-ui)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--chalk)',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid rgba(238, 236, 229, 0.1)',
              }}>
                {dayData.day}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dayData.sessions.length > 0 ? (
                  dayData.sessions.map(session => (
                    <SessionCard key={session.id} session={session} />
                  ))
                ) : (
                  <p style={{
                    fontSize: '13px',
                    color: 'rgba(238, 236, 229, 0.3)',
                    padding: '20px 0',
                    textAlign: 'center',
                  }}>
                    No sessions
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Private Sessions CTA */}
        <div style={{
          marginTop: '48px',
          padding: '32px',
          background: 'rgba(234, 179, 8, 0.1)',
          border: '1px solid rgba(234, 179, 8, 0.2)',
          borderRadius: '16px',
          textAlign: 'center',
        }}>
          <h3 style={{
            fontFamily: 'var(--f-disp)',
            fontSize: '20px',
            color: '#eab308',
            marginBottom: '8px',
          }}>
            Private Sessions
          </h3>
          <p style={{
            fontSize: '14px',
            color: 'rgba(238, 236, 229, 0.7)',
            marginBottom: '16px',
          }}>
            One-on-one coaching tailored to your specific needs. Contact us to book.
          </p>
          <a
            href="mailto:apex@stteresa.edu?subject=Private Session Inquiry"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#eab308',
              color: '#0a0a0a',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Request Private Session
          </a>
        </div>
      </div>
    </section>
  )
}
