import { MetadataRoute } from 'next'
import { supportedLanguages } from '../constants/languages'

export const dynamic = 'force-static'

const BASE_URL = 'https://signature-generation.top'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = supportedLanguages
    .filter((lang) => lang.code !== 'en')
    .map((lang) => ({
      url: `${BASE_URL}/${lang.code}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }))

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...routes,
  ]
}
