'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ApplicationForm } from '../application-form/ApplicationForm'

gsap.registerPlugin(ScrollTrigger)

export function MobileJoin() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    gsap.from('.join-hed, .join-sub, .mag-btn-wrap', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="join" ref={sectionRef} style={{
      padding: '80px 20px 120px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="join-bg-word" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--f-disp)',
        fontSize: 'clamp(80px, 25vw, 200px)',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(238,236,229,.03)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        pointerEvents: 'none',
        letterSpacing: '-0.02em',
      }}>
        APEX
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="join-hed reveal" style={{
          fontFamily: 'var(--f-disp)',
          fontSize: 'clamp(40px, 12vw, 80px)',
          lineHeight: 0.92,
          letterSpacing: '-0.01em',
          position: 'relative',
          zIndex: 1,
          marginBottom: '24px',
        }}>
          READY TO<br />
          <span style={{ color: 'var(--orange)' }}>JOIN?</span>
        </h2>
        <p className="join-sub reveal" style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--muted)',
          maxWidth: '100%',
          margin: '0 auto 32px',
          position: 'relative',
          zIndex: 1,
        }}>
          One application. Three programs. Zero ceiling.
        </p>
        <div className="mag-btn-wrap reveal" style={{ display: 'inline-block', position: 'relative', zIndex: 1 }}>
          <ApplicationForm />
        </div>
      </div>
    </section>
  )
}
