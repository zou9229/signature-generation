import type { Metadata } from 'next'
import { SignatureGenerator } from '../../components/SignatureGenerator'
import { SignatureStructuredData } from '../../components/StructuredData'
import { supportedLanguages } from '../../constants/languages'
import { getSignaturePageMetadata } from '../../constants/site'

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({
    lang: lang.code,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return getSignaturePageMetadata(lang)
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return (
    <>
      <SignatureStructuredData lang={lang} />
      <SignatureGenerator lang={lang} />
    </>
  )
}
