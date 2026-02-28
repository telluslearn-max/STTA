'use client'

import { useEffect, useState } from 'react'
import { useDevice } from '@/hooks/useDevice'
import { gsap } from '@/lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function ScrollProgress() {
  const { isPhone, isHydrated } = useDevice()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isHydrated || !isPhone) return

    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.to('.m-scroll-progress-bar', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          setProgress(self.progress)
        }
      }
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [isPhone, isHydrated])

  if (!isHydrated || !isPhone) return null

  return (
    <div className="m-scroll-progress">
      <div 
        className="m-scroll-progress-bar" 
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
