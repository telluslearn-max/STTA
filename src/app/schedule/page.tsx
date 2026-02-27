import { ScheduleSection } from '@/features/schedule/ScheduleSection'
import { Navigation } from '@/features/navigation/Navigation'
import { Footer } from '@/features/footer/Footer'
import { CursorProvider } from '@/core/providers/CursorProvider'
import { GSAPProvider } from '@/core/providers/GSAPProvider'
import { DeviceProvider } from '@/core/providers/DeviceProvider'

export const metadata = {
  title: 'Schedule - STTA',
  description: 'Book your training sessions at STTA Table Tennis Academy',
}

export default function SchedulePage() {
  return (
    <GSAPProvider>
      <DeviceProvider>
        <CursorProvider>
          <main style={{ minHeight: '100vh', background: '#0a0a0a' }}>
            <Navigation />
            <div style={{ paddingTop: '64px' }}>
              <ScheduleSection />
            </div>
            <Footer />
          </main>
        </CursorProvider>
      </DeviceProvider>
    </GSAPProvider>
  )
}
