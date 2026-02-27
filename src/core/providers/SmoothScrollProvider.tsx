'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDevice } from '../hooks/useDevice'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const { isMobile, isTablet, os, prefersReducedMotion, isHydrated } = useDevice()

  useEffect(() => {
    if (!isHydrated || prefersReducedMotion) {
      return
    }

    const isTouchDevice = isMobile || isTablet

    const config = {
      duration: isTouchDevice ? 0.8 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical' as const,
      gestureOrientation: 'vertical' as const,
      smoothWheel: true,
      wheelMultiplier: isTouchDevice ? 1.5 : 1,
      touchMultiplier: isTouchDevice ? 3 : 2,
      smoothTouch: isTouchDevice,
      touchLinear: isTouchDevice ? 0.001 : undefined,
    }

    const lenis = new Lenis(config)

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    if (process.env.NODE_ENV === 'development') {
      console.log('[SmoothScroll] Lenis initialized', {
        isMobile,
        isTablet,
        os,
        config,
      })
    }

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [isMobile, isTablet, os, prefersReducedMotion, isHydrated])

  return <>{children}</>
}
