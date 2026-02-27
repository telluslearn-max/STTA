'use client'

import { useEffect, useRef, RefObject } from 'react'

interface ImageFollowOptions {
  strength?: { x: number; y: number }
}

export function useImageFollow(
  imageRef: RefObject<HTMLElement | null>,
  containerRef: RefObject<HTMLElement | null>,
  options: ImageFollowOptions = {}
) {
  const { strength = { x: 22, y: 16 } } = options

  useEffect(() => {
    const image = imageRef.current
    const container = containerRef.current
    if (!image || !container) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let isActive = false

    const handleMouseEnter = () => {
      isActive = true
    }

    const handleMouseLeave = () => {
      isActive = false
      targetX = 0
      targetY = 0
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * strength.x
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * strength.y
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.07
      currentY += (targetY - currentY) * 0.07

      image.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.02)`
      requestAnimationFrame(animate)
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('mousemove', handleMouseMove)

    const raf = requestAnimationFrame(animate)

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [imageRef, containerRef, strength])
}
