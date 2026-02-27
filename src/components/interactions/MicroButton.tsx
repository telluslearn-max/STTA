'use client'

import { useRef, ReactNode, CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

interface MicroButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  arrow?: boolean
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

export function MicroButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  arrow = true,
  className = '',
  style,
  onClick,
}: MicroButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  const sizes = {
    sm: { padding: '12px 24px', fontSize: '12px', arrow: '12px' },
    md: { padding: '16px 32px', fontSize: '14px', arrow: '14px' },
    lg: { padding: '20px 44px', fontSize: '15px', arrow: '16px' },
  }

  const variants = {
    primary: { bg: 'var(--chalk)', color: 'var(--ink)', border: 'none', hoverBg: 'var(--orange)', hoverColor: 'var(--ink)' },
    secondary: { bg: 'transparent', color: 'var(--chalk)', border: '1px solid var(--edge)', hoverBg: 'var(--plate)', hoverColor: 'var(--chalk)' },
    ghost: { bg: 'transparent', color: 'var(--muted)', border: '1px solid transparent', hoverBg: 'transparent', hoverColor: 'var(--chalk)' },
  }

  const s = sizes[size]
  const v = variants[variant]

  useGSAP(() => {
    if (!btnRef.current || !arrowRef.current) return

    const btn = btnRef.current
    const arrow = arrowRef.current

    const handleMouseEnter = () => {
      gsap.to(btn, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      })
      if (arrow) {
        gsap.to(arrow, {
          x: 6,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)',
      })
      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        })
      }
    }

    btn.addEventListener('mouseenter', handleMouseEnter)
    btn.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter)
      btn.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { scope: btnRef })

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        background: v.bg,
        color: v.color,
        border: v.border || 'none',
        padding: s.padding,
        borderRadius: variant === 'primary' ? '99px' : '4px',
        fontFamily: 'var(--f-ui)',
        fontSize: s.fontSize,
        fontWeight: 600,
        letterSpacing: '.04em',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s, color 0.3s',
        ...style,
      }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      {arrow && (
        <span 
          ref={arrowRef}
          style={{
            position: 'relative',
            zIndex: 1,
            width: s.arrow,
            height: s.arrow,
            borderRadius: '50%',
            background: variant === 'primary' ? 'var(--orange)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: parseInt(s.arrow) - 2 + 'px',
          }}
        >
          →
        </span>
      )}
    </button>
  )
}
