'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea'
  placeholder?: string
  options?: string[]
  required?: boolean
}

const formFields: FormField[] = [
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+254 XXX XXX XXX', required: false },
  { name: 'program', label: 'Program Interest', type: 'select', required: true, options: ['Foundation (Ages 8-16)', 'Competitive (16+)', 'APEX Squad (Elite)'] },
  { name: 'level', label: 'Current Playing Level', type: 'select', required: true, options: ['Beginner', 'Intermediate', 'Advanced', 'Competitive'] },
  { name: 'message', label: 'Tell Us About Yourself', type: 'textarea', placeholder: 'Describe your training goals, current experience, or any questions...', required: false },
]

export function MobileForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!modalRef.current) return

    if (isOpen) {
      gsap.fromTo(modalRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      )
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    formFields.forEach(field => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`
      }
      if (field.type === 'email' && formData[field.name] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name])) {
        newErrors[field.name] = 'Please enter a valid email'
      }
    })
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

  const closeModal = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => {
        setIsOpen(false)
        setIsSubmitted(false)
        setFormData({})
      }
    })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          background: 'var(--chalk)',
          color: 'var(--ink)',
          border: 'none',
          padding: '16px 32px',
          borderRadius: '99px',
          fontFamily: 'var(--f-ui)',
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '.04em',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <span style={{ position: 'relative', zIndex: 1 }}>Start Application</span>
        <span style={{
          position: 'relative',
          zIndex: 1,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'var(--orange)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
        }}>→</span>
      </button>
    )
  }

  return (
    <div 
      ref={modalRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '0',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
      }}
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div 
        ref={contentRef}
        style={{
          background: 'var(--plate)',
          borderRadius: '24px 24px 0 0',
          padding: '20px',
          maxWidth: '100%',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          border: 'none',
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'var(--muted)',
            fontSize: '28px',
            cursor: 'pointer',
            padding: '12px',
            lineHeight: 1,
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ×
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
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
            <h3 style={{
              fontFamily: 'var(--f-disp)',
              fontSize: '28px',
              color: 'var(--chalk)',
              marginBottom: '12px',
            }}>
              Application Received
            </h3>
            <p style={{
              color: 'var(--muted)',
              fontSize: '14px',
              lineHeight: 1.6,
            }}>
              We will be in touch within 48 hours.
            </p>
          </div>
        ) : (
          <>
            <h2 style={{
              fontFamily: 'var(--f-disp)',
              fontSize: '28px',
              color: 'var(--chalk)',
              marginBottom: '8px',
            }}>
              Join APEX
            </h2>
            <p style={{
              color: 'var(--muted)',
              fontSize: '14px',
              marginBottom: '24px',
            }}>
              Take the first step.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formFields.map((field) => (
                <div key={field.name}>
                  <label style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'var(--chalk)',
                    marginBottom: '8px',
                  }}>
                    {field.label} {field.required && <span style={{ color: 'var(--orange)' }}>*</span>}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: 'var(--ink)',
                        border: errors[field.name] ? '1px solid #ff4444' : '1px solid var(--edge)',
                        borderRadius: '6px',
                        color: 'var(--chalk)',
                        fontSize: '16px',
                        fontFamily: 'var(--f-ui)',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="">Select</option>
                      {field.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: 'var(--ink)',
                        border: errors[field.name] ? '1px solid #ff4444' : '1px solid var(--edge)',
                        borderRadius: '6px',
                        color: 'var(--chalk)',
                        fontSize: '16px',
                        fontFamily: 'var(--f-ui)',
                        outline: 'none',
                        resize: 'vertical',
                        minHeight: '100px',
                      }}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: 'var(--ink)',
                        border: errors[field.name] ? '1px solid #ff4444' : '1px solid var(--edge)',
                        borderRadius: '6px',
                        color: 'var(--chalk)',
                        fontSize: '16px',
                        fontFamily: 'var(--f-ui)',
                        outline: 'none',
                      }}
                    />
                  )}
                  
                  {errors[field.name] && (
                    <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '6px' }}>
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginTop: '8px',
                  padding: '18px 24px',
                  background: isSubmitting ? 'var(--muted)' : 'var(--orange)',
                  color: 'var(--ink)',
                  border: 'none',
                  borderRadius: '99px',
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '.04em',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  width: '100%',
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </>
        )}
      </div>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
