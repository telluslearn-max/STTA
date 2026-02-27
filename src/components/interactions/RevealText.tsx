'use client'

import { useRef, ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface RevealTextProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  stagger?: number
  className?: string
}

export function RevealText({ 
  children, 
  delay = 0,
  duration = 0.8,
  direction = 'up',
  stagger = 0.03,
  className = '',
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  useGSAP(() => {
    if (!containerRef.current) return

    console.log('[RevealText] Setting up text reveal')

    const words = containerRef.current.querySelectorAll('.reveal-word')
    console.log('[RevealText] Found words:', words.length)

    if (words.length === 0) {
      gsap.from(containerRef.current, {
        opacity: 0,
        [direction]: directions[direction].y || directions[direction].x,
        duration,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    } else {
      gsap.from(words, {
        opacity: 0,
        y: directions[direction].y,
        x: directions[direction].x,
        duration,
        ease: 'power3.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    }
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

interface SplitTextProps {
  text: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  style?: React.CSSProperties
}

export function SplitText({ text, tag = 'span', className = '', style }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const Tag = tag

  const words = text.split(' ')

  useGSAP(() => {
    if (!containerRef.current) return

    const spans = containerRef.current.querySelectorAll('.word')
    
    gsap.from(spans, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.05,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: containerRef })

  return (
    <Ref ref={containerRef} className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', marginRight: '0.3em' }} className="word">
          {word}
        </span>
      ))}
    </Ref>
  )
}

function Ref({ children, ...props }: any) {
  return <span {...props}>{children}</span>
}
