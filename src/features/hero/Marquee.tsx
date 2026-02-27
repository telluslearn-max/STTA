'use client'

import { useRef } from 'react'
import { useVelocityMarquee } from '@/core/hooks/useVelocityMarquee'

const marqueeWords = ['SERVE', 'SMASH', 'LOOP', 'BLOCK', 'FLICK', 'RALLY', 'DRIVE', 'PUSH', 'CHOP']

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  useVelocityMarquee(trackRef, { baseSpeed: 45, direction: 'left' })

  return (
    <div className="marquee-band" style={{
      overflow: 'hidden',
      padding: '20px 0',
      borderTop: '1px solid var(--edge)',
      borderBottom: '1px solid var(--edge)',
      background: 'var(--plate)',
    }}>
      <div className="marquee-inner" ref={trackRef} style={{
        display: 'flex',
        gap: '64px',
        whiteSpace: 'nowrap',
        willChange: 'transform',
      }}>
        {[...marqueeWords, ...marqueeWords].map((word, i) => (
          <span key={i} style={{
            fontFamily: 'var(--f-disp)',
            fontSize: 'clamp(22px, 3.5vw, 44px)',
            letterSpacing: '.08em',
            color: 'rgba(238,236,229,0.25)',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '64px',
          }}>
            {word}
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--orange)',
              flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </div>
  )
}
