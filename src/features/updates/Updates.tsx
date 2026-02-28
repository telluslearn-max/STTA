'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDevice } from '@/core/hooks/useDevice'

gsap.registerPlugin(ScrollTrigger)

const notifications = [
  { tag: 'Breaking', title: 'Q3 Championship Registration Now Open', time: 'Just now · Deadline 15 Aug 2025', isLive: true },
  { tag: 'Achievement', title: 'Coach Mwangi Named EA Region Coach of the Year', time: '2 hours ago · 4 min read', isLive: false },
  { tag: 'Trials', title: '3 Players Shortlisted for U-18 National Squad', time: 'Yesterday · Kasarani Arena', isLive: false },
  { tag: 'Schedule', title: 'New 6AM Sessions Added — Tuesday & Thursday', time: '2 days ago · Limited spots', isLive: false },
]

export function Notifications() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isPhone, isHydrated } = useDevice()
  const isMobile = isPhone && isHydrated

  useGSAP(() => {
    if (!sectionRef.current) return

    const rows = sectionRef.current.querySelectorAll('.notif-row, .m-reveal-card')
    
    gsap.from(rows, {
      opacity: 0,
      y: 30,
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="notifs" ref={sectionRef} style={{
      borderTop: '1px solid var(--edge)',
      padding: isMobile ? '60px 20px 80px' : '80px 48px 120px',
      background: 'var(--plate)',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'flex-end',
        marginBottom: isMobile ? '32px' : '48px',
        gap: isMobile ? '16px' : 0,
      }}>
        <h2 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: isMobile ? '36px' : 'clamp(36px, 5vw, 72px)',
          letterSpacing: '.02em',
          lineHeight: 1,
        }}>
          WHAT'S<br />HAPPENING
        </h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '10px',
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          color: isMobile ? 'var(--m-accent-primary)' : 'var(--orange)',
          paddingBottom: '6px',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isMobile ? 'var(--m-accent-primary)' : 'var(--orange)',
            boxShadow: isMobile ? '0 0 10px var(--m-accent-primary)' : '0 0 10px var(--orange)',
            animation: 'livePulse 1.4s ease-in-out infinite',
          }} />
          Live Updates
        </div>
      </div>

      {notifications.map((notif, i) => (
        <div
          key={i}
          className={isMobile ? 'm-reveal-card' : 'notif-row'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '16px' : '24px',
            padding: isMobile ? '24px' : '24px 0',
            borderBottom: isMobile ? 'none' : '1px solid var(--edge)',
            position: 'relative',
            cursor: 'pointer',
            marginBottom: isMobile ? '16px' : 0,
          }}
        >
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            flexShrink: 0,
            background: notif.isLive ? (isMobile ? 'var(--m-accent-primary)' : 'var(--orange)') : 'var(--edge)',
            boxShadow: notif.isLive ? (isMobile ? '0 0 12px var(--m-accent-primary)' : '0 0 12px var(--orange)') : 'none',
            animation: notif.isLive ? 'livePulse 1.4s ease-in-out infinite' : 'none',
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: isMobile ? '10px' : '9px',
              letterSpacing: isMobile ? '.1em' : '.25em',
              textTransform: 'uppercase',
              color: isMobile ? 'var(--m-accent-primary)' : (notif.isLive ? 'var(--orange)' : 'var(--muted)'),
              marginBottom: '5px',
              fontWeight: 700,
              padding: isMobile ? '6px 12px' : 0,
              borderRadius: isMobile ? '12px' : 0,
              background: isMobile ? 'rgba(255, 107, 53, 0.15)' : 'transparent',
              border: isMobile ? '1px solid rgba(255, 107, 53, 0.3)' : 'none',
              display: 'inline-block',
            }}>
              {notif.tag}
            </div>
            <div style={{
              fontFamily: 'var(--f-disp)',
              fontSize: isMobile ? '22px' : 'clamp(18px, 2.2vw, 28px)',
              letterSpacing: '.02em',
              color: 'var(--chalk)',
            }}>
              {notif.title}
            </div>
            <div style={{
              fontSize: isMobile ? '12px' : '10px',
              letterSpacing: '.1em',
              color: isMobile ? 'var(--m-text-secondary)' : 'var(--muted)',
              marginTop: '4px',
            }}>
              {notif.time}
            </div>
          </div>
          <div style={{
            width: isMobile ? '32px' : '36px',
            height: isMobile ? '32px' : '36px',
            borderRadius: '50%',
            border: isMobile ? 'none' : '1px solid var(--edge)',
            background: isMobile ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: 'var(--muted)',
            flexShrink: 0,
          }}>
            →
          </div>
        </div>
      ))}
    </section>
  )
}
