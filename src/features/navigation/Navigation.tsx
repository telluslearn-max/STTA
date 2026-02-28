'use client'

import { useDevice } from '@/core/hooks/useDevice'
import { DesktopNav } from './DesktopNav'
import { TabletNav } from './TabletNav'
import { MobileNav } from './MobileNav'

export function Navigation() {
  const { isPhone, isTablet, isHydrated } = useDevice()

  if (!isHydrated) return null

  if (isPhone) return <MobileNav />
  if (isTablet) return <TabletNav />
  return <DesktopNav />
}
