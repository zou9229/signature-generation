import { SignatureGenerator } from '../components/SignatureGenerator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function RootPage() {
  return <SignatureGenerator lang="en" />
}
