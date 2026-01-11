import { SignatureGenerator } from '../../components/SignatureGenerator'
import { supportedLanguages } from '../../constants/languages'

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({
    lang: lang.code,
  }))
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return <SignatureGenerator lang={lang} />
}
