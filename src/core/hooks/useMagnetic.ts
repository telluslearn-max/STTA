'use client'

import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'

interface MagneticOptions {
  strength?: number
}

export function useMagnetic(ref: RefObject<HTMLElement | null>, options: MagneticOptions = {}) {
  const { strength = 0.35 } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      gsap.to(element, {
        x: distanceX * strength,
        y: distanceY * strength,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, strength])
}
