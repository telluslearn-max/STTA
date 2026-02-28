'use client'

import { useDevice } from '@/hooks/useDevice'

interface MobileFABProps {
  onClick?: () => void
}

export function MobileFAB({ onClick }: MobileFABProps) {
  const { isPhone, isHydrated } = useDevice()

  if (!isHydrated || !isPhone) return null

  return (
    <button className="m-fab" onClick={onClick}>
      +
    </button>
  )
}
