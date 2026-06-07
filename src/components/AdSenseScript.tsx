import Script from 'next/script'

const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT

export function AdSenseScript() {
  if (!adsenseClient) return null

  return (
    <Script
      id="adsense-loader"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
      crossOrigin="anonymous"
    />
  )
}
