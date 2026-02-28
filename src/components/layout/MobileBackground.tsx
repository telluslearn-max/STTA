'use client'

import { useDevice } from '@/hooks/useDevice'

export function MobileBackground() {
  const { isPhone, isHydrated } = useDevice()

  if (!isHydrated || !isPhone) return null

  return (
    <>
      <div className="m-gradient-orbs">
        <div className="m-orb m-orb-1" />
        <div className="m-orb m-orb-2" />
        <div className="m-orb m-orb-3" />
      </div>
      <div className="m-grain-overlay" />
    </>
  )
}
