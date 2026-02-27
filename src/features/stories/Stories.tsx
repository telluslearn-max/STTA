'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/core/lib/gsap'
import { useImageFollow } from '@/core/hooks/useImageFollow'
import { useCardTilt } from '@/core/hooks/useCardTilt'

gsap.registerPlugin(ScrollTrigger)

const posts = [
  {
    category: 'Championship',
    title: 'Inside the Q2 Nairobi Open: A Match-by-Match Breakdown',
    excerpt: 'We embedded with the squad for three days. Footwork, nerves, and one point that changed everything in the semifinal.',
    date: '14 Jul 2025 · 8 min',
    gradient: 'linear-gradient(160deg, #00050e, #001a66 50%, #003FD4 80%, #4488ff)',
  },
  {
    category: 'Mental Game',
    title: 'What Elite TT Players Do Differently Under Pressure',
    excerpt: "Sports psychologist Dr. Aisha Njeru breaks down the cognitive edge separating finalists from champions.",
    date: '30 Jun 2025 · 5 min',
    gradient: 'linear-gradient(160deg, #080800, #332200 50%, #996600 80%, #ffcc00)',
  },
  {
    category: 'Community',
    title: 'From Eastlands to the National Stage',
    excerpt: "How St. Teresa's grassroots program turned three local kids into national prospects in under eighteen months.",
    date: '5 Jun 2025 · 4 min',
    gradient: 'linear-gradient(160deg, #050008, #1a0033 50%, #5500aa 80%, #bb44ff)',
  },
]

function BlogCard({ post }: { post: typeof posts[0] }) {
  const imgRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  
  useImageFollow(imgRef, containerRef, { strength: { x: 14, y: 10 } })
  useCardTilt(cardRef, { maxRotation: 5 })

  return (
    <div ref={cardRef} className="blog-card reveal" style={{
      background: 'var(--plate)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transformStyle: 'preserve-3d',
    }}>
      <div ref={containerRef} style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '16/9',
        background: 'var(--ink)',
      }}>
        <div ref={imgRef} style={{
          position: 'absolute',
          inset: '-8%',
          width: '116%',
          height: '116%',
          background: post.gradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }} />
        <span style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          background: 'rgba(10,10,10,.75)',
          backdropFilter: 'blur(6px)',
          fontSize: '8px',
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          color: 'var(--chalk)',
          padding: '5px 10px',
          borderRadius: '99px',
          border: '1px solid rgba(238,236,229,.1)',
          zIndex: 2,
        }}>
          {post.category}
        </span>
      </div>
      <div style={{
        padding: '24px 24px 20px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h4 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: 'clamp(18px, 2vw, 24px)',
          letterSpacing: '.02em',
          lineHeight: 1.1,
          color: 'var(--chalk)',
          marginBottom: '10px',
          flex: 1,
        }}>
          {post.title}
        </h4>
        <p style={{
          fontSize: '11px',
          lineHeight: 1.75,
          color: 'var(--muted)',
          marginBottom: '20px',
        }}>
          {post.excerpt}
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: '1px solid var(--edge)',
        }}>
          <span style={{
            fontSize: '9px',
            letterSpacing: '.15em',
            color: 'var(--muted)',
          }}>{post.date}</span>
          <a href="#" style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid var(--edge)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: 'var(--muted)',
            textDecoration: 'none',
            transition: 'background 0.3s, border-color 0.3s, color 0.3s, transform 0.4s cubic-bezier(.17,.67,.35,1.2)',
          }}>→</a>
        </div>
      </div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0%',
        height: '2px',
        background: 'var(--orange)',
        transition: 'width 0.5s cubic-bezier(.77,0,.175,1)',
      }} className="blog-card-progress" />
    </div>
  )
}

export function Blog() {
  const sectionRef = useRef<HTMLElement>(null)
  const featuredImgRef = useRef<HTMLDivElement>(null)
  const featuredContainerRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)

  useImageFollow(featuredImgRef, featuredContainerRef, { strength: { x: 22, y: 16 } })
  useCardTilt(featuredRef, { maxRotation: 4 })

  useGSAP(() => {
    if (!sectionRef.current) return

    console.log('[Blog] Setting up ScrollTrigger')

    const featured = sectionRef.current.querySelector('.blog-featured')
    const cards = sectionRef.current.querySelectorAll('.blog-card')
    console.log('[Blog] Found elements - featured:', !!featured, 'cards:', cards.length)

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        console.log('[Blog] ScrollTrigger fired!')
        if (featured) {
          gsap.from(featured, {
            opacity: 0,
            y: 50,
            duration: 0.7,
            ease: 'power3.out',
          })
        }
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.15,
        })
      },
    })
  }, { scope: sectionRef })

  return (
    <section id="blog" ref={sectionRef} style={{
      padding: '120px 48px',
      background: 'var(--ink)',
      borderTop: '1px solid var(--edge)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '72px',
      }}>
        <h2 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: 'clamp(48px, 7vw, 100px)',
          letterSpacing: '.02em',
          lineHeight: 0.92,
        }}>
          FAST-BREAK<br />
          <span style={{ color: 'var(--orange)' }}>STORIES</span>
        </h2>
        <a href="#" style={{
          fontFamily: 'var(--f-ui)',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingBottom: '6px',
          position: 'relative',
          transition: 'color 0.3s',
        }}>
          <span>All Stories</span>
          <div style={{
            width: '32px',
            height: '32px',
            border: '1px solid var(--edge)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            transition: 'background 0.3s, border-color 0.3s, transform 0.4s cubic-bezier(.17,.67,.35,1.2)',
          }} className="arrow-circle">→</div>
        </a>
      </div>

      {/* Featured Post */}
      <div ref={featuredRef} className="blog-featured reveal" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2px',
        marginBottom: '2px',
        position: 'relative',
        transformStyle: 'preserve-3d',
      }}>
        <div ref={featuredContainerRef} style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '4/3',
          background: 'var(--plate)',
        }}>
          <div ref={featuredImgRef} style={{
            position: 'absolute',
            inset: '-12%',
            width: '124%',
            height: '124%',
            background: 'linear-gradient(135deg, #0d0300 0%, #3a1200 35%, var(--orange) 70%, #ff8844 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform',
          }} />
        </div>
        <div style={{
          background: 'var(--plate)',
          padding: '48px 44px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
            }}>
              <span style={{
                fontSize: '9px',
                letterSpacing: '.28em',
                textTransform: 'uppercase',
                color: 'var(--orange)',
              }}>● Featured · Technique</span>
              <span style={{
                fontFamily: 'var(--f-disp)',
                fontSize: '13px',
                letterSpacing: '.1em',
                color: 'var(--muted)',
              }}>01 / 04</span>
            </div>
            <h3 style={{
              fontFamily: 'var(--f-disp)',
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              letterSpacing: '.01em',
              lineHeight: 1.0,
              color: 'var(--chalk)',
              marginBottom: '24px',
            }}>
              <span style={{ display: 'inline-block' }}>The</span>{' '}
              <span style={{ display: 'inline-block' }}>Penhold</span>{' '}
              <span style={{ display: 'inline-block' }}>Grip</span>{' '}
              <span style={{ display: 'inline-block' }}>Advantage</span>{' '}
              <span style={{ display: 'inline-block' }}>in</span>{' '}
              <span style={{ display: 'inline-block' }}>Modern</span>{' '}
              <span style={{ display: 'inline-block' }}>Play</span>
            </h3>
            <p style={{
              fontSize: '12px',
              lineHeight: 1.85,
              color: 'var(--muted)',
              maxWidth: '380px',
              marginBottom: '40px',
            }}>
              How traditional Asian grip styles are reshaping competitive strategy across East African circuits — and why our Apex squad adopted it in 2023.
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                border: '1px solid #2a2a2a',
                overflow: 'hidden',
                position: 'relative',
              }} data-initials="DM" />
              <div style={{ lineHeight: 1.3 }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'var(--chalk)',
                  fontFamily: 'var(--f-ui)',
                }}>Coach David Mwangi</div>
                <div style={{
                  fontSize: '9px',
                  letterSpacing: '.12em',
                  color: 'var(--muted)',
                }}>28 Jul 2025 · 6 min read</div>
              </div>
            </div>
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--f-ui)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '.06em',
              color: 'var(--chalk)',
              textDecoration: 'none',
              padding: '12px 22px',
              border: '1px solid var(--edge)',
              borderRadius: '99px',
              transition: 'background 0.3s, border-color 0.3s, color 0.3s',
            }}>
              <span>Read Story</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2px',
      }}>
        {posts.map((post, i) => (
          <BlogCard key={i} post={post} />
        ))}
      </div>
    </section>
  )
}
