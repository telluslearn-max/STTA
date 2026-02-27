'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const programs = [
  { id: 'foundation', title: 'Foundation', subtitle: 'Ages 8-16', desc: 'Build fundamentals' },
  { id: 'competitive', title: 'Competitive', subtitle: '16+', desc: 'Tournament training' },
  { id: 'apex', title: 'APEX Squad', subtitle: 'Elite', desc: 'Championship pathway' },
]

export function DesktopForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState('')
  
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name?.trim()) newErrors.name = 'Required'
    if (!formData.email?.trim()) newErrors.email = 'Required'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!selectedProgram) newErrors.program = 'Select a program'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div ref={containerRef} style={{
      background: '#0a0a0a',
      borderRadius: '16px',
      border: '1px solid rgba(238, 236, 229, 0.1)',
      width: '100%',
      maxWidth: '520px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {isSubmitted ? (
        <div style={{ padding: '60px 40px', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            margin: '0 auto 24px',
          }}>
            ✓
          </div>
          <h2 style={{
            fontFamily: 'var(--f-disp)',
            fontSize: '28px',
            color: 'var(--chalk)',
            marginBottom: '12px',
          }}>
            Application Received
          </h2>
          <p style={{ color: 'rgba(238, 236, 229, 0.6)', fontSize: '14px' }}>
            We will be in touch within 48 hours.
          </p>
          <Link href="/" style={{
            display: 'inline-block',
            marginTop: '24px',
            color: 'var(--orange)',
            textDecoration: 'none',
            fontSize: '14px',
          }}>
            ← Back to Home
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ padding: '40px' }}>
          <h2 style={{
            fontFamily: 'var(--f-disp)',
            fontSize: '28px',
            color: 'var(--chalk)',
            marginBottom: '8px',
          }}>
            Join STTA
          </h2>
          <p style={{ color: 'rgba(238, 236, 229, 0.6)', fontSize: '13px', marginBottom: '28px' }}>
            Complete the form below to begin your journey.
          </p>

          {/* Program Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(238, 236, 229, 0.5)', marginBottom: '10px' }}>
              Select Program *
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {programs.map((prog) => (
                <button
                  key={prog.id}
                  type="button"
                  onClick={() => setSelectedProgram(prog.id)}
                  style={{
                    flex: 1,
                    background: selectedProgram === prog.id ? 'rgba(255, 107, 53, 0.15)' : 'rgba(238, 236, 229, 0.05)',
                    border: selectedProgram === prog.id ? '1px solid var(--orange)' : '1px solid rgba(238, 236, 229, 0.1)',
                    borderRadius: '8px',
                    padding: '12px 8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 600, color: selectedProgram === prog.id ? 'var(--orange)' : 'var(--chalk)' }}>
                    {prog.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(238, 236, 229, 0.5)', marginTop: '2px' }}>
                    {prog.subtitle}
                  </div>
                </button>
              ))}
            </div>
            {errors.program && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '8px' }}>{errors.program}</p>}
          </div>

          {/* Personal Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Full Name *"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(238, 236, 229, 0.05)',
                  border: errors.name ? '1px solid #ff4444' : '1px solid rgba(238, 236, 229, 0.1)',
                  borderRadius: '8px',
                  color: 'var(--chalk)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              {errors.name && <p style={{ color: '#ff4444', fontSize: '11px', marginTop: '4px' }}>{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Email *"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(238, 236, 229, 0.05)',
                  border: errors.email ? '1px solid #ff4444' : '1px solid rgba(238, 236, 229, 0.1)',
                  borderRadius: '8px',
                  color: 'var(--chalk)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              {errors.email && <p style={{ color: '#ff4444', fontSize: '11px', marginTop: '4px' }}>{errors.email}</p>}
            </div>
          </div>

          {/* Phone & Level */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="Phone"
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
            <select
              name="level"
              value={formData.level || ''}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(238, 236, 229, 0.05)',
                border: '1px solid rgba(238, 236, 229, 0.1)',
                borderRadius: '8px',
                color: formData.level ? 'var(--chalk)' : 'rgba(238, 236, 229, 0.5)',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="" style={{ color: 'rgba(238, 236, 229, 0.5)' }}>Select Level</option>
              <option value="Beginner" style={{ background: '#0a0a0a', color: 'var(--chalk)' }}>Beginner - New to table tennis</option>
              <option value="Intermediate" style={{ background: '#0a0a0a', color: 'var(--chalk)' }}>Intermediate - Playing 1-2 years</option>
              <option value="Advanced" style={{ background: '#0a0a0a', color: 'var(--chalk)' }}>Advanced - Tournament experience</option>
              <option value="Competitive" style={{ background: '#0a0a0a', color: 'var(--chalk)' }}>Competitive - Regional/National level</option>
            </select>
          </div>

          {/* Message */}
          <textarea
            name="message"
            value={formData.message || ''}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            rows={3}
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'rgba(238, 236, 229, 0.05)',
              border: '1px solid rgba(238, 236, 229, 0.1)',
              borderRadius: '8px',
              color: 'var(--chalk)',
              fontSize: '14px',
              outline: 'none',
              resize: 'none',
              marginBottom: '24px',
            }}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '16px',
              background: isSubmitting ? 'rgba(238, 236, 229, 0.3)' : 'var(--chalk)',
              color: 'var(--ink)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      )}
    </div>
  )
}
