import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://myibdcompass.ca'),
  title: 'MyIBDCompass - Manage IBD with Clarity',
  description: 'Track IBD symptoms, identify trigger foods, and get personalized insights. Built by gastroenterologists for better IBD management through nutrition.',
  generator: 'MyIBDCompass',
  applicationName: 'MyIBDCompass',
  keywords: ['IBD', 'Crohn\'s Disease', 'Ulcerative Colitis', 'Health App', 'Symptom Tracking', 'Diet Management'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://myibdcompass.ca',
    title: 'MyIBDCompass - Manage IBD with Clarity',
    description: 'Track IBD symptoms, identify trigger foods, and get personalized insights. Built by gastroenterologists for better IBD management through nutrition.',
    siteName: 'MyIBDCompass',
    images: [{
      url: 'app-screens/preview.jpg',
      width: 1200,
      height: 630,
      alt: 'MyIBDCompass App Preview',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyIBDCompass - Manage IBD with Clarity',
    description: 'Track IBD symptoms, identify trigger foods, and get personalized insights. Built by gastroenterologists for better IBD management through nutrition.',
    images: ['app-screens/preview.jpg'],
    creator: '@myibdcompass',
    site: '@myibdcompass',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
