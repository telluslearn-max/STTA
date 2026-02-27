'use client'

import { useEffect, useState, useCallback } from 'react'

export type CursorState = 'idle' | 'link' | 'btn' | 'card' | 'text'

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

export function useCursor() {
  const [state, setState] = useState<CursorState>('idle')
  const [position, setPosition] = useState({ x: -200, y: -200 })
  const [mouse, setMouse] = useState({ x: -200, y: -200 })
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY })
    if (!isVisible) setIsVisible(true)
  }, [isVisible])

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    const updatePosition = () => {
      setPosition(prev => ({
        x: lerp(prev.x, mouse.x, 0.1),
        y: lerp(prev.y, mouse.y, 0.1),
      }))
      requestAnimationFrame(updatePosition)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    const raf = requestAnimationFrame(updatePosition)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(raf)
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, mouse])

  useEffect(() => {
    document.body.className = state !== 'idle' ? `cur-${state}` : ''
  }, [state])

  return {
    state,
    setState,
    position,
    isVisible,
  }
}
