'use client'

import { createContext, useContext, useCallback, ReactNode } from 'react'
import { useCursor, CursorState } from '@/hooks/useCursor'

interface CursorContextType {
  setCursorState: (state: CursorState) => void
  position: { x: number; y: number }
  isVisible: boolean
}

const CursorContext = createContext<CursorContextType | null>(null)

export function useCursorState() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursorState must be used within CursorProvider')
  }
  return context
}

interface CursorProviderProps {
  children: ReactNode
}

export function CursorProvider({ children }: CursorProviderProps) {
  const { state, setState, position, isVisible } = useCursor()

  const setCursorState = useCallback((newState: CursorState) => {
    setState(newState)
  }, [setState])

  return (
    <CursorContext.Provider value={{ setCursorState, position, isVisible }}>
      {children}
      <div
        id="cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'exclusion',
        }}
      >
        <div
          id="cursor-ball"
          style={{
            width: '12px',
            height: '12px',
            background: 'var(--chalk)',
            borderRadius: '50%',
            position: 'absolute',
            transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
            transition: 'width 0.45s cubic-bezier(0.17, 0.67, 0.35, 1.2), height 0.45s cubic-bezier(0.17, 0.67, 0.35, 1.2), border-radius 0.4s ease, background 0.3s ease',
            ...(state === 'link' && { width: '44px', height: '44px' }),
            ...(state === 'btn' && { width: '64px', height: '64px', borderRadius: '4px' }),
            ...(state === 'card' && { width: '80px', height: '28px', borderRadius: '3px' }),
            ...(state === 'text' && { width: '2px', height: '28px', borderRadius: '1px', background: 'var(--orange)' }),
          }}
        />
      </div>
    </CursorContext.Provider>
  )
}
