import type { Metadata } from 'next'
import { getStaticPageMetadata } from '../../constants/site'

export const metadata: Metadata = getStaticPageMetadata(
  '/privacy/',
  'Privacy Policy | Free Signature Generator',
  'Privacy policy for Free Signature Generator, including local browser-based signature generation, third-party services, and contact information.',
)

export default function PrivacyPage() {
  return (
    <article className="info-page">
      <h1>Privacy Policy</h1>
      <p>
        Free Signature Generator is designed to keep signature creation local to your browser.
        The name or text you type into the signature editor is used to render the preview and
        exported image on your device.
      </p>

      <h2>Signature data</h2>
      <p>
        We do not require an account and this tool does not upload your typed signature text or
        generated signature image to our server. Export actions such as PNG, SVG, and copying to
        the clipboard are handled in the browser.
      </p>

      <h2>Third-party services</h2>
      <p>
        The site loads fonts from Google Fonts so the handwritten and multilingual styles can be
        displayed correctly. Cloudflare may process standard web request data to deliver, cache,
        and protect the site.
      </p>

      <h2>Advertising</h2>
      <p>
        If advertising is enabled, Google AdSense may use cookies, device identifiers, and similar
        technologies to serve and measure ads. Google may use information from visits to this and
        other websites to help show ads and report ad performance. You can learn more about how
        Google uses information from sites that use its services at{' '}
        <a href="https://policies.google.com/technologies/partner-sites">
          Google Partner Sites
        </a>
        .
      </p>

      <h2>Cookies and accounts</h2>
      <p>
        The signature generator does not require login accounts or payment details. The site may
        use browser storage for interface behavior. If ads are enabled, advertising partners may
        use cookies as described above.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions, visit <a href="https://aiomniahub.com">AiOmnia Hub</a> or use the
        contact page on this site.
      </p>
    </article>
  )
}
