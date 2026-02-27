'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const programs = [
  { id: 'foundation', title: 'Foundation', subtitle: 'Ages 8-16', desc: 'Build fundamentals' },
  { id: 'competitive', title: 'Competitive', subtitle: '16+', desc: 'Tournament training' },
  { id: 'apex', title: 'APEX Squad', subtitle: 'Elite', desc: 'Championship pathway' },
]

export function MobileForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState('')
  
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    if (!containerRef.current) return

    if (isOpen) {
      gsap.fromTo(cardsRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' }
      )
    } else {
      gsap.to(cardsRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2,
      })
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
    if (!formData.name?.trim()) newErrors.name = 'Required'
    if (!formData.email?.trim()) newErrors.email = 'Required'
    if (!selectedProgram) newErrors.program = 'Select a program'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid'
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

  const closeForm = () => {
    setIsOpen(false)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({})
      setSelectedProgram('')
    }, 300)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
          width: '100%',
        }}
      >
        <span>Start Application</span>
        <span style={{
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
    <div ref={containerRef} style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(10, 10, 10, 0.98)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      zIndex: 9999,
      padding: '20px',
      paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
      overflowY: 'auto',
    }}>
      <div style={{
        maxWidth: '100%',
        height: '100%',
        position: 'relative',
      }}>
        <button
          onClick={closeForm}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(238, 236, 229, 0.1)',
            border: 'none',
            color: 'var(--chalk)',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          ×
        </button>

        {isSubmitted ? (
          <div ref={el => { if (el) cardsRef.current[0] = el }} style={{
            background: 'rgba(238, 236, 229, 0.05)',
            borderRadius: '20px',
            border: '1px solid rgba(238, 236, 229, 0.1)',
            padding: '60px 24px',
            textAlign: 'center',
            marginTop: '60px',
          }}>
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
              fontSize: '32px',
              color: 'var(--chalk)',
              marginBottom: '12px',
            }}>
              Welcome to STTA
            </h2>
            <p style={{
              color: 'var(--muted)',
              fontSize: '14px',
              lineHeight: 1.6,
            }}>
              We will be in touch within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginTop: '40px',
          }}>
            {/* Title */}
            <div ref={el => { if (el) cardsRef.current[0] = el }} style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.2) 0%, rgba(255, 107, 53, 0.05) 100%)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 107, 53, 0.2)',
              padding: '24px',
            }}>
              <h2 style={{
                fontFamily: 'var(--f-disp)',
                fontSize: '36px',
                color: 'var(--chalk)',
                marginBottom: '8px',
              }}>
                JOIN <span style={{ color: 'var(--orange)' }}>STTA</span>
              </h2>
              <p style={{
                color: 'var(--muted)',
                fontSize: '14px',
              }}>
                Your journey starts here.
              </p>
            </div>

            {/* Program Selection */}
            <div ref={el => { if (el) cardsRef.current[1] = el }} style={{
              background: 'rgba(238, 236, 229, 0.03)',
              borderRadius: '20px',
              border: '1px solid rgba(238, 236, 229, 0.1)',
              padding: '20px',
            }}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '12px',
              }}>
                Select Program
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {programs.map((prog) => (
                  <button
                    key={prog.id}
                    type="button"
                    onClick={() => setSelectedProgram(prog.id)}
                    style={{
                      background: selectedProgram === prog.id ? 'rgba(255, 107, 53, 0.15)' : 'rgba(238, 236, 229, 0.05)',
                      border: selectedProgram === prog.id ? '1px solid var(--orange)' : '1px solid transparent',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--f-ui)',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: selectedProgram === prog.id ? 'var(--orange)' : 'var(--chalk)',
                    }}>
                      {prog.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      {prog.subtitle} · {prog.desc}
                    </div>
                  </button>
                ))}
              </div>
              {errors.program && (
                <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '8px' }}>{errors.program}</p>
              )}
            </div>

            {/* Personal Details */}
            <div ref={el => { if (el) cardsRef.current[2] = el }} style={{
              background: 'rgba(238, 236, 229, 0.03)',
              borderRadius: '20px',
              border: '1px solid rgba(238, 236, 229, 0.1)',
              padding: '20px',
            }}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '12px',
              }}>
                Your Details
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                      borderRadius: '10px',
                      color: 'var(--chalk)',
                      fontSize: '16px',
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
                      borderRadius: '10px',
                      color: 'var(--chalk)',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                  />
                  {errors.email && <p style={{ color: '#ff4444', fontSize: '11px', marginTop: '4px' }}>{errors.email}</p>}
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="Phone (optional)"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(238, 236, 229, 0.05)',
                    border: '1px solid rgba(238, 236, 229, 0.1)',
                    borderRadius: '10px',
                    color: 'var(--chalk)',
                    fontSize: '16px',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Level & Message */}
            <div ref={el => { if (el) cardsRef.current[3] = el }} style={{
              background: 'rgba(238, 236, 229, 0.03)',
              borderRadius: '20px',
              border: '1px solid rgba(238, 236, 229, 0.1)',
              padding: '20px',
            }}>
              <select
                name="level"
                value={formData.level || ''}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(238, 236, 229, 0.05)',
                  border: '1px solid rgba(238, 236, 229, 0.1)',
                  borderRadius: '10px',
                  color: 'var(--chalk)',
                  fontSize: '16px',
                  outline: 'none',
                  cursor: 'pointer',
                  marginBottom: '12px',
                }}
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner - New to table tennis</option>
                <option value="Intermediate">Intermediate - Playing 1-2 years</option>
                <option value="Advanced">Advanced - Tournament experience</option>
                <option value="Competitive">Competitive - Regional/National level</option>
              </select>
              
              <textarea
                name="message"
                value={formData.message || ''}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows={2}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(238, 236, 229, 0.05)',
                  border: '1px solid rgba(238, 236, 229, 0.1)',
                  borderRadius: '10px',
                  color: 'var(--chalk)',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'none',
                }}
              />
            </div>

            {/* Submit */}
            <div ref={el => { if (el) cardsRef.current[4] = el }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: isSubmitting ? 'rgba(0,0,0,0.3)' : 'var(--orange)',
                  color: 'var(--ink)',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '18px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  width: '100%',
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <p style={{
                color: 'var(--muted)',
                fontSize: '12px',
                textAlign: 'center',
                marginTop: '10px',
              }}>
                We respond within 48 hours
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
