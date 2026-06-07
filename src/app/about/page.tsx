import type { Metadata } from 'next'
import { getStaticPageMetadata } from '../../constants/site'

export const metadata: Metadata = getStaticPageMetadata(
  '/about/',
  'About Free Signature Generator',
  'Learn what Free Signature Generator does, how it works, and why it is built as a privacy-friendly browser-based signature maker.',
)

export default function AboutPage() {
  return (
    <article className="info-page">
      <h1>About Free Signature Generator</h1>
      <p>
        Free Signature Generator is a browser-based tool for creating handwritten signature
        images from typed names. It supports cursive, calligraphy, and multilingual font styles,
        then exports signatures as transparent PNG or scalable SVG files.
      </p>
      <p>
        The goal is simple: help people create a clean signature image for documents, email,
        personal branding, design drafts, watermarks, and everyday office workflows without
        account registration or payment.
      </p>
      <h2>How the tool works</h2>
      <p>
        Signature preview and export run locally in your browser. You type a name, choose a font,
        adjust visual settings, and download the result. The tool is especially useful when you
        need a quick transparent PNG signature for Word, Google Docs, PDF workflows, or email.
      </p>
      <h2>Who maintains it</h2>
      <p>
        This project is maintained by AiOmnia Hub as a free online utility. The site may evolve
        with better fonts, more signature styles, improved accessibility, and more practical export
        options over time.
      </p>
      <p>
        <a href="/">Create a signature</a>
      </p>
    </article>
  )
}
