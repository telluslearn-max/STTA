'use client'

import { useState } from 'react'
import { Coach } from '@/features/coaches/coaches'

interface CoachCardProps {
  coach: Coach
}

const specializationColors: Record<string, string> = {
  'Elite': 'rgba(255, 107, 53, 0.15)',
  'Juniors': 'rgba(34, 197, 94, 0.15)',
  'Foundation': 'rgba(59, 130, 246, 0.15)',
}

const specializationTextColors: Record<string, string> = {
  'Elite': 'var(--orange)',
  'Juniors': '#22c55e',
  'Foundation': '#3b82f6',
}

export function CoachCard({ coach }: CoachCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{
      background: 'rgba(238, 236, 229, 0.03)',
      border: '1px solid rgba(238, 236, 229, 0.1)',
      borderRadius: '16px',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Header */}
      <div>
        <h3 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: '22px',
          color: 'var(--chalk)',
          marginBottom: '4px',
        }}>
          {coach.name}
        </h3>
        <p style={{
          fontSize: '13px',
          color: 'rgba(238, 236, 229, 0.6)',
          marginBottom: '12px',
        }}>
          {coach.title}
        </p>
        <span style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '20px',
          background: specializationColors[coach.specialization],
          color: specializationTextColors[coach.specialization],
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          {coach.specialization}
        </span>
      </div>

      {/* Bio */}
      <div>
        <p style={{
          fontSize: '14px',
          color: 'rgba(238, 236, 229, 0.7)',
          lineHeight: 1.7,
        }}>
          {expanded ? coach.bio_full : coach.bio_short}
        </p>
        {coach.bio_full.length > coach.bio_short.length && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--orange)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '8px 0 0',
              marginTop: '4px',
            }}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Achievements */}
      <div>
        <h4 style={{
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: 'rgba(238, 236, 229, 0.5)',
          marginBottom: '10px',
        }}>
          Achievements
        </h4>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {coach.achievements.map((achievement, index) => (
            <li key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: 'rgba(238, 236, 229, 0.8)',
            }}>
              <span style={{ color: 'var(--orange)', fontSize: '10px' }}>●</span>
              {achievement}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Button */}
      <a
        href={`mailto:${coach.email}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '12px 20px',
          background: 'rgba(238, 236, 229, 0.05)',
          border: '1px solid rgba(238, 236, 229, 0.15)',
          borderRadius: '8px',
          color: 'var(--chalk)',
          fontSize: '13px',
          fontWeight: 500,
          textDecoration: 'none',
          marginTop: 'auto',
          transition: 'all 0.2s',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        Contact Coach
      </a>
    </div>
  )
}
