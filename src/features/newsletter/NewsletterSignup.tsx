'use client'

import { useState } from 'react'

interface NewsletterSignupProps {
  title?: string
  subtitle?: string
  placeholder?: string
  buttonText?: string
}

export function NewsletterSignup({
  title = 'Stay in the Loop',
  subtitle = 'Get the latest updates on tournaments, training schedules, and academy news.',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStatus('success')
      setMessage('Thanks for subscribing! Check your inbox soon.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section style={{
      padding: '80px 24px',
      background: 'var(--surface)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '560px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <h2 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: 'clamp(28px, 5vw, 40px)',
          color: 'var(--chalk)',
          marginBottom: '16px',
          letterSpacing: '0.02em',
        }}>
          {title}
        </h2>
        <p style={{
          fontFamily: 'var(--f-ui)',
          fontSize: '15px',
          color: 'rgba(238, 236, 229, 0.6)',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}>
          {subtitle}
        </p>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          gap: '12px',
          maxWidth: '420px',
          margin: '0 auto',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'error') setStatus('idle')
            }}
            placeholder={placeholder}
            disabled={status === 'loading' || status === 'success'}
            style={{
              flex: '1 1 200px',
              padding: '14px 20px',
              background: 'rgba(238, 236, 229, 0.05)',
              border: '1px solid rgba(238, 236, 229, 0.15)',
              borderRadius: '8px',
              color: 'var(--chalk)',
              fontSize: '14px',
              fontFamily: 'var(--f-ui)',
              outline: 'none',
              transition: 'border-color 0.3s, background 0.3s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--orange)'
              e.target.style.background = 'rgba(238, 236, 229, 0.08)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(238, 236, 229, 0.15)'
              e.target.style.background = 'rgba(238, 236, 229, 0.05)'
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            style={{
              padding: '14px 28px',
              background: status === 'success' ? '#22c55e' : 'var(--orange)',
              border: 'none',
              borderRadius: '8px',
              color: status === 'success' ? 'white' : 'var(--ink)',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'var(--f-ui)',
              cursor: status === 'loading' ? 'wait' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              transition: 'transform 0.2s, background 0.3s',
              minWidth: '120px',
            }}
            onMouseEnter={(e) => {
              if (status !== 'loading' && status !== 'success') {
                e.currentTarget.style.transform = 'scale(1.02)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {status === 'loading' ? 'Subscribing...' : buttonText}
          </button>
        </form>

        {message && (
          <p style={{
            marginTop: '16px',
            fontSize: '13px',
            color: status === 'error' ? '#ef4444' : '#22c55e',
            fontFamily: 'var(--f-ui)',
          }}>
            {message}
          </p>
        )}

        <p style={{
          marginTop: '20px',
          fontSize: '11px',
          color: 'rgba(238, 236, 229, 0.35)',
          fontFamily: 'var(--f-ui)',
        }}>
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </section>
  )
}
