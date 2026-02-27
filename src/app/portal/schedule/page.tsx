'use client'

const weeklySchedule = [
  { day: 'Monday', sessions: [
    { time: '6:00 AM', type: 'Foundation', duration: '1hr', spots: 4 },
    { time: '4:00 PM', type: 'Competitive', duration: '2hr', spots: 2 },
  ]},
  { day: 'Tuesday', sessions: [
    { time: '6:00 AM', type: 'Foundation', duration: '1hr', spots: 6 },
    { time: '5:00 PM', type: 'APEX Squad', duration: '2hr', spots: 0 },
  ]},
  { day: 'Wednesday', sessions: [
    { time: '6:00 AM', type: 'Foundation', duration: '1hr', spots: 5 },
    { time: '4:00 PM', type: 'Competitive', duration: '2hr', spots: 3 },
  ]},
  { day: 'Thursday', sessions: [
    { time: '6:00 AM', type: 'Foundation', duration: '1hr', spots: 8 },
    { time: '5:00 PM', type: 'APEX Squad', duration: '2hr', spots: 1 },
  ]},
  { day: 'Friday', sessions: [
    { time: '4:00 PM', type: 'Competitive', duration: '2hr', spots: 4 },
  ]},
  { day: 'Saturday', sessions: [
    { time: '9:00 AM', type: 'Foundation', duration: '1hr', spots: 2 },
    { time: '11:00 AM', type: 'Open Play', duration: '2hr', spots: 10 },
  ]},
  { day: 'Sunday', sessions: [
    { time: '10:00 AM', type: 'Tournament Match', duration: '3hr', spots: 0 },
  ]},
]

export default function SchedulePage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: '32px',
          color: 'var(--chalk)',
          marginBottom: '8px',
        }}>
          Weekly Schedule
        </h1>
        <p style={{ color: 'rgba(238, 236, 229, 0.5)', fontSize: '14px' }}>
          View upcoming training sessions
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {weeklySchedule.map((day) => (
          <div
            key={day.day}
            style={{
              background: 'rgba(238, 236, 229, 0.03)',
              border: '1px solid rgba(238, 236, 229, 0.1)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div style={{
              padding: '16px 20px',
              background: 'rgba(238, 236, 229, 0.05)',
              borderBottom: '1px solid rgba(238, 236, 229, 0.08)',
            }}>
              <h3 style={{
                fontFamily: 'var(--f-ui)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--chalk)',
              }}>
                {day.day}
              </h3>
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {day.sessions.length > 0 ? (
                day.sessions.map((session, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{
                        fontFamily: 'var(--f-ui)',
                        fontSize: '13px',
                        color: 'var(--orange)',
                        fontWeight: 600,
                        minWidth: '60px',
                      }}>
                        {session.time}
                      </span>
                      <span style={{
                        fontFamily: 'var(--f-ui)',
                        fontSize: '14px',
                        color: 'var(--chalk)',
                      }}>
                        {session.type}
                      </span>
                      <span style={{
                        fontFamily: 'var(--f-ui)',
                        fontSize: '12px',
                        color: 'rgba(238, 236, 229, 0.4)',
                      }}>
                        {session.duration}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: 'var(--f-ui)',
                      fontSize: '12px',
                      color: session.spots === 0 ? '#ff4444' : session.spots <= 2 ? 'var(--orange)' : '#22c55e',
                    }}>
                      {session.spots === 0 ? 'Full' : `${session.spots} spots left`}
                    </span>
                  </div>
                ))
              ) : (
                <span style={{
                  fontFamily: 'var(--f-ui)',
                  fontSize: '13px',
                  color: 'rgba(238, 236, 229, 0.3)',
                }}>
                  No sessions scheduled
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
