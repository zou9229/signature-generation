# Cloudflare Pages Deployment

This project is configured for Cloudflare Pages static hosting.

## Build Settings

- Framework preset: `Next.js (Static HTML Export)` or `None`
- Build command: `npm run build`
- Build output directory: `out`
- Root directory: `/`
- Environment variables: none required

## Custom Domain

Use `signature-generation.top` as the production domain.

1. Add `signature-generation.top` to Cloudflare.
2. In Cloudflare Pages, open the project and add `signature-generation.top` as a custom domain.
3. Let Cloudflare create or verify the DNS records.
4. After deployment, verify:
   - `https://signature-generation.top/`
   - `https://signature-generation.top/robots.txt`
   - `https://signature-generation.top/sitemap.xml`

## Old Vercel Domain

The old domain is `signature.aiomniahub.com`.

Because the site has no meaningful SEO traffic yet, the simplest clean cutover is:

1. Deploy and verify `signature-generation.top` on Cloudflare Pages.
2. Remove `signature.aiomniahub.com` from the Vercel project domains.
3. Stop or disconnect the Vercel project if it is no longer needed.

If you still want old visitors to be redirected, configure a 301 redirect outside this repo:

- Cloudflare Redirect Rule if `aiomniahub.com` DNS is managed by Cloudflare.
- Vercel redirect if `signature.aiomniahub.com` stays attached to the Vercel project temporarily.

Redirect target:

```text
https://signature.aiomniahub.com/* -> https://signature-generation.top/$1
```

## Search Console

After the new domain is live:

1. Add `https://signature-generation.top` in Google Search Console.
2. Submit `https://signature-generation.top/sitemap.xml`.
3. Add the domain in Bing Webmaster Tools and submit the same sitemap.
