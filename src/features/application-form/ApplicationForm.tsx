'use client'

import { useDevice } from '@/core/hooks/useDevice'
import { DesktopForm } from './DesktopForm'
import { MobileForm } from './MobileForm'

export function ApplicationForm() {
  const { isMobile, isHydrated } = useDevice()

  if (!isHydrated) return null

  return isMobile ? <MobileForm /> : <DesktopForm />
}
