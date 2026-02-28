'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PortalNav } from '@/components/portal/PortalNav'
import { PortalBottomNav } from '@/components/portal/PortalBottomNav'
import { PortalMoreMenu } from '@/components/portal/PortalMoreMenu'
import { useDevice } from '@/core/hooks/useDevice'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isPhone, isHydrated } = useDevice()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = localStorage.getItem('portal_user')
        if (!user) {
          router.push('/login')
          return
        }
        const userData = JSON.parse(user)
        if (!userData.isLoggedIn) {
          router.push('/login')
          return
        }
        setIsAuthorized(true)
      } catch {
        router.push('/login')
      } finally {
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [router])

  if (isChecking) {
    return (
      <main style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          border: '2px solid rgba(238, 236, 229, 0.2)',
          borderTopColor: 'var(--orange)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <>
      {isPhone && isHydrated && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <div className="m-gradient-orbs">
            <div className="m-orb m-orb-1" />
            <div className="m-orb m-orb-2" />
            <div className="m-orb m-orb-3" />
          </div>
          <div className="m-grain-overlay" />
        </div>
      )}
      <PortalNav />
      <main style={{
        minHeight: '100vh',
        background: isPhone && isHydrated ? 'transparent' : '#0a0a0a',
        paddingTop: isPhone && isHydrated ? '80px' : '64px',
        paddingBottom: isPhone && isHydrated ? '100px' : '0',
        position: 'relative',
        zIndex: 1,
      }}>
        {children}
      </main>
      {isPhone && isHydrated && (
        <PortalBottomNav onMoreClick={() => setMoreMenuOpen(true)} />
      )}
      <PortalMoreMenu 
        isOpen={moreMenuOpen} 
        onClose={() => setMoreMenuOpen(false)} 
      />
    </>
  )
}
