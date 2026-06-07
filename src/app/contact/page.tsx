import type { Metadata } from 'next'
import { getStaticPageMetadata } from '../../constants/site'

export const metadata: Metadata = getStaticPageMetadata(
  '/contact/',
  'Contact | Free Signature Generator',
  'Contact information for Free Signature Generator and AiOmnia Hub.',
)

export default function ContactPage() {
  return (
    <article className="info-page">
      <h1>Contact</h1>
      <p>
        For questions, feedback, font suggestions, or bug reports related to Free Signature
        Generator, contact the maintainer through AiOmnia Hub.
      </p>
      <p>
        <a href="https://aiomniahub.com">Visit AiOmnia Hub</a>
      </p>
      <h2>Useful details to include</h2>
      <ul>
        <li>The page URL where you saw the issue.</li>
        <li>Your browser and device type.</li>
        <li>The signature export format you used, such as PNG or SVG.</li>
        <li>A short description of the expected result.</li>
      </ul>
      <p>
        <a href="/">Back to the signature generator</a>
      </p>
    </article>
  )
}
