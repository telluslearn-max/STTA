'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useDevice, DeviceInfo } from '../hooks/useDevice'

const DeviceContext = createContext<DeviceInfo | null>(null)

export function useDeviceContext() {
  const context = useContext(DeviceContext)
  if (!context) {
    throw new Error('useDeviceContext must be used within DeviceProvider')
  }
  return context
}

interface DeviceProviderProps {
  children: ReactNode
}

export function DeviceProvider({ children }: DeviceProviderProps) {
  const deviceInfo = useDevice()

  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  )
}
