'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxOptions {
  speed?: number
  direction?: 'vertical' | 'horizontal'
  start?: string
  end?: string
}

export function useParallax(
  targetRef: RefObject<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  const { speed = 0.5, direction = 'vertical', start = 'top bottom', end = 'bottom top' } = options

  useGSAP(() => {
    const target = targetRef.current
    if (!target) return

    if (direction === 'vertical') {
      gsap.to(target, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: target,
          start: start,
          end: end,
          scrub: true,
        },
      })
    } else {
      gsap.to(target, {
        x: () => window.innerWidth * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: target,
          start: start,
          end: end,
          scrub: true,
        },
      })
    }
  }, { scope: targetRef })
}
