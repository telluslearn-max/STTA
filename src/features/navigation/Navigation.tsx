'use client'

import { useDevice } from '@/core/hooks/useDevice'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

export function Navigation() {
  const { isMobile, isHydrated } = useDevice()

  if (!isHydrated) return null

  return isMobile ? <MobileNav /> : <DesktopNav />
}
