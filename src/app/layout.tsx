import './globals.css'
import { ReactNode } from 'react'
import { Providers } from './providers'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  title: 'Free Signature Generator',
  description: 'Create handwritten signatures in seconds.',
  icons: {
    icon: '/signature.svg',
  },
}

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { lang: string }
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Allura&family=Dancing+Script:wght@400;600&family=Great+Vibes&family=Kaushan+Script&family=Liu+Jian+Mao+Cao&family=Long+Cang&family=Ma+Shan+Zheng&family=Marck+Script&family=Noto+Serif+SC:wght@400;600&family=Pacifico&family=Playball&family=Satisfy&family=Zhi+Mang+Xing&family=Yuji+Syuku&family=Kalam:wght@300;400;700&family=Aref+Ruqaa&family=Bad+Script&family=Nanum+Pen+Script&family=Hi+Melody&family=Sacramento&family=Parisienne&family=Cookie&family=Yellowtail&family=ZCOOL+XiaoWei&family=Caveat:wght@400;700&display=swap" rel="stylesheet" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
