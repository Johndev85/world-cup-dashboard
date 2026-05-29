import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-barlow-condensed',
})

const BASE_URL = 'https://polla-mundial-world-cup.vercel.app'

export const metadata: Metadata = {
  title: 'Polla Mundialista FIFA 2026',
  description: 'Dashboard para seguimiento de la polla del Mundial FIFA 2026',
  generator: 'v0.app',
  openGraph: {
    title: 'Polla Mundialista FIFA 2026',
    description: 'Dashboard para seguimiento de la polla del Mundial FIFA 2026',
    url: BASE_URL,
    siteName: 'Polla Mundialista FIFA 2026',
    images: [
      {
        url: `${BASE_URL}/Desktop-view.png`,
        width: 2912,
        height: 1672,
        alt: 'Polla Mundialista FIFA 2026',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polla Mundialista FIFA 2026',
    description: 'Dashboard para seguimiento de la polla del Mundial FIFA 2026',
    images: [`${BASE_URL}/Desktop-view.png`],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${barlow.variable} ${barlowCondensed.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
