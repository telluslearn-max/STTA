'use client'

import { useEffect } from 'react'
import { registerGSAP } from '../lib/gsap'

interface GSAPProviderProps {
  children: React.ReactNode
}

export function GSAPProvider({ children }: GSAPProviderProps) {
  useEffect(() => {
    registerGSAP()
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[GSAPProvider] Initialized')
    }
  }, [])

  return <>{children}</>
}
