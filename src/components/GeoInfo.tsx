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

        // Use specific IP if found, otherwise default to connecting IP
        const response = await fetch(ip ? `https://ipapi.co/${ip}/json/` : 'https://ipapi.co/json/')
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        setIpData({
          ip: data.ip,
          country_name: data.country_name,
          country_code: data.country_code
        })

        const detectedLang = countryToLangMap[data.country_code]
        
        if (detectedLang) {
           const currentLang = pathname?.split('/')[1]
           const hasRedirected = sessionStorage.getItem('geo-redirected')
           
           if (!hasRedirected && (pathname === '/' || currentLang === 'en') && detectedLang !== 'en' && detectedLang !== currentLang) {
               sessionStorage.setItem('geo-redirected', 'true')
               router.push(`/${detectedLang}`)
           }
        }

      } catch (error) {
        console.error('Failed to fetch IP data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchIpData()
  }, [pathname, router])

  // Flag emoji helper
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

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
       <Typography 
         variant="caption" 
         sx={{ opacity: 0.9, fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.2, whiteSpace: 'nowrap' }}
       >
         {getFlagEmoji(ipData.country_code)} {ipData.country_name}
       </Typography>
    </Box>
  )
}
