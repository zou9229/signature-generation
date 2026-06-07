import { getAbsoluteUrl, getSeoForLanguage, LANGUAGE_NAMES, SITE_NAME, SITE_URL } from '../constants/site'

const supportedLanguageNames = Object.values(LANGUAGE_NAMES)

export function OrganizationStructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AiOmnia Hub',
    url: 'https://aiomniahub.com',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function SignatureStructuredData({ lang }: { lang: string }) {
  const seo = getSeoForLanguage(lang)
  const inLanguage = lang === 'zh' ? 'zh-Hans' : lang
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE_NAME,
      alternateName: 'Online Signature Maker',
      url: SITE_URL,
      description: seo.description,
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript and a modern web browser.',
      inLanguage,
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Generate handwritten signatures from typed names',
        'Download transparent PNG signature images',
        'Download scalable SVG signatures',
        'Customize cursive and calligraphy fonts',
        'Runs locally in the browser without uploading signature text',
        `Supports ${supportedLanguageNames.length} interface languages`,
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is this signature generator free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can create, preview, copy, and download signatures for free without creating an account.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I download a transparent signature?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The tool can export transparent PNG images and scalable SVG files for documents, email signatures, and design work.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the site upload my signature text?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Signature generation happens in your browser. Your typed name and exported image are not uploaded to a server by this tool.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between PNG and SVG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PNG is best for Word, Google Docs, email, and quick image use. SVG is best when you need a scalable vector file for print, design, or high-resolution screens.',
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getAbsoluteUrl('/'),
        },
      ],
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
