'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/core/lib/gsap'
import { useParallax } from '@/core/hooks/useParallax'
import { useFloat } from '@/core/hooks/useFloat'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const float1Ref = useRef<HTMLDivElement>(null)
  const float2Ref = useRef<HTMLDivElement>(null)
  const float3Ref = useRef<HTMLDivElement>(null)

  useParallax(bgRef, { speed: -0.15, direction: 'vertical', start: 'top top', end: 'bottom top' })
  useParallax(statsRef, { speed: 0.1, direction: 'vertical', start: 'top top', end: 'bottom top' })
  useFloat(float1Ref, { amplitude: 20, duration: 4, delay: 0 })
  useFloat(float2Ref, { amplitude: 25, duration: 5, delay: 0.5 })
  useFloat(float3Ref, { amplitude: 18, duration: 3.5, delay: 1 })

  useGSAP(() => {
    if (!heroRef.current) return

    console.log('[Hero] Setting up animations')

    const words = heroRef.current.querySelectorAll('.hero-word')
    console.log('[Hero] Found words:', words.length)

    gsap.set(words, { y: '110%' })

    const tl = gsap.timeline({ delay: 0.3 })
    
    tl.to(words, {
      y: '0%',
      duration: 1,
      ease: 'power4.out',
      stagger: 0.1,
    })
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to('.hero-aside', { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to('.scroll-hint', { opacity: 1, duration: 0.5 }, '-=0.3')

    console.log('[Hero] Timeline started')

    return () => {
      tl.kill()
    }
  }, { scope: heroRef })

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '140px 48px 72px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Court SVG Background */}
      <div ref={bgRef} className="court-bg" style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" style={{
          width: '100%',
          height: '100%',
          opacity: 0.032,
          stroke: 'var(--chalk)',
          fill: 'none',
          strokeWidth: 1,
        }}>
          <rect x="100" y="100" width="1200" height="600" rx="4" />
          <line x1="700" y1="100" x2="700" y2="700" />
          <line x1="690" y1="130" x2="690" y2="670" strokeWidth="3" />
          <line x1="710" y1="130" x2="710" y2="670" strokeWidth="3" />
          <line x1="100" y1="400" x2="1300" y2="400" />
          <line x1="100" y1="250" x2="690" y2="250" strokeDasharray="8 6" />
          <line x1="710" y1="250" x2="1300" y2="250" strokeDasharray="8 6" />
          <line x1="100" y1="550" x2="690" y2="550" strokeDasharray="8 6" />
          <line x1="710" y1="550" x2="1300" y2="550" strokeDasharray="8 6" />
        </svg>
      </div>

      {/* Floating 3D Elements */}
      <div ref={float1Ref} style={{
        position: 'absolute',
        top: '20%',
        left: '8%',
        width: '60px',
        height: '60px',
        border: '1px solid rgba(255,136,0,0.15)',
        borderRadius: '12px',
        transform: 'rotate(25deg)',
        transformStyle: 'preserve-3d',
        pointerEvents: 'none',
      }} />
      <div ref={float2Ref} style={{
        position: 'absolute',
        top: '35%',
        right: '12%',
        width: '40px',
        height: '40px',
        background: 'rgba(255,136,0,0.05)',
        borderRadius: '50%',
        transform: 'rotate(-15deg)',
        transformStyle: 'preserve-3d',
        pointerEvents: 'none',
      }} />
      <div ref={float3Ref} style={{
        position: 'absolute',
        bottom: '25%',
        left: '15%',
        width: '20px',
        height: '20px',
        border: '1px solid rgba(238,236,229,0.1)',
        transform: 'rotate(45deg)',
        transformStyle: 'preserve-3d',
        pointerEvents: 'none',
      }} />

      {/* Hero Aside Stats */}
      <div ref={statsRef} className="hero-aside" style={{
        position: 'absolute',
        top: '120px',
        right: '48px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        textAlign: 'right',
        opacity: 0,
        transform: 'translateX(20px)',
      }}>
        <div style={{ fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          <strong style={{ display: 'block', fontFamily: 'var(--f-disp)', fontSize: '22px', color: 'var(--chalk)', letterSpacing: '.06em', marginBottom: '2px' }}>247</strong>
          Active Members
        </div>
        <div style={{ fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          <strong style={{ display: 'block', fontFamily: 'var(--f-disp)', fontSize: '22px', color: 'var(--chalk)', letterSpacing: '.06em', marginBottom: '2px' }}>18</strong>
          National Titles
        </div>
        <div style={{ fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          <strong style={{ display: 'block', fontFamily: 'var(--f-disp)', fontSize: '22px', color: 'var(--chalk)', letterSpacing: '.06em', marginBottom: '2px' }}>1998</strong>
          Est. Nairobi
        </div>
      </div>

      {/* Headline */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: 'clamp(80px, 13.5vw, 210px)',
          lineHeight: 0.88,
          letterSpacing: '-0.01em',
        }}>
          <span className="line" style={{ display: 'block', overflow: 'hidden' }}>
            <span className="hero-word" style={{ display: 'inline-block' }}>ST.</span>
          </span>
          <span className="line" style={{ display: 'block', overflow: 'hidden' }}>
            <span className="hero-word" style={{ display: 'inline-block' }}>TERESA'S</span>
          </span>
          <span className="line" style={{ display: 'block', overflow: 'hidden' }}>
            <span className="hero-word" style={{ display: 'inline-block', color: 'var(--orange)' }}>TABLE</span>
          </span>
          <span className="line" style={{ display: 'block', overflow: 'hidden' }}>
            <span className="hero-word" style={{ display: 'inline-block' }}>TENNIS</span>
          </span>
        </h1>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: '48px',
        position: 'relative',
        zIndex: 2,
      }}>
        <p className="hero-sub" style={{
          fontSize: '13px',
          lineHeight: 1.85,
          color: 'var(--muted)',
          maxWidth: '340px',
          opacity: 0,
          transform: 'translateY(20px)',
        }}>
          East Africa's most competitive training program. Built for precision. Forged under pressure.
        </p>
        <div className="scroll-hint" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '10px',
          letterSpacing: '.22em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          opacity: 0,
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            border: '1px solid var(--edge)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            animation: 'scrollBob 2.2s ease-in-out infinite',
          }}>
            ↓
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
