import { Analytics } from '@vercel/analytics/next'
import { Noto_Serif_Bengali } from 'next/font/google'
import type {
  Metadata,
  Viewport,
} from 'next'

import './globals.css'

const bengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
  display: 'swap',
})

export const metadata: Metadata = {
  title:
    'Dhaker Tal | কলকাতা পূজা, আপনার মতো',

  description:
    'Discover Kolkata Durga Puja. Find pandals, plan your route, and follow the rhythm of the city with Dhaker Tal.',

  applicationName: 'Dhaker Tal',

  keywords: [
    'Durga Puja',
    'Kolkata Puja',
    'Kolkata Durga Puja',
    'Pandal',
    'Dhaker Tal',
    'Pujo 2026',
  ],

  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6ecdc',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="bn"
      className={bengali.variable}
    >
      <body>
        {children}

        {process.env.NODE_ENV ===
          'production' && <Analytics />}
      </body>
    </html>
  )
}