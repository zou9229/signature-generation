import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from '../constants/site'
import { OrganizationStructuredData } from '../components/StructuredData'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: '%s',
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: '/signature.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Allura&family=Dancing+Script:wght@400;600&family=Great+Vibes&family=Kaushan+Script&family=Liu+Jian+Mao+Cao&family=Long+Cang&family=Ma+Shan+Zheng&family=Marck+Script&family=Noto+Serif+SC:wght@400;600&family=Pacifico&family=Playball&family=Satisfy&family=Zhi+Mang+Xing&family=Yuji+Syuku&family=Kalam:wght@300;400;700&family=Aref+Ruqaa&family=Bad+Script&family=Nanum+Pen+Script&family=Hi+Melody&family=Sacramento&family=Parisienne&family=Cookie&family=Yellowtail&family=ZCOOL+XiaoWei&family=Caveat:wght@400;700&display=swap" rel="stylesheet" crossOrigin="anonymous" />
      </head>
      <body>
        <OrganizationStructuredData />
        <Providers>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <main style={{ flex: 1 }}>{children}</main>
            <footer style={{ padding: '24px', textAlign: 'center', backgroundColor: 'transparent' }}>
              <nav className="footer-links" aria-label="Footer">
                <a href="/">Home</a>
                <a href="/about/">About</a>
                <a href="/privacy/">Privacy</a>
                <a href="/contact/">Contact</a>
              </nav>
              <a 
                href="https://aiomniahub.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#666', 
                  textDecoration: 'none', 
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  opacity: 0.8,
                  transition: 'opacity 0.2s'
                }}
              >
                Powered by AiOmnia Hub
              </a>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
