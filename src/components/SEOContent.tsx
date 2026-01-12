import { Accordion, AccordionDetails, AccordionSummary, Box, Paper, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Trans, useTranslation } from 'react-i18next'

export function SEOContent() {
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
            Create professional handwritten signatures in seconds. Our tool is one of the few that supports both <strong>English cursive</strong> and <strong>Chinese calligraphy fonts</strong> (Ma Shan Zheng, Long Cang, etc.). Perfect for digital documents, email signatures, and photography watermarks.
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
                <Trans i18nKey="seo.faq2Desc" />
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
