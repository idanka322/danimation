import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@/ui/components/GoogleAnalytics'
import { CookieConsent } from '@/ui/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Peak Frontend mastery & perfromance',
  description: 'Building scalable frontend systems and driving measurable financial impact',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '',
    siteName: 'Danimation — UI Platform Engineering',
    title: 'Dani Akabani | Staff Frontend Engineer',
    description: 'Design Systems • Frontend Platform Architecture • Payments Engineering at Scale',
  },
}
const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className={`${inter.className} overflow-x-hidden bg-black text-white`}>
        {GOOGLE_ANALYTICS_ID && <GoogleAnalytics measurementId={GOOGLE_ANALYTICS_ID} />}
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
