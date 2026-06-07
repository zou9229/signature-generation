import { MetadataRoute } from 'next'
import { supportedLanguages } from '../constants/languages'
import { getAbsoluteUrl, getLanguagePath, languageAlternates } from '../constants/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const routes = supportedLanguages
    .filter((lang) => lang.code !== 'en')
    .map((lang) => ({
      url: getAbsoluteUrl(getLanguagePath(lang.code)),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: languageAlternates,
      },
    }))

  return [
    {
      url: getAbsoluteUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: languageAlternates,
      },
    },
    {
      url: getAbsoluteUrl('/about/'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: getAbsoluteUrl('/privacy/'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: getAbsoluteUrl('/contact/'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...routes,
  ]
}
