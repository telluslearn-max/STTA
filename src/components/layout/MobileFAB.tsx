'use client'

import { useDevice } from '@/core/hooks/useDevice'
import Link from 'next/link'

const ApplyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export function MobileFAB() {
  const { isPhone, isHydrated } = useDevice()

  if (!isHydrated || !isPhone) return null

  return (
    <Link href="/apply" style={{
      position: 'fixed',
      bottom: '100px',
      right: '24px',
      width: '60px',
      height: '60px',
      borderRadius: '30px',
      background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
      boxShadow: '0 8px 32px rgba(255, 107, 53, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9998,
      textDecoration: 'none',
      color: '#000000',
    }}>
      <ApplyIcon />
    </Link>
  )
}
