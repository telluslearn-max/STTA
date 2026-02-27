'use client'

import { useState } from 'react'
import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/hero/Hero'
import { Marquee } from '@/components/hero/Marquee'
import { About } from '@/components/hero/About'
import { Programs } from '@/components/programs/Programs'
import { Notifications } from '@/components/notifications/Notifications'
import { Blog } from '@/components/blog/Blog'
import { Join } from '@/components/hero/Join'
import { Footer } from '@/components/layout/Footer'
import { BottomNav, MobileMenu } from '@/components/layout/BottomNav'
import { CursorProvider } from '@/components/interactions/CursorProvider'
import { GSAPProvider } from '@/components/providers/GSAPProvider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { DeviceProvider } from '@/components/providers/DeviceProvider'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <GSAPProvider>
      <DeviceProvider>
        <SmoothScrollProvider>
          <CursorProvider>
            <main>
              <Nav />
              <Hero />
              <Marquee />
              <About />
              <Programs />
              <Notifications />
              <Blog />
              <Join />
              <Footer />
              <BottomNav onMenuOpen={() => setMenuOpen(true)} />
              <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            </main>
          </CursorProvider>
        </SmoothScrollProvider>
      </DeviceProvider>
    </GSAPProvider>
  )
}
