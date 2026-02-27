'use client'

import { useEffect, useState } from 'react'
import { registerGSAP } from '@/lib/gsap'

interface GSAPProviderProps {
  children: React.ReactNode
}

export function GSAPProvider({ children }: GSAPProviderProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    registerGSAP()
    setIsReady(true)
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[GSAPProvider] Initialized')
    }
  }, [])

  return <>{children}</>
}
