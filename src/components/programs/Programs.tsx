'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const programs = [
  {
    num: '01',
    tag: 'Juniors · Ages 8–16',
    title: 'Foundation Program',
    body: 'Footwork fundamentals, grip biomechanics, and serve mechanics. We build the base before we build the weapon.',
    stat: '48',
    statLabel: 'players',
  },
  {
    num: '02',
    tag: 'Open · Ages 16+',
    title: 'Competitive Track',
    body: 'Multi-ball drills, tactical analysis, tournament preparation, and match simulation. For players who want results.',
    stat: '31',
    statLabel: 'players',
  },
  {
    num: '03',
    tag: 'Elite · Invite Only',
    title: 'APEX Squad',
    body: "Twice-daily sessions, sports psychology, nutrition protocols. The inner circle where national champions are shaped.",
    stat: '12',
    statLabel: 'athletes',
  },
]

function ProgramCard({ program, index }: { program: typeof programs[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardRef.current) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(cardRef.current, {
        rotateY: x * 6,
        rotateX: -y * 4,
        transformPerspective: 900,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    cardRef.current.addEventListener('mousemove', handleMouseMove)
    cardRef.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cardRef.current?.removeEventListener('mousemove', handleMouseMove)
      cardRef.current?.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  return (
    <div
      ref={cardRef}
      className="prog-card"
      style={{
        background: 'var(--plate)',
        padding: '40px 36px',
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, rgba(255,78,0,.07) 0%, transparent 60%)',
        opacity: 0,
        transition: 'opacity 0.5s',
        pointerEvents: 'none',
      }} className="prog-card-hover" />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: '2px',
        background: 'var(--orange)',
        transition: 'width 0.5s cubic-bezier(.77,0,.175,1)',
      }} className="prog-card-line" />
      <div style={{
        fontFamily: 'var(--f-disp)',
        fontSize: '72px',
        color: 'rgba(238,236,229,.04)',
        lineHeight: 1,
        position: 'absolute',
        top: '24px',
        right: '28px',
      }} className="card-num">
        {program.num}
      </div>
      <div style={{
        fontSize: '9px',
        letterSpacing: '.28em',
        textTransform: 'uppercase',
        color: 'var(--orange)',
        marginBottom: '16px',
      }}>
        {program.tag}
      </div>
      <h3 style={{
        fontFamily: 'var(--f-disp)',
        fontSize: 'clamp(28px, 3vw, 44px)',
        letterSpacing: '.02em',
        lineHeight: 1.05,
        color: 'var(--chalk)',
        marginBottom: '20px',
      }}>
        {program.title}
      </h3>
      <p style={{
        fontSize: '12px',
        lineHeight: 1.9,
        color: 'var(--muted)',
        marginBottom: '32px',
      }}>
        {program.body}
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '24px',
        borderTop: '1px solid var(--edge)',
      }}>
        <div style={{
          fontFamily: 'var(--f-disp)',
          fontSize: '32px',
          color: 'var(--chalk)',
        }}>
          {program.stat} <small style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '10px',
            color: 'var(--muted)',
            marginLeft: '4px',
          }}>{program.statLabel}</small>
        </div>
        <a href="#join" style={{
          width: '40px',
          height: '40px',
          border: '1px solid var(--edge)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          color: 'var(--chalk)',
          textDecoration: 'none',
        }} className="card-arrow">→</a>
      </div>
    </div>
  )
}

export function Programs() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return

    console.log('[Programs] Setting up ScrollTrigger')

    const cards = containerRef.current.querySelectorAll('.prog-card')
    console.log('[Programs] Found cards:', cards.length)

    const tl = gsap.from(cards, {
      opacity: 0,
      y: 50,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          console.log('[Programs] ScrollTrigger fired!')
        },
      },
    })

    return () => {
      tl.kill()
    }
  }, { scope: sectionRef })

  return (
    <section 
      id="programs" 
      ref={sectionRef}
      style={{ padding: '0 48px 140px' }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '60px',
      }}>
        <h2 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: 'clamp(48px, 7vw, 100px)',
          letterSpacing: '.02em',
          lineHeight: 0.95,
        }}>
          CHOOSE<br />
          <span style={{ color: 'var(--orange)' }}>YOUR LEVEL</span>
        </h2>
        <span style={{
          fontFamily: 'var(--f-mono)',
          fontSize: '11px',
          letterSpacing: '.2em',
          color: 'var(--muted)',
        }}>
          03 Programs
        </span>
      </div>
      <div 
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
        }}
      >
        {programs.map((program, i) => (
          <ProgramCard key={program.num} program={program} index={i} />
        ))}
      </div>
    </section>
  )
}
