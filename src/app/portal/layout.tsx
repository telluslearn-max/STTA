'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PortalNav } from '@/components/portal/PortalNav'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

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
      <PortalNav />
      <main style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        paddingTop: '64px',
      }}>
        {children}
      </main>
    </>
  )
}
