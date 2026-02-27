'use client'

import { useRef, ReactNode, CSSProperties } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useCursorState } from './CursorProvider'

interface MagneticButtonProps {
  children: ReactNode
  cursorState?: 'link' | 'btn' | 'card' | 'text'
  strength?: number
  className?: string
  style?: CSSProperties
}

export function MagneticButton({ 
  children, 
  cursorState = 'btn',
  strength = 0.45,
  className = '',
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const { setCursorState } = useCursorState()
  
  useMagnetic(ref, { strength })

  return (
    <button
      ref={ref}
      className={className}
      style={style}
      onMouseEnter={() => setCursorState(cursorState)}
      onMouseLeave={() => setCursorState('idle')}
    >
      {children}
    </button>
  )
}

interface MagneticLinkProps {
  href: string
  children: ReactNode
  cursorState?: 'link' | 'btn' | 'card' | 'text'
  strength?: number
  className?: string
  style?: CSSProperties
}

export function MagneticLink({ 
  href, 
  children, 
  cursorState = 'link',
  strength = 0.3,
  className = '',
  style,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { setCursorState } = useCursorState()
  
  useMagnetic(ref, { strength })

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      style={style}
      onMouseEnter={() => setCursorState(cursorState)}
      onMouseLeave={() => setCursorState('idle')}
    >
      {children}
    </a>
  )
}
