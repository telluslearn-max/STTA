'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function registerGSAP() {
  if (typeof window === 'undefined') return
  
  gsap.registerPlugin(ScrollTrigger)
  
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  })

  ScrollTrigger.config({
    ignoreMobileResize: true,
  })

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    gsap.globalTimeline.timeScale(100)
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[GSAP] Registered successfully')
    console.log('[GSAP] ScrollTrigger version:', ScrollTrigger.version)
  }
}

export { gsap, ScrollTrigger }
export default gsap
