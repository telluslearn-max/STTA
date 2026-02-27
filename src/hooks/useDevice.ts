'use client'

import { useState, useEffect, useCallback } from 'react'

export interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouch: boolean
  os: 'ios' | 'android' | 'other'
  browser: 'safari' | 'chrome' | 'firefox' | 'other'
  prefersReducedMotion: boolean
  viewportWidth: number
  viewportHeight: number
  isLandscape: boolean
  hasNotch: boolean
  safeAreaBottom: number
  safeAreaTop: number
}

const getDeviceInfo = (): DeviceInfo => {
  if (typeof window === 'undefined') {
    return getDefaultDeviceInfo()
  }

  const width = window.innerWidth
  const height = window.innerHeight

  const isMobile = width < 1024
  const isTablet = width >= 768 && width < 1024
  const isDesktop = width >= 1024
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  const userAgent = navigator.userAgent.toLowerCase()
  let os: 'ios' | 'android' | 'other' = 'other'
  let browser: 'safari' | 'chrome' | 'firefox' | 'other' = 'other'

  if (/iphone|ipad|ipod/.test(userAgent)) {
    os = 'ios'
  } else if (/android/.test(userAgent)) {
    os = 'android'
  }

  if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) {
    browser = 'safari'
  } else if (/chrome/.test(userAgent)) {
    browser = 'chrome'
  } else if (/firefox/.test(userAgent)) {
    browser = 'firefox'
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const hasNotch = isMobile && (width >= 375 && height >= 812)

  const safeAreaBottom = isMobile ? (window.innerHeight - document.documentElement.clientHeight) : 0
  const safeAreaTop = isMobile ? (window.outerHeight - window.innerHeight - (window.screen?.height - window.outerHeight)) : 0

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    os,
    browser,
    prefersReducedMotion,
    viewportWidth: width,
    viewportHeight: height,
    isLandscape: width > height,
    hasNotch,
    safeAreaBottom,
    safeAreaTop,
  }
}

const getDefaultDeviceInfo = (): DeviceInfo => ({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isTouch: false,
  os: 'other',
  browser: 'other',
  prefersReducedMotion: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  isLandscape: true,
  hasNotch: false,
  safeAreaBottom: 0,
  safeAreaTop: 0,
})

export function useDevice() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(getDefaultDeviceInfo)
  const [isHydrated, setIsHydrated] = useState(false)

  const updateDeviceInfo = useCallback(() => {
    setDeviceInfo(getDeviceInfo())
  }, [])

  useEffect(() => {
    setDeviceInfo(getDeviceInfo())
    setIsHydrated(true)

    window.addEventListener('resize', updateDeviceInfo)
    window.addEventListener('orientationchange', updateDeviceInfo)

    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      window.removeEventListener('orientationchange', updateDeviceInfo)
    }
  }, [updateDeviceInfo])

  return {
    ...deviceInfo,
    isHydrated,
  }
}
