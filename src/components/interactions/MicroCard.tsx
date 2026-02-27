'use client'

import { useRef, ReactNode, CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

interface MicroCardProps {
  children: ReactNode
  hoverEffect?: 'tilt' | 'lift' | 'glow' | 'none'
  className?: string
  style?: CSSProperties
}

export function MicroCard({ 
  children, 
  hoverEffect = 'lift',
  className = '',
  style,
}: MicroCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardRef.current) return

    const card = cardRef.current

    const handleMouseEnter = () => {
      console.log('[MicroCard] Mouse enter')
      
      if (hoverEffect === 'lift') {
        gsap.to(card, {
          y: -8,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
      
      if (hoverEffect === 'glow') {
        gsap.to(card.querySelector('.card-glow') as HTMLElement, {
          opacity: 1,
          duration: 0.3,
        })
      }

      gsap.to(progressRef.current, {
        width: '100%',
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      console.log('[MicroCard] Mouse leave')
      
      if (hoverEffect === 'lift') {
        gsap.to(card, {
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        })
      }

      if (hoverEffect === 'glow') {
        gsap.to(card.querySelector('.card-glow') as HTMLElement, {
          opacity: 0,
          duration: 0.3,
        })
      }

      gsap.to(progressRef.current, {
        width: '0%',
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { scope: cardRef })

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
      <div 
        ref={progressRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: '0%',
          background: 'var(--orange)',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  )
}
