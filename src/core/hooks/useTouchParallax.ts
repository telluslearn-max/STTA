'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDevice } from './useDevice'

interface TouchParallaxOptions {
  speed?: number
  direction?: 'vertical' | 'horizontal'
  start?: string
  end?: string
  mode?: 'scrub' | 'tilt' | 'both'
  tiltMax?: number
  scrubSpeed?: number
  disabled?: boolean
}

export function useTouchParallax(
  targetRef: React.RefObject<HTMLElement | null>,
  options: TouchParallaxOptions = {}
) {
  const {
    speed = 0.5,
    direction = 'vertical',
    start = 'top bottom',
    end = 'bottom top',
    mode = 'scrub',
    tiltMax = 15,
    scrubSpeed = 0.3,
    disabled = false,
  } = options

  const { isMobile, isTouch, isHydrated, prefersReducedMotion } = useDevice()

  const enableParallax = isHydrated && !disabled && !prefersReducedMotion

  useEffect(() => {
    const target = targetRef.current
    if (!target || !enableParallax) return

    if (mode === 'scrub' || mode === 'both') {
      const scrubValue = isMobile ? scrubSpeed : 1
      
      if (direction === 'vertical') {
        gsap.to(target, {
          y: () => window.innerHeight * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: target,
            start,
            end,
            scrub: scrubValue,
          },
        })
      } else {
        gsap.to(target, {
          x: () => window.innerWidth * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: target,
            start,
            end,
            scrub: scrubValue,
          },
        })
      }
    }

    if ((mode === 'tilt' || mode === 'both') && isMobile && isTouch) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (!target) return

        const tiltX = event.gamma ? Math.min(Math.max(event.gamma / 45, -1), 1) * tiltMax : 0
        const tiltY = event.beta ? Math.min(Math.max(event.beta / 45, -1), 1) * tiltMax : 0

        gsap.to(target, {
          rotationY: tiltX,
          rotationX: -tiltY,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power2.out',
        })
      }

      const requestPermission = async () => {
        if (typeof DeviceOrientationEvent !== 'undefined' && 
            typeof (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission === 'function') {
          try {
            const permission = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
            if (permission === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation)
            }
          } catch {
            console.log('[TouchParallax] Device orientation permission denied')
          }
        } else {
          window.addEventListener('deviceorientation', handleOrientation)
        }
      }

      requestPermission()

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation)
      }
    }
  }, [targetRef, enableParallax, mode, isMobile, isTouch, speed, direction, start, end, scrubSpeed, tiltMax])
}

interface DragParallaxOptions {
  strength?: number
  enabled?: boolean
}

export function useDragParallax(
  containerRef: React.RefObject<HTMLElement | null>,
  targetRef: React.RefObject<HTMLElement | null>,
  options: DragParallaxOptions = {}
) {
  const { strength = 20, enabled = true } = options
  const { isMobile, isTouch, isHydrated } = useDevice()
  const isEnabled = isHydrated && enabled && isMobile && isTouch
  const currentPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const container = containerRef.current
    const target = targetRef.current
    if (!container || !target || !isEnabled) return

    let isDragging = false

    const handleMove = (clientX: number, clientY: number) => {
      if (!isDragging) return
      
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const x = (clientX - centerX) / rect.width
      const y = (clientY - centerY) / rect.height

      currentPos.current = {
        x: x * strength,
        y: y * strength,
      }
    }

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const animate = () => {
      gsap.to(target, {
        x: currentPos.current.x,
        y: currentPos.current.y,
        duration: 0.3,
        ease: 'power2.out',
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    const handleStart = (clientX: number, clientY: number) => {
      isDragging = true
      animate()
    }

    const handleEnd = () => {
      isDragging = false
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    container.addEventListener('mousedown', (e: MouseEvent) => handleStart(e.clientX, e.clientY))
    container.addEventListener('touchstart', (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleStart(e.touches[0].clientX, e.touches[0].clientY)
      }
    })
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchend', handleEnd)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef, targetRef, isEnabled, strength])
}
