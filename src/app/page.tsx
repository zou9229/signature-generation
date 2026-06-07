import { SignatureGenerator } from '../components/SignatureGenerator'
import type { Metadata } from 'next'
import { SignatureStructuredData } from '../components/StructuredData'
import { getSignaturePageMetadata } from '../constants/site'

export const metadata: Metadata = getSignaturePageMetadata('en')

export default function RootPage() {
  return (
    <>
      <SignatureStructuredData lang="en" />
      <SignatureGenerator lang="en" />
    </>
  )
}
