'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Mock authentication - replace with Supabase later
    if (email && password) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store mock session
      localStorage.setItem('portal_user', JSON.stringify({
        email,
        name: email.split('@')[0],
        isLoggedIn: true
      }))
      
      router.push('/portal')
    } else {
      setError('Please enter email and password')
    }
    
    setIsLoading(false)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px 40px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
      }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(238, 236, 229, 0.5)',
          textDecoration: 'none',
          fontSize: '13px',
          marginBottom: '40px',
        }}>
          ← Back to Home
        </Link>

        <div style={{
          background: '#0a0a0a',
          borderRadius: '16px',
          border: '1px solid rgba(238, 236, 229, 0.1)',
          padding: '40px',
        }}>
          <h1 style={{
            fontFamily: 'var(--f-disp)',
            fontSize: '28px',
            color: 'var(--chalk)',
            marginBottom: '8px',
          }}>
            Member Login
          </h1>
          <p style={{
            color: 'rgba(238, 236, 229, 0.5)',
            fontSize: '14px',
            marginBottom: '32px',
          }}>
            Access your STTA member portal
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && (
              <div style={{
                padding: '12px 16px',
                background: 'rgba(255, 68, 68, 0.1)',
                border: '1px solid rgba(255, 68, 68, 0.3)',
                borderRadius: '8px',
                color: '#ff4444',
                fontSize: '13px',
              }}>
                {error}
              </div>
            )}

            <div>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'rgba(238, 236, 229, 0.5)',
                marginBottom: '8px',
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(238, 236, 229, 0.05)',
                  border: '1px solid rgba(238, 236, 229, 0.1)',
                  borderRadius: '8px',
                  color: 'var(--chalk)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'rgba(238, 236, 229, 0.5)',
                marginBottom: '8px',
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(238, 236, 229, 0.05)',
                  border: '1px solid rgba(238, 236, 229, 0.1)',
                  borderRadius: '8px',
                  color: 'var(--chalk)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '16px',
                background: isLoading ? 'rgba(238, 236, 229, 0.3)' : 'var(--chalk)',
                color: 'var(--ink)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                marginTop: '8px',
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{
            color: 'rgba(238, 236, 229, 0.4)',
            fontSize: '12px',
            textAlign: 'center',
            marginTop: '24px',
          }}>
            Contact STTA for member access credentials
          </p>
        </div>
      </div>
    </main>
  )
}
