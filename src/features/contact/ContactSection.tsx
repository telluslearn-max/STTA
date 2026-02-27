'use client'

import { useState } from 'react'

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" style={{
      padding: '120px 48px',
      background: '#0a0a0a',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontFamily: 'var(--f-disp)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            color: 'var(--chalk)',
            marginBottom: '16px',
            lineHeight: 1.1,
          }}>
            Get in <span style={{ color: 'var(--orange)' }}>Touch</span>
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'rgba(238, 236, 229, 0.5)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px',
        }}>
          
          {/* Contact Info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>
            
            {/* Phone */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '20px',
              background: 'rgba(238, 236, 229, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(238, 236, 229, 0.1)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 107, 53, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--orange)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'rgba(238, 236, 229, 0.5)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phone</p>
                <a href="tel:+254700000000" style={{ fontSize: '15px', color: 'var(--chalk)', textDecoration: 'none' }}>+254 700 000 000</a>
              </div>
            </div>

            {/* Email */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '20px',
              background: 'rgba(238, 236, 229, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(238, 236, 229, 0.1)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 107, 53, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--orange)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'rgba(238, 236, 229, 0.5)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</p>
                <a href="mailto:apex@stteresa.edu" style={{ fontSize: '15px', color: 'var(--chalk)', textDecoration: 'none' }}>apex@stteresa.edu</a>
              </div>
            </div>

            {/* Address */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '20px',
              background: 'rgba(238, 236, 229, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(238, 236, 229, 0.1)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 107, 53, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--orange)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'rgba(238, 236, 229, 0.5)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</p>
                <p style={{ fontSize: '15px', color: 'var(--chalk)' }}>St. Teresa's School<br />Nairobi, Kenya</p>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '16px 24px',
                background: '#25D366',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255.463-2.39 1.475-.883.788-1.604 1.766-1.786 2.063-.173.297-.018.458.13.581.15.123.298.347.446.521.151.174.298.298.413.396.149.149.285.347.446.521.148.134.298.298.596.446.149.149.297.298.595.446.074.037.148.074.223.112.089.044.178.089.267.134.298.149.596.298.893.446.149.074.297.149.446.223.198.099.396.148.595.149.297-.015 1.758-.867 2.03-.967.448-.149.793-.297 1.063-.595.149-.149.223-.347.297-.595.149-.297.149-.595 0-.892-.148-.297-.267-.595-.446-.892l-.744-1.488c-.297-.595-.595-1.193-.892-1.79-.074-.149-.149-.223-.223-.297-.297-.149-.595-.223-.892-.223m-5.592 6.445c-.149.074-.347.149-.595.223-.297.074-.595.149-.892.223-.297.074-.595.149-.892.149-.297 0-.595-.074-.892-.223-.297-.149-.595-.297-.892-.595-.297-.297-.595-.595-.892-.892-.149-.149-.223-.297-.297-.446-.074-.148-.149-.297-.074-.595 0-.595.149-1.193.372-1.79.223-.596.595-1.193 1.063-1.79.595-.743 1.193-1.34 1.715-1.79.149-.149.297-.297.371-.446l.074-.223c.074-.149.149-.297.223-.446.149-.149.223-.371.149-.595 0-.297-.074-.595-.223-.892-.149-.297-.595-.892-1.193-1.34-.595-.447-1.193-.892-1.715-1.193-.595-.297-1.193-.446-1.715-.595-.521-.149-1.34-.223-2.03-.074-.595.149-1.193.446-1.715.892-.595.595-1.063 1.193-1.34 1.987-.074.223-.149.595-.074.892 0 .297.074.595.223.892.149.297.595 1.063 1.34 1.34.743.297 1.34.595 1.987.892.595.297 1.063.595 1.34 1.063.149.223.223.595.149.892-.074.297-.371.892-.817 1.487z"/>
              </svg>
              Chat on WhatsApp
            </a>

            {/* Map */}
            <div style={{
              height: '200px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(238, 236, 229, 0.1)',
            }}>
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src="https://www.openstreetmap.org/export/embed.html?bbox=36.78%2C-1.30%2c36.82%2c-1.26&layer=mapnik&marker=-1.285%2C36.802"
                loading="lazy"
                title="STTA Location - Nairobi"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: 'rgba(238, 236, 229, 0.03)',
            border: '1px solid rgba(238, 236, 229, 0.1)',
            borderRadius: '16px',
            padding: '32px',
          }}>
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
                <h3 style={{ fontFamily: 'var(--f-disp)', fontSize: '24px', color: 'var(--chalk)', marginBottom: '12px' }}>
                  Message Sent!
                </h3>
                <p style={{ color: 'rgba(238, 236, 229, 0.6)', fontSize: '14px' }}>
                  We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    marginTop: '24px',
                    padding: '12px 24px',
                    background: 'transparent',
                    border: '1px solid rgba(238, 236, 229, 0.2)',
                    borderRadius: '8px',
                    color: 'var(--chalk)',
                    cursor: 'pointer',
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontFamily: 'var(--f-disp)', fontSize: '22px', color: 'var(--chalk)', marginBottom: '8px' }}>
                  Send us a Message
                </h3>
                
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'rgba(238, 236, 229, 0.05)',
                      border: errors.name ? '1px solid #ff4444' : '1px solid rgba(238, 236, 229, 0.1)',
                      borderRadius: '8px',
                      color: 'var(--chalk)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  {errors.name && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '6px' }}>{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'rgba(238, 236, 229, 0.05)',
                      border: errors.email ? '1px solid #ff4444' : '1px solid rgba(238, 236, 229, 0.1)',
                      borderRadius: '8px',
                      color: 'var(--chalk)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                  {errors.email && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '6px' }}>{errors.email}</p>}
                </div>

                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'rgba(238, 236, 229, 0.05)',
                      border: errors.message ? '1px solid #ff4444' : '1px solid rgba(238, 236, 229, 0.1)',
                      borderRadius: '8px',
                      color: 'var(--chalk)',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                  {errors.message && <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '6px' }}>{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
