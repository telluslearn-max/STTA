'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RefObject } from 'react'

interface UseSectionEnterOptions {
  delay?: number
  stagger?: number
  from?: 'up' | 'down' | 'left' | 'right' | 'scale'
  duration?: number
}

export function useSectionEnter(
  sectionRef: RefObject<HTMLElement | null>,
  options: UseSectionEnterOptions = {}
) {
  const { delay = 0, stagger = 0.1, from = 'up', duration = 0.8 } = options

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
    scale: { y: 0, x: 0, scale: 0.95 },
  }

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const elements = section.querySelectorAll('.reveal')

    if (elements.length > 0) {
      gsap.set(elements, {
        opacity: 0,
        ...directions[from],
        duration: 0,
      })

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        ease: 'power3.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      })
    }
  }, { scope: sectionRef })
}
