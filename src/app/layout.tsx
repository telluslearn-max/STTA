import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "ST. TERESA'S TABLE TENNIS — APEX",
  description: "East Africa's most competitive training program. Built for precision. Forged under pressure.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
