'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const notifications = [
  { tag: 'Breaking', title: 'Q3 Championship Registration Now Open', time: 'Just now · Deadline 15 Aug 2025', isLive: true },
  { tag: 'Achievement', title: 'Coach Mwangi Named EA Region Coach of the Year', time: '2 hours ago · 4 min read', isLive: false },
  { tag: 'Trials', title: '3 Players Shortlisted for U-18 National Squad', time: 'Yesterday · Kasarani Arena', isLive: false },
  { tag: 'Schedule', title: 'New 6AM Sessions Added — Tuesday & Thursday', time: '2 days ago · Limited spots', isLive: false },
]

export function Notifications() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    console.log('[Notifications] Setting up ScrollTrigger')

    const rows = sectionRef.current.querySelectorAll('.notif-row')
    console.log('[Notifications] Found rows:', rows.length)

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
        onEnter: () => {
          console.log('[Notifications] ScrollTrigger fired!')
        },
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="notifs" ref={sectionRef} style={{
      borderTop: '1px solid var(--edge)',
      padding: '80px 48px 120px',
      background: 'var(--plate)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '48px',
      }}>
        <h2 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: 'clamp(36px, 5vw, 72px)',
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
          color: 'var(--orange)',
          paddingBottom: '6px',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--orange)',
            boxShadow: '0 0 10px var(--orange)',
            animation: 'livePulse 1.4s ease-in-out infinite',
          }} />
          Live Updates
        </div>
      </div>

      {notifications.map((notif, i) => (
        <div
          key={i}
          className="notif-row reveal"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            padding: '24px 0',
            borderBottom: '1px solid var(--edge)',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            flexShrink: 0,
            background: notif.isLive ? 'var(--orange)' : 'var(--edge)',
            boxShadow: notif.isLive ? '0 0 12px var(--orange)' : 'none',
            animation: notif.isLive ? 'livePulse 1.4s ease-in-out infinite' : 'none',
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '9px',
              letterSpacing: '.25em',
              textTransform: 'uppercase',
              color: notif.isLive ? 'var(--orange)' : 'var(--muted)',
              marginBottom: '5px',
            }}>
              {notif.tag}
            </div>
            <div style={{
              fontFamily: 'var(--f-disp)',
              fontSize: 'clamp(18px, 2.2vw, 28px)',
              letterSpacing: '.02em',
              color: 'var(--chalk)',
            }}>
              {notif.title}
            </div>
            <div style={{
              fontSize: '10px',
              letterSpacing: '.1em',
              color: 'var(--muted)',
              marginTop: '4px',
            }}>
              {notif.time}
            </div>
          </div>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid var(--edge)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: 'var(--muted)',
            flexShrink: 0,
          }} className="notif-action">
            →
          </div>
        </div>
      ))}
    </section>
  )
}
