'use client'

import { useRef } from 'react'
import { useWordReveal } from '@/hooks/useWordReveal'
import { useParallax } from '@/hooks/useParallax'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const yearsRef = useRef<HTMLDivElement>(null)
  
  useWordReveal(bodyRef)
  useParallax(yearsRef, { speed: -0.08, direction: 'vertical', start: 'top bottom', end: 'bottom top' })

  return (
    <section id="about" ref={sectionRef} style={{
      padding: '120px 48px',
      display: 'grid',
      gridTemplateColumns: '1fr 1.6fr',
      gap: '80px',
      alignItems: 'start',
    }}>
      <div className="about-sticky" style={{ position: 'sticky', top: '120px' }}>
        <div style={{
          fontSize: '10px',
          letterSpacing: '.3em',
          textTransform: 'uppercase',
          color: 'var(--orange)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{
            display: 'block',
            width: '24px',
            height: '1px',
            background: 'var(--orange)',
          }} />
          About the Club
        </div>
        <div ref={yearsRef} style={{
          fontFamily: 'var(--f-disp)',
          fontSize: 'clamp(80px, 10vw, 140px)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(238,236,229,.07)',
          lineHeight: 1,
          userSelect: 'none',
          transformStyle: 'preserve-3d',
        }}>
          27<br />Years
        </div>
      </div>
      <div className="about-body reveal" ref={bodyRef}>
        <p style={{
          fontFamily: 'var(--f-ui)',
          fontSize: 'clamp(22px, 3vw, 38px)',
          lineHeight: 1.3,
          fontWeight: 400,
          color: 'var(--muted)',
          marginBottom: '.6em',
        }}>
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>We are not a school team.</span>{' '}
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>We are a production line for</span>{' '}
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>East African champions —</span>{' '}
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>operating out of Nairobi</span>{' '}
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>since 1998.</span>
        </p>
        <p style={{
          fontFamily: 'var(--f-ui)',
          fontSize: 'clamp(22px, 3vw, 38px)',
          lineHeight: 1.3,
          fontWeight: 400,
          color: 'var(--muted)',
          marginBottom: '.6em',
          marginTop: '32px',
        }}>
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>Six Butterfly tables.</span>{' '}
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>Taraflex courts.</span>{' '}
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>Coaches who have stood</span>{' '}
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>on national podiums.</span>{' '}
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>A program built around</span>{' '}
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>what actually works.</span>
        </p>
        <p style={{
          fontFamily: 'var(--f-ui)',
          fontSize: 'clamp(22px, 3vw, 38px)',
          lineHeight: 1.3,
          fontWeight: 400,
          color: 'var(--muted)',
          marginBottom: '.6em',
          marginTop: '32px',
        }}>
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>You show up ready to work.</span>{' '}
          <span className="w" style={{ display: 'inline', transition: 'color 0.4s ease, opacity 0.4s ease' }}>We take it from there.</span>
        </p>
      </div>
    </section>
  )
}
