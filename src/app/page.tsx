'use client'

import { Navigation } from '@/features/navigation/Navigation'
import { Hero } from '@/features/hero/Hero'
import { Marquee } from '@/features/hero/Marquee'
import { About } from '@/features/about/About'
import { Programs } from '@/features/programs/Programs'
import { Notifications } from '@/features/updates/Updates'
import { Blog } from '@/features/stories/Stories'
import { Join } from '@/features/join/Join'
import { Footer } from '@/features/footer/Footer'
import { CursorProvider } from '@/core/providers/CursorProvider'
import { GSAPProvider } from '@/core/providers/GSAPProvider'
import { SmoothScrollProvider } from '@/core/providers/SmoothScrollProvider'
import { DeviceProvider } from '@/core/providers/DeviceProvider'

export default function Home() {
  return (
    <GSAPProvider>
      <DeviceProvider>
        <SmoothScrollProvider>
          <CursorProvider>
            <main>
              <Navigation />
              <Hero />
              <Marquee />
              <About />
              <Programs />
              <Notifications />
              <Blog />
              <Join />
              <Footer />
            </main>
          </CursorProvider>
        </SmoothScrollProvider>
      </DeviceProvider>
    </GSAPProvider>
  )
}
