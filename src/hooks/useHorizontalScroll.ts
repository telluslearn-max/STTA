'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDevice } from '@/hooks/useDevice'

interface HorizontalScrollOptions {
  speed?: number
  snap?: boolean
  snapDelay?: number
}

export function useHorizontalScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  options: HorizontalScrollOptions = {}
) {
  const { speed = 1, snap = true, snapDelay = 0.1 } = options
  const { isMobile, isHydrated, prefersReducedMotion } = useDevice()

  useEffect(() => {
    const container = containerRef.current
    if (!container || !isMobile || prefersReducedMotion || !isHydrated) return

    console.log('[HorizontalScroll] Setting up for mobile')

    const sections = gsap.utils.toArray<HTMLElement>('.h-scroll-section')
    if (sections.length === 0) return

    const totalWidth = container.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = totalWidth - viewportWidth

    gsap.to(container, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollDistance * speed}`,
        pin: true,
        scrub: 0.3,
        snap: snap ? {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.2, max: 0.4 },
          delay: snapDelay,
          ease: 'power1.inOut',
        } : undefined,
        onUpdate: (self) => {
          const progress = self.progress
          const currentSection = Math.round(progress * (sections.length - 1))
          sections.forEach((section, i) => {
            section.classList.toggle('active', i === currentSection)
          })
        },
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [containerRef, isMobile, isHydrated, prefersReducedMotion, speed, snap, snapDelay])
}
