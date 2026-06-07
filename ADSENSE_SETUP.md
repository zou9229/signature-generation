# Google AdSense Setup

This project supports optional Google AdSense loading through a Cloudflare Pages environment
variable. Ads are not loaded unless the variable is configured.

## 1. Apply In AdSense

1. Create or open a Google AdSense account.
2. Add `https://signature-generation.top` as a site.
3. Choose Auto ads or manual ad units.
4. Copy the publisher client id. It looks like `ca-pub-XXXXXXXXXXXXXXXX`.

## 2. Configure Cloudflare Pages

In Cloudflare Pages, open the project settings and add a production environment variable:

```text
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

Then redeploy the production build.

## 3. Add ads.txt After Approval

After AdSense gives the final publisher id, create `public/ads.txt` with:

```text
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Use the numeric publisher id without the `ca-` prefix in `ads.txt`.

## 4. Consent Requirements

If the site receives visitors from regions that require consent for advertising cookies, use a
Google-certified consent management platform before enabling personalized ads. This is especially
important for EEA, UK, and Switzerland traffic.

## 5. Review Checklist

- The site has clear navigation.
- Privacy policy is available at `/privacy/`.
- About and contact pages are available.
- Content is useful without requiring ads to load.
- `sitemap.xml` is submitted in Google Search Console.
