import type { Metadata } from 'next'
import { supportedLanguages } from './languages'

export const SITE_URL = 'https://signature-generation.top'
export const SITE_NAME = 'Free Signature Generator'

export const DEFAULT_TITLE =
  'Free Signature Generator | Handwritten Signature Maker PNG & SVG'

export const DEFAULT_DESCRIPTION =
  'Create a handwritten signature online for free. Type your name, choose cursive or calligraphy fonts, then download a transparent PNG or SVG. No login required.'

export const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  zh: 'Chinese',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  nl: 'Dutch',
  pt: 'Portuguese',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  ru: 'Russian',
  vi: 'Vietnamese',
  pl: 'Polish',
  tr: 'Turkish',
  ar: 'Arabic',
  hi: 'Hindi',
  bg: 'Bulgarian',
  hr: 'Croatian',
  cs: 'Czech',
  da: 'Danish',
  et: 'Estonian',
  fi: 'Finnish',
  el: 'Greek',
  hu: 'Hungarian',
  ga: 'Irish',
  lv: 'Latvian',
  lt: 'Lithuanian',
  mt: 'Maltese',
  ro: 'Romanian',
  sk: 'Slovak',
  sl: 'Slovenian',
  sv: 'Swedish',
  no: 'Norwegian',
}

const HREFLANG_BY_CODE: Record<string, string> = {
  en: 'en',
  zh: 'zh-Hans',
  es: 'es',
  fr: 'fr',
  de: 'de',
  nl: 'nl',
  pt: 'pt',
  it: 'it',
  ja: 'ja',
  ko: 'ko',
  ru: 'ru',
  vi: 'vi',
  pl: 'pl',
  tr: 'tr',
  ar: 'ar',
  hi: 'hi',
  bg: 'bg',
  hr: 'hr',
  cs: 'cs',
  da: 'da',
  et: 'et',
  fi: 'fi',
  el: 'el',
  hu: 'hu',
  ga: 'ga',
  lv: 'lv',
  lt: 'lt',
  mt: 'mt',
  ro: 'ro',
  sk: 'sk',
  sl: 'sl',
  sv: 'sv',
  no: 'no',
}

const LOCALIZED_SEO: Record<string, { title: string; description: string }> = {
  en: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  zh: {
    title: '免费签名生成器 | 在线手写签名 PNG 与 SVG',
    description:
      '免费在线生成中文、英文和多语言手写签名。输入姓名，选择书法或连笔字体，下载透明 PNG 或 SVG，无需登录。',
  },
  es: {
    title: 'Generador de Firmas Gratis | Firma Manuscrita PNG y SVG',
    description:
      'Crea una firma manuscrita gratis en línea. Escribe tu nombre, elige fuentes cursivas o caligráficas y descarga PNG transparente o SVG.',
  },
  fr: {
    title: 'Générateur de Signature Gratuit | Signature Manuscrite PNG et SVG',
    description:
      'Créez gratuitement une signature manuscrite en ligne. Saisissez votre nom, choisissez une police cursive ou calligraphique, puis téléchargez en PNG ou SVG.',
  },
  de: {
    title: 'Kostenloser Unterschriftengenerator | PNG und SVG',
    description:
      'Erstellen Sie kostenlos online eine handschriftliche Unterschrift. Namen eingeben, Schrift wählen und als transparentes PNG oder SVG herunterladen.',
  },
  ja: {
    title: '無料署名ジェネレーター | 手書き署名 PNG・SVG',
    description:
      '名前を入力して、筆記体や書道風フォントの手書き署名を無料で作成。透明PNGまたはSVGでダウンロードできます。',
  },
  ko: {
    title: '무료 서명 생성기 | 손글씨 서명 PNG 및 SVG',
    description:
      '이름을 입력하고 필기체 또는 캘리그래피 글꼴을 선택해 손글씨 서명을 무료로 만들고 투명 PNG 또는 SVG로 저장하세요.',
  },
  ru: {
    title: 'Бесплатный генератор подписи | PNG и SVG',
    description:
      'Создайте рукописную подпись онлайн бесплатно. Введите имя, выберите курсивный или каллиграфический шрифт и скачайте PNG или SVG.',
  },
  ar: {
    title: 'منشئ توقيع مجاني | توقيع بخط اليد PNG و SVG',
    description:
      'أنشئ توقيعًا بخط اليد مجانًا عبر الإنترنت. اكتب اسمك واختر خطًا مناسبًا ثم نزّل التوقيع بصيغة PNG شفافة أو SVG.',
  },
  hi: {
    title: 'मुफ्त हस्ताक्षर जनरेटर | PNG और SVG',
    description:
      'अपना नाम लिखकर ऑनलाइन मुफ्त हस्तलिखित हस्ताक्षर बनाएं। कर्सिव या कैलिग्राफी फ़ॉन्ट चुनें और PNG या SVG डाउनलोड करें।',
  },
}

export function getLanguagePath(code: string) {
  return code === 'en' ? '/' : `/${code}/`
}

export function getAbsoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}

export const languageAlternates = supportedLanguages.reduce<Record<string, string>>(
  (alternates, language) => {
    const hreflang = HREFLANG_BY_CODE[language.code] ?? language.code
    alternates[hreflang] = getAbsoluteUrl(getLanguagePath(language.code))
    return alternates
  },
  {
    'x-default': getAbsoluteUrl('/'),
  },
)

export function getSeoForLanguage(code: string) {
  const localized = LOCALIZED_SEO[code]
  if (localized) return localized

  const languageName = LANGUAGE_NAMES[code] ?? code.toUpperCase()

  return {
    title: `Free ${languageName} Signature Generator | Handwritten PNG & SVG`,
    description: `Create a ${languageName} handwritten signature online for free. Type your name, customize the style, and download a transparent PNG or SVG.`,
  }
}

export function getSignaturePageMetadata(code: string): Metadata {
  const seo = getSeoForLanguage(code)
  const canonicalPath = getLanguagePath(code)

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: canonicalPath,
      languages: languageAlternates,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: getAbsoluteUrl(canonicalPath),
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: seo.title,
      description: seo.description,
    },
  }
}

export function getStaticPageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: getAbsoluteUrl(path),
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}
