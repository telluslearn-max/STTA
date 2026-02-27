'use client'

import { useRef } from 'react'
import { useDevice } from '@/core/hooks/useDevice'
import { DesktopJoin } from './DesktopJoin'
import { MobileJoin } from './MobileJoin'

export function Join() {
  const { isMobile, isHydrated } = useDevice()

  if (!isHydrated) return null

  return isMobile ? <MobileJoin /> : <DesktopJoin />
}
