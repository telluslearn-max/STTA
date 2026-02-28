'use client'

import { useState, useEffect } from 'react'
import { useDevice } from '@/hooks/useDevice'

export function LoadingScreen() {
  const { isPhone, isHydrated } = useDevice()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!isHydrated || !isPhone) return

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [isPhone, isHydrated])

  if (!isHydrated || !isPhone) return null
  if (!isVisible) return null

  return (
    <div className="m-loading-screen">
      <div className="m-loading-logo">
        ST<span className="m-logo-dot">.</span>TERESA'S
      </div>
    </div>
  )
}
