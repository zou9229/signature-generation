import { MetadataRoute } from 'next'
import { supportedLanguages } from '../constants/languages'

const BASE_URL = 'https://signature.aiomniahub.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = supportedLanguages.map((lang) => ({
    url: `${BASE_URL}/${lang.code}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: lang.code === 'en' ? 1 : 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...routes,
  ]
}
