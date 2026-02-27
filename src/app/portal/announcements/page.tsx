'use client'

const announcements = [
  {
    id: 1,
    title: 'Q3 Championship Registration Now Open',
    category: 'Competition',
    date: 'Feb 28, 2026',
    excerpt: 'Register now for the upcoming Q3 Championship. Deadline is March 15th.',
    isNew: true,
  },
  {
    id: 2,
    title: 'New 6AM Sessions Added',
    category: 'Schedule',
    date: 'Feb 25, 2026',
    excerpt: 'Additional morning sessions now available on Tuesdays and Thursdays.',
    isNew: false,
  },
  {
    id: 3,
    title: 'Coach Mwangi Named EA Region Coach of the Year',
    category: 'Achievement',
    date: 'Feb 20, 2026',
    excerpt: 'Congratulations to our head coach for this prestigious recognition.',
    isNew: false,
  },
  {
    id: 4,
    title: 'Equipment Maintenance Day - Saturday',
    category: 'Facility',
    date: 'Feb 18, 2026',
    excerpt: 'The academy will be closed this Saturday for equipment maintenance.',
    isNew: false,
  },
  {
    id: 5,
    title: 'U-18 National Squad Shortlist Announced',
    category: 'Team',
    date: 'Feb 15, 2026',
    excerpt: 'Congratulations to our 3 players who made the national squad!',
    isNew: false,
  },
]

export default function AnnouncementsPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: '32px',
          color: 'var(--chalk)',
          marginBottom: '8px',
        }}>
          Announcements
        </h1>
        <p style={{ color: 'rgba(238, 236, 229, 0.5)', fontSize: '14px' }}>
          Latest updates from STTA
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {announcements.map((announcement) => (
          <article
            key={announcement.id}
            style={{
              background: 'rgba(238, 236, 229, 0.03)',
              border: '1px solid rgba(238, 236, 229, 0.1)',
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
            }}>
              <span style={{
                fontFamily: 'var(--f-ui)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                padding: '4px 8px',
                borderRadius: '4px',
                background: 'rgba(255, 107, 53, 0.15)',
                color: 'var(--orange)',
              }}>
                {announcement.category}
              </span>
              {announcement.isNew && (
                <span style={{
                  fontFamily: 'var(--f-ui)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#22c55e',
                }}>
                  New
                </span>
              )}
              <span style={{
                fontFamily: 'var(--f-ui)',
                fontSize: '12px',
                color: 'rgba(238, 236, 229, 0.4)',
              }}>
                {announcement.date}
              </span>
            </div>
            
            <h2 style={{
              fontFamily: 'var(--f-disp)',
              fontSize: '18px',
              color: 'var(--chalk)',
              marginBottom: '8px',
            }}>
              {announcement.title}
            </h2>
            
            <p style={{
              fontFamily: 'var(--f-ui)',
              fontSize: '14px',
              color: 'rgba(238, 236, 229, 0.6)',
              lineHeight: 1.6,
            }}>
              {announcement.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
