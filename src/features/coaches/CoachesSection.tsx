'use client'

import { useState } from 'react'
import { coaches, Coach } from '@/features/coaches/coaches'
import { CoachCard } from '@/components/coaches/CoachCard'

type FilterType = 'all' | 'Juniors' | 'Elite' | 'Foundation'

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'Juniors', label: 'Juniors' },
  { value: 'Elite', label: 'Elite' },
  { value: 'Foundation', label: 'Foundation' },
]

export function CoachesSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filteredCoaches: Coach[] = activeFilter === 'all'
    ? coaches
    : coaches.filter(coach => coach.specialization === activeFilter)

  return (
    <section id="coaches" style={{
      padding: '120px 48px',
      background: '#0a0a0a',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          <h2 style={{
            fontFamily: 'var(--f-disp)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            color: 'var(--chalk)',
            marginBottom: '16px',
            lineHeight: 1.1,
          }}>
            Meet Our <span style={{ color: 'var(--orange)' }}>Coaches</span>
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'rgba(238, 236, 229, 0.5)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Expert coaching from former national champions and certified professionals
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
                padding: '10px 24px',
                background: activeFilter === filter.value ? 'var(--chalk)' : 'transparent',
                border: '1px solid rgba(238, 236, 229, 0.2)',
                borderRadius: '99px',
                color: activeFilter === filter.value ? 'var(--ink)' : 'rgba(238, 236, 229, 0.6)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Coaches Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {filteredCoaches.map(coach => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCoaches.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'rgba(238, 236, 229, 0.4)',
          }}>
            No coaches found for this category
          </div>
        )}
      </div>
    </section>
  )
}
