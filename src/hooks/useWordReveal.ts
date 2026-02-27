'use client'

import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

gsap.registerPlugin(ScrollTrigger)

export function useWordReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const words = container.querySelectorAll('.w')
    if (words.length === 0) return

    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: 0.5,
      onUpdate: (self) => {
        const lit = Math.floor(self.progress * words.length)
        words.forEach((word, i) => {
          word.classList.toggle('lit', i < lit)
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [containerRef])
}
