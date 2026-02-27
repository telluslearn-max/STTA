'use client'

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--edge)',
      padding: '48px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--f-disp)',
        fontSize: '28px',
        letterSpacing: '.08em',
        color: 'rgba(238,236,229,.08)',
      }}>
        ST. TERESA'S
      </div>
      <div style={{
        fontSize: '10px',
        letterSpacing: '.12em',
        color: 'var(--muted)',
        textAlign: 'right',
      }}>
        © 2025 St. Teresa's Table Tennis · Nairobi, Kenya<br />
        <a href="#" style={{ color: 'var(--orange)', textDecoration: 'none' }}>APEX Digital Experience</a>
      </div>
    </footer>
  )
}
