'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  title?: string
  faqs?: FAQItem[]
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'What age groups do you train?',
    answer: 'We welcome players of all ages, from beginners as young as 5 years old to adults of any skill level. Our programs are tailored to different age groups and skill levels, ensuring everyone gets the appropriate training.',
  },
  {
    question: 'Do I need my own table tennis equipment?',
    answer: 'No, we provide all necessary equipment for training sessions. We have professional tables, balls, and paddles available. However, many players prefer to have their own personal paddle once they commit to regular training.',
  },
  {
    question: 'What is the difference between group and private sessions?',
    answer: 'Group sessions are great for social learning and are more affordable, with 4-8 students per class. Private sessions offer one-on-one coaching for personalized attention and faster progress, tailored specifically to your skill level and goals.',
  },
  {
    question: 'How do I register for a trial session?',
    answer: 'Simply click the "Apply Now" button on our website or visit us during our operating hours. Your first session is free! We recommend wearing comfortable athletic clothing and indoor sports shoes.',
  },
  {
    question: 'What are your operating hours?',
    answer: 'We operate Monday through Saturday, from 6:00 AM to 9:00 PM. Our peak hours are typically 4:00 PM to 8:00 PM on weekdays. We recommend booking in advance to secure your preferred time slot.',
  },
  {
    question: 'Do you offer tournament preparation training?',
    answer: 'Yes! We have specialized tournament prep programs that include match simulation, mental conditioning, and competition tactics. Our coaches have experience preparing players for state, national, and international competitions.',
  },
]

export function FAQAccordion({
  title = 'Frequently Asked Questions',
  faqs = defaultFAQs,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section style={{
      padding: '100px 24px',
      background: 'var(--bg)',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontFamily: 'var(--f-disp)',
          fontSize: 'clamp(32px, 5vw, 48px)',
          color: 'var(--chalk)',
          textAlign: 'center',
          marginBottom: '48px',
          letterSpacing: '0.02em',
        }}>
          {title}
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                style={{
                  background: 'rgba(238, 236, 229, 0.03)',
                  border: '1px solid rgba(238, 236, 229, 0.08)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s',
                }}
              >
                <button
                  onClick={() => toggle(index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--f-ui)',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--chalk)',
                    paddingRight: '16px',
                    lineHeight: 1.4,
                  }}>
                    {faq.question}
                  </span>
                  <span style={{
                    flexShrink: 0,
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--orange)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? '300px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease, padding 0.3s ease',
                  }}
                >
                  <p style={{
                    padding: '0 24px 20px',
                    fontFamily: 'var(--f-ui)',
                    fontSize: '14px',
                    lineHeight: 1.7,
                    color: 'rgba(238, 236, 229, 0.6)',
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '40px',
          fontSize: '14px',
          color: 'rgba(238, 236, 229, 0.5)',
          fontFamily: 'var(--f-ui)',
        }}>
          Still have questions? <a href="mailto:apex@stteresas.edu" style={{ color: 'var(--orange)', textDecoration: 'none' }}>Contact us</a>
        </p>
      </div>
    </section>
  )
}
