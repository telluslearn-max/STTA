'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCardTilt } from '@/core/hooks/useCardTilt'
import { ApplicationForm } from '../application-form/ApplicationForm'

gsap.registerPlugin(ScrollTrigger)

export function DesktopJoin() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useCardTilt(contentRef, { maxRotation: 3 })

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

    gsap.to('.join-bg-word', {
      rotation: 4,
      scale: 1.05,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="join" ref={sectionRef} style={{
      padding: '140px 48px',
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
        fontSize: 'clamp(100px, 20vw, 280px)',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(238,236,229,.03)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        pointerEvents: 'none',
        letterSpacing: '-0.02em',
      }}>
        APEX
      </div>
      <div ref={contentRef} style={{ position: 'relative', zIndex: 1, transformStyle: 'preserve-3d' }}>
        <h2 className="join-hed reveal" style={{
          fontFamily: 'var(--f-disp)',
          fontSize: 'clamp(60px, 9vw, 130px)',
          lineHeight: 0.92,
          letterSpacing: '-0.01em',
          position: 'relative',
          zIndex: 1,
          marginBottom: '36px',
        }}>
          READY TO<br />
          <span style={{ color: 'var(--orange)' }}>JOIN?</span>
        </h2>
        <p className="join-sub reveal" style={{
          fontSize: '13px',
          lineHeight: 1.85,
          color: 'var(--muted)',
          maxWidth: '400px',
          margin: '0 auto 48px',
          position: 'relative',
          zIndex: 1,
        }}>
          One application. Three programs. Zero ceiling. Tell us where you are and we will tell you where you are going.
        </p>
        <div className="mag-btn-wrap reveal" style={{ display: 'inline-block', position: 'relative', zIndex: 1 }}>
          <ApplicationForm />
        </div>
      </div>
    </section>
  )
}
