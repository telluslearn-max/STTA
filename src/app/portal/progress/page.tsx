'use client'

import { useMemo } from 'react'

interface AttendanceData {
  [date: string]: number // 0 = no activity, 1-3 = sessions attended
}

// Generate mock attendance data for the past year
function generateMockAttendance(): AttendanceData {
  const data: AttendanceData = {}
  const today = new Date()
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    // Random attendance (weighted towards more attendance)
    const rand = Math.random()
    if (rand < 0.4) {
      data[dateStr] = 0 // No activity
    } else if (rand < 0.7) {
      data[dateStr] = 1 // 1 session
    } else if (rand < 0.9) {
      data[dateStr] = 2 // 2 sessions
    } else {
      data[dateStr] = 3 // 3+ sessions
    }
  }
  
  return data
}

const getColor = (level: number): string => {
  switch (level) {
    case 0:
      return 'rgba(238, 236, 229, 0.08)'
    case 1:
      return 'rgba(255, 107, 53, 0.3)'
    case 2:
      return 'rgba(255, 107, 53, 0.6)'
    case 3:
    default:
      return 'var(--orange)'
  }
}

export default function ProgressPage() {
  const attendance = useMemo(() => generateMockAttendance(), [])
  
  // Group by weeks (52 weeks)
  const weeks = useMemo(() => {
    const result: AttendanceData[][] = []
    const today = newDate()
    
    // Start from the oldest date (365 days ago)
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - 364)
    
    // Adjust to start from Sunday
    const dayOfWeek = startDate.getDay()
    startDate.setDate(startDate.getDate() - dayOfWeek)
    
    let currentWeek: AttendanceData[] = []
    
    for (let i = 0; i < 53 * 7; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      
      const dateStr = date.toISOString().split('T')[0]
      const isToday = dateStr === today.toISOString().split('T')[0]
      const isFuture = date > today
      
      currentWeek.push({
        [dateStr]: isFuture ? -1 : (attendance[dateStr] || 0)
      })
      
      if (currentWeek.length === 7) {
        result.push(currentWeek)
        currentWeek = []
      }
    }
    
    return result
  }, [attendance])

  const totalSessions = Object.values(attendance).reduce((sum, val) => sum + (val > 0 ? val : 0), 0)
  const activeWeeks = Object.values(attendance).filter(val => val > 0).length

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: '32px',
          color: 'var(--chalk)',
          marginBottom: '8px',
        }}>
          Your Progress
        </h1>
        <p style={{ color: 'rgba(238, 236, 229, 0.5)', fontSize: '14px' }}>
          Track your attendance consistency over time
        </p>
      </div>

      {/* Stats Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <div style={{
          background: 'rgba(238, 236, 229, 0.03)',
          border: '1px solid rgba(238, 236, 229, 0.1)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: 'rgba(238, 236, 229, 0.5)',
            marginBottom: '4px',
          }}>
            Total Sessions
          </p>
          <p style={{ fontFamily: 'var(--f-disp)', fontSize: '24px', color: 'var(--orange)' }}>
            {totalSessions}
          </p>
        </div>
        <div style={{
          background: 'rgba(238, 236, 229, 0.03)',
          border: '1px solid rgba(238, 236, 229, 0.1)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: 'rgba(238, 236, 229, 0.5)',
            marginBottom: '4px',
          }}>
            Active Days
          </p>
          <p style={{ fontFamily: 'var(--f-disp)', fontSize: '24px', color: 'var(--chalk)' }}>
            {activeWeeks}
          </p>
        </div>
        <div style={{
          background: 'rgba(238, 236, 229, 0.03)',
          border: '1px solid rgba(238, 236, 229, 0.1)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: 'rgba(238, 236, 229, 0.5)',
            marginBottom: '4px',
          }}>
            Consistency
          </p>
          <p style={{ fontFamily: 'var(--f-disp)', fontSize: '24px', color: 'var(--chalk)' }}>
            {Math.round((activeWeeks / 52) * 100)}%
          </p>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
        fontSize: '12px',
        color: 'rgba(238, 236, 229, 0.5)',
      }}>
        <span>Less</span>
        <div style={{ display: 'flex', gap: '3px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: getColor(0) }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: getColor(1) }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: getColor(2) }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: getColor(3) }} />
        </div>
        <span>More</span>
      </div>

      {/* Attendance Grid */}
      <div style={{
        background: 'rgba(238, 236, 229, 0.03)',
        border: '1px solid rgba(238, 236, 229, 0.1)',
        borderRadius: '12px',
        padding: '24px',
        overflowX: 'auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(53, 12px)',
          gap: '3px',
          width: 'fit-content',
        }}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {week.map((day, dayIndex) => {
                const dateStr = Object.keys(day)[0]
                const value = Object.values(day)[0]
                const isFuture = value === -1
                
                return (
                  <div
                    key={dateStr}
                    title={`${dateStr}: ${value === -1 ? 'Future' : value === 0 ? 'No activity' : value + ' session(s)'}`}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '2px',
                      background: isFuture ? 'transparent' : getColor(value),
                      border: isFuture ? '1px dashed rgba(238, 236, 229, 0.1)' : 'none',
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function newDate(): Date {
  return new Date()
}
