'use client'

import { useState, useEffect } from 'react'
import { Box, Typography, Chip, CircularProgress } from '@mui/material'
import PublicIcon from '@mui/icons-material/Public'
import { useRouter, usePathname } from 'next/navigation'
import { supportedLanguages } from '../i18n'

interface IpData {
  ip: string
  country_name: string
  country_code: string
}

// Map country codes to our supported language codes
const countryToLangMap: Record<string, string> = {
  CN: 'zh',
  US: 'en',
  GB: 'en',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
  NL: 'nl',
  PT: 'pt',
  BR: 'pt',
  IT: 'it',
  JP: 'ja',
  KR: 'ko',
  RU: 'ru',
  VN: 'vi',
  PL: 'pl',
  TR: 'tr',
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
  IN: 'hi',
  BG: 'bg',
  HR: 'hr',
  CZ: 'cs',
  DK: 'da',
  EE: 'et',
  FI: 'fi',
  GR: 'el',
  HU: 'hu',
  IE: 'ga',
  LV: 'lv',
  LT: 'lt',
  MT: 'mt',
  RO: 'ro',
  SK: 'sk',
  SI: 'sl',
  SE: 'sv',
  NO: 'no',
}

export default function GeoInfo() {
  const [ipData, setIpData] = useState<IpData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout

    const fetchIpData = async () => {
      try {
        let ip = ''
        try {
          // Attempt to get IPv4 address specifically
          const ipResponse = await fetch('https://api.ipify.org?format=json')
          if (ipResponse.ok) {
            const ipData = await ipResponse.json()
            ip = ipData.ip
          }
        } catch (e) {
          // Silent fallback to default connection (could be IPv6)
        }

        if (!isMounted) return

        // Revert to ipapi.co as requested
        const response = await fetch(ip ? `https://ipapi.co/${ip}/json/` : 'https://ipapi.co/json/')
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json()
        
        if (!isMounted) return

        const countryCode = data.country_code.toUpperCase()
        setIpData({
          ip: data.ip,
          country_name: data.country_name, // ipapi.co uses 'country_name'
          country_code: countryCode
        })

        const detectedLang = countryToLangMap[countryCode]
        
        if (detectedLang) {
           const currentLang = pathname?.split('/')[1] || ''
           const hasRedirected = sessionStorage.getItem('geo-redirected')
           
           // Redirect if:
           // 1. Not already redirected in this session
           // 2. Current path is root OR 'en' (default)
           // 3. Detected lang is NOT 'en' (don't redirect en users to en)
           // 4. Detected lang is different from current lang
           if (!hasRedirected && (pathname === '/' || currentLang === 'en' || currentLang === '') && detectedLang !== 'en' && detectedLang !== currentLang) {
               sessionStorage.setItem('geo-redirected', 'true')
               router.push(`/${detectedLang}`)
           }
        }
        setLoading(false)

      } catch (error) {
        // Silently fail and retry in background if geo-location services are blocked or fail
        if (isMounted) {
            timeoutId = setTimeout(fetchIpData, 10000) // Retry every 10 seconds
        }
      }
    }

    fetchIpData()

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [pathname, router])

  if (loading) return null 
  if (!ipData) return null

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' }, gap: 0, minWidth: 'fit-content' }}>
       <Typography 
         variant="caption" 
         sx={{ opacity: 0.7, fontSize: '0.7rem', lineHeight: 1.2, whiteSpace: 'nowrap' }}
       >
         IP: {ipData.ip}
       </Typography>
       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.9 }}>
         <img 
           src={`https://flagcdn.com/w20/${ipData.country_code.toLowerCase()}.png`}
           srcSet={`https://flagcdn.com/w40/${ipData.country_code.toLowerCase()}.png 2x`}
           width="20"
           height="15" // Standard ratio for flagcdn w20 is 20x15 usually, or close enough for icon
           alt={ipData.country_name}
           style={{ display: 'block', borderRadius: '2px' }}
         />
         <Typography 
           variant="caption" 
           sx={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.2, whiteSpace: 'nowrap' }}
         >
           {ipData.country_name}
         </Typography>
       </Box>
    </Box>
  )
}
