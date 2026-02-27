'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { RefObject } from 'react'

interface UseFloatOptions {
  amplitude?: number
  duration?: number
  delay?: number
}

export function useFloat(
  targetRef: RefObject<HTMLElement | null>,
  options: UseFloatOptions = {}
) {
  const { amplitude = 15, duration = 3, delay = 0 } = options

  useGSAP(() => {
    const target = targetRef.current
    if (!target) return

    gsap.to(target, {
      y: -amplitude,
      duration: duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: delay,
    })
  }, { scope: targetRef })
}
