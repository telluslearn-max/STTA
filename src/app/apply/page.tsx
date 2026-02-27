import { DesktopForm } from '@/features/application-form/DesktopForm'

export const metadata = {
  title: 'Apply - STTA',
  description: 'Join STTA Table Tennis Academy',
}

export default function ApplyPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      padding: '80px 40px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <DesktopForm />
    </main>
  )
}
