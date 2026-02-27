'use client'

import { useEffect, useRef } from 'react'

interface VelocityMarqueeOptions {
  baseSpeed?: number
  direction?: 'left' | 'right'
}

export function useVelocityMarquee(
  trackRef: React.RefObject<HTMLElement | null>,
  options: VelocityMarqueeOptions = {}
) {
  const { baseSpeed = 45, direction = 'left' } = options
  const speed = useRef(baseSpeed)
  const targetSpeed = useRef(baseSpeed)
  const position = useRef(0)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const halfWidth = track.scrollWidth / 2

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY.current)
      lastScrollY.current = window.scrollY
      targetSpeed.current = baseSpeed + delta * 4
    }

    const animate = () => {
      speed.current += (targetSpeed.current - speed.current) * 0.08
      
      const moveAmount = speed.current / 60
      if (direction === 'left') {
        position.current -= moveAmount
        if (position.current <= -halfWidth) {
          position.current += halfWidth
        }
      } else {
        position.current += moveAmount
        if (position.current >= 0) {
          position.current -= halfWidth
        }
      }

      track.style.transform = `translateX(${position.current}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    const raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(raf)
    }
  }, [trackRef, baseSpeed, direction])
}
