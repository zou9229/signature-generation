import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Trans, useTranslation } from 'react-i18next'

const useCases = [
  {
    title: 'Signature for documents',
    body: 'Create a transparent PNG signature that you can place in Word, Google Docs, PDFs, invoices, letters, and forms.',
  },
  {
    title: 'Email signature image',
    body: 'Export a clean handwritten signature image for email footers, profile pages, portfolios, and personal branding.',
  },
  {
    title: 'Cursive name signature',
    body: 'Try multiple cursive, calligraphy, and handwritten fonts until your typed name looks like a natural signature.',
  },
  {
    title: 'Multilingual signatures',
    body: 'Generate signatures for English, Chinese, Japanese, Korean, Arabic, Hindi, Russian, and many other writing systems.',
  },
]

const faqItems = [
  {
    question: 'Is this signature generator free?',
    answer:
      'Yes. You can create, preview, copy, and download signatures for free without creating an account.',
  },
  {
    question: 'Can I download a transparent signature?',
    answer:
      'Yes. Keep transparent background enabled and download PNG for a transparent signature image. You can also export SVG for a scalable vector signature.',
  },
  {
    question: 'Does the site upload my signature text?',
    answer:
      'No. The typed name and generated signature stay in your browser. The tool does not upload your signature text or image to a server.',
  },
  {
    question: 'What is the difference between PNG and SVG?',
    answer:
      'PNG is best for Word, Google Docs, email, and quick image use. SVG is best when you need a scalable vector file for print, design, or high-resolution screens.',
  },
]

function EnglishSEOContent() {
  return (
    <Box component="section" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: 'background.paper' }}>
        <Typography
          component="h2"
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{ mb: 2, fontSize: { xs: '1.5rem', md: '2rem' }, textAlign: 'center' }}
        >
          Free online signature generator for handwritten PNG and SVG signatures
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{
            mb: 4,
            fontSize: '1.08rem',
            lineHeight: 1.8,
            color: 'text.secondary',
            textAlign: 'center',
            maxWidth: 860,
            mx: 'auto',
          }}
        >
          Type your name, choose a cursive or calligraphy font, adjust the color and size, then
          download a transparent signature image. The generator runs in your browser, so your
          signature text is not uploaded to our server.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 3,
            mb: 5,
          }}
        >
          {useCases.map((item) => (
            <Box component="article" key={item.title}>
              <Typography component="h3" variant="h6" fontWeight={700} gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                {item.body}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography component="h3" variant="h5" fontWeight={700} gutterBottom>
            How to create a signature online
          </Typography>
          <Box component="ol" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
            <li>Enter your name or initials in the signature text field.</li>
            <li>Select a handwritten, cursive, CJK, Arabic, Hindi, or other multilingual font.</li>
            <li>Customize font size, text color, background color, and optional texture.</li>
            <li>Download your signature as PNG for documents or SVG for scalable design use.</li>
          </Box>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography component="h3" variant="h5" fontWeight={700} gutterBottom>
            Why this signature maker is useful
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8 }}>
            Many signature tools only support Latin cursive fonts. This signature maker includes
            font choices for multiple writing systems, making it easier to create name signatures
            for international users. It is designed for practical exports: transparent PNG for
            office documents and SVG for crisp scaling.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            The preview updates instantly, so you can compare styles before downloading. No login,
            watermark, or payment step is required.
          </Typography>
        </Box>

        <Typography component="h3" variant="h5" fontWeight={700} gutterBottom>
          Signature generator FAQ
        </Typography>
        <Box sx={{ mt: 2 }}>
          {faqItems.map((item, index) => (
            <Accordion
              key={item.question}
              defaultExpanded={index === 0}
              elevation={0}
              sx={{
                '&:before': { display: 'none' },
                border: '1px solid',
                borderColor: 'divider',
                mb: 2,
                borderRadius: '12px !important',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" component="h4" fontWeight={600}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}

function LocalizedSEOContent() {
  const { t } = useTranslation()

  return (
    <Box component="section" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: 'background.paper' }}>
        <Typography
          component="h2"
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{ mb: 4, fontSize: { xs: '1.5rem', md: '2rem' }, textAlign: 'center' }}
        >
          {t('seo.mainTitle')}
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary', textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          <Trans i18nKey="seo.intro">
            Create professional handwritten signatures in seconds. Our tool supports <strong>33 languages</strong> including <strong>English cursive</strong>, <strong>Chinese/Japanese/Korean calligraphy</strong>, <strong>Russian</strong>, <strong>Hindi</strong>, and <strong>Arabic</strong> fonts.
          </Trans>
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Accordion defaultExpanded elevation={0} sx={{ '&:before': { display: 'none' }, border: '1px solid', borderColor: 'divider', mb: 2, borderRadius: '12px !important' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" component="h3" fontWeight={600}>
                {t('seo.faq1Title')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="text.secondary" paragraph>
                {t('seo.faq1Desc')}
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li><Typography variant="body2" color="text.secondary"><Trans i18nKey="seo.faq1Point1" /></Typography></li>
                <li><Typography variant="body2" color="text.secondary"><Trans i18nKey="seo.faq1Point2" /></Typography></li>
                <li><Typography variant="body2" color="text.secondary"><Trans i18nKey="seo.faq1Point3" /></Typography></li>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ '&:before': { display: 'none' }, border: '1px solid', borderColor: 'divider', mb: 2, borderRadius: '12px !important' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" component="h3" fontWeight={600}>
                {t('seo.faq2Title')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="text.secondary" paragraph>
                <Trans i18nKey="seo.faq2Desc" components={{ em: <em /> }} />
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ '&:before': { display: 'none' }, border: '1px solid', borderColor: 'divider', mb: 2, borderRadius: '12px !important' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" component="h3" fontWeight={600}>
                {t('seo.faq3Title')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="text.secondary" paragraph>
                1. <strong>{t('seo.step1Title')}:</strong> {t('seo.step1Desc')}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                2. <strong>{t('seo.step2Title')}:</strong> {t('seo.step2Desc')}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                3. <strong>{t('seo.step3Title')}:</strong> {t('seo.step3Desc')}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ '&:before': { display: 'none' }, border: '1px solid', borderColor: 'divider', mb: 2, borderRadius: '12px !important' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" component="h3" fontWeight={600}>
                {t('seo.faq4Title')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="text.secondary" paragraph>
                <strong>PNG:</strong> {t('seo.pngDesc')}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                <strong>SVG:</strong> {t('seo.svgDesc')}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion elevation={0} sx={{ '&:before': { display: 'none' }, border: '1px solid', borderColor: 'divider', mb: 2, borderRadius: '12px !important' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" component="h3" fontWeight={600}>
                {t('seo.faq5Title')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="text.secondary" paragraph>
                <Trans i18nKey="seo.privacyDesc" />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Paper>
    </Box>
  )
}

export function SEOContent({ lang }: { lang: string }) {
  if (lang === 'en') {
    return <EnglishSEOContent />
  }

  return <LocalizedSEOContent />
}
