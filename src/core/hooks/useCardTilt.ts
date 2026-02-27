'use client'

import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'

interface CardTiltOptions {
  maxRotation?: number
}

export function useCardTilt(ref: RefObject<HTMLElement | null>, options: CardTiltOptions = {}) {
  const { maxRotation = 6 } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(element, {
        rotateY: x * maxRotation,
        rotateX: -y * (maxRotation * 0.67),
        transformPerspective: 900,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, maxRotation])
}
