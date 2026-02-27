'use client'

import { Navigation } from '@/features/navigation/Navigation'
import { Hero } from '@/features/hero/Hero'
import { Marquee } from '@/features/hero/Marquee'
import { About } from '@/features/about/About'
import { Programs } from '@/features/programs/Programs'
import { CoachesSection } from '@/features/coaches/CoachesSection'
import { ScheduleSection } from '@/features/schedule/ScheduleSection'
import { Notifications } from '@/features/updates/Updates'
import { Blog } from '@/features/stories/Stories'
import { Join } from '@/features/join/Join'
import { FAQAccordion } from '@/features/faq/FAQAccordion'
import { ContactSection } from '@/features/contact/ContactSection'
import { NewsletterSignup } from '@/features/newsletter/NewsletterSignup'
import { Footer } from '@/features/footer/Footer'
import { CursorProvider } from '@/core/providers/CursorProvider'
import { GSAPProvider } from '@/core/providers/GSAPProvider'
import { SmoothScrollProvider } from '@/core/providers/SmoothScrollProvider'
import { DeviceProvider } from '@/core/providers/DeviceProvider'
import { AnnouncementBar } from '@/features/announcement/AnnouncementBar'

export default function Home() {
  return (
    <GSAPProvider>
      <DeviceProvider>
        <SmoothScrollProvider>
          <CursorProvider>
            <main>
              <AnnouncementBar />
              <Navigation />
              <Hero />
              <Marquee />
              <About />
              <Programs />
              <CoachesSection />
              <ScheduleSection />
              <Notifications />
              <Blog />
              <FAQAccordion />
              <Join />
              <ContactSection />
              <NewsletterSignup />
              <Footer />
            </main>
          </CursorProvider>
        </SmoothScrollProvider>
      </DeviceProvider>
    </GSAPProvider>
  )
}
