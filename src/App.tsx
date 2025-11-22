import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Slider,
  Stack,
  Switch,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from '@mui/material'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { toPng, toSvg } from 'html-to-image'
import { supportedLanguages } from './i18n'
import { SEOContent } from './components/SEOContent'
import './App.css'

const fontCatalog = [
  { label: 'Dancing Script', value: '"Dancing Script", cursive' },
  { label: 'Great Vibes', value: '"Great Vibes", cursive' },
  { label: 'Playball', value: '"Playball", cursive' },
  { label: 'Marck Script', value: '"Marck Script", cursive' },
  { label: 'Noto Serif SC', value: '"Noto Serif SC", serif' },
  { label: 'Allura', value: '"Allura", cursive' },
  { label: 'Pacifico', value: '"Pacifico", cursive' },
  { label: 'Satisfy', value: '"Satisfy", cursive' },
  { label: 'Kaushan Script', value: '"Kaushan Script", cursive' },
]

type TextureKey = 'none' | 'paper' | 'dots' | 'lines'

const textureStyles: Record<
  TextureKey,
  { backgroundImage?: string; backgroundBlendMode?: string; backgroundSize?: string }
> = {
  none: {},
  paper: {
    backgroundImage:
      'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.7), rgba(0,0,0,0.05) 60%)',
    backgroundBlendMode: 'multiply',
  },
  dots: {
    backgroundImage:
      'radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)',
    backgroundBlendMode: 'normal',
    backgroundSize: '16px 16px, 16px 16px',
  },
  lines: {
    backgroundImage: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.08) 1px, transparent 1px, transparent 10px)',
    backgroundBlendMode: 'multiply',
    backgroundSize: 'auto',
  },
}

const defaultState = {
  text: 'felix zou',
  fontFamily: fontCatalog[0].value,
  fontColor: '#1b1b1b',
  backgroundColor: '#ffffff',
  transparentBg: true,
  fontSize: 56,
  texture: 'none' as TextureKey,
}

type FormState = typeof defaultState

function App() {
  const { t, i18n } = useTranslation()
  const [form, setForm] = useState<FormState>({ ...defaultState })
  const [isExporting, setIsExporting] = useState(false)
  const signatureRef = useRef<HTMLDivElement>(null)

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Noto Sans SC","Roboto","Segoe UI",sans-serif',
        },
        shape: {
          borderRadius: 16,
        },
        palette: {
          background: {
            default: '#f4f5fb',
          },
        },
      }),
    [],
  )

  const updateForm = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetForm = () => setForm({ ...defaultState })

  const canExport = form.text.trim().length > 0 && !isExporting

  const exportSignature = async (format: 'png' | 'svg') => {
    if (!signatureRef.current || !canExport) return
    setIsExporting(true)
    try {
      const commonOptions = {
        cacheBust: true,
        backgroundColor: form.transparentBg ? undefined : form.backgroundColor,
      }
      const texture = textureStyles[form.texture]
      const dataUrl =
        format === 'svg'
          ? await toSvg(signatureRef.current, commonOptions)
          : await toPng(signatureRef.current, {
              ...commonOptions,
              style: {
                backgroundImage: form.transparentBg ? undefined : texture.backgroundImage,
                backgroundBlendMode: texture.backgroundBlendMode,
                backgroundSize: texture.backgroundSize,
              },
            })
      const link = document.createElement('a')
      link.download = `signature-${Date.now()}.${format}`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error(error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 3,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #eef2ff 0%, #fdf2f8 100%)',
            border: '1px solid rgba(15,23,42,0.08)',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="flex-start">
            <Box>
              <Typography component="h2" variant="h4" fontWeight={700} gutterBottom>
                {t('title')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('subtitle')}
              </Typography>
            </Box>
            <TextField
              select
              size="small"
              label={t('language')}
              value={i18n.language}
              onChange={(event) => i18n.changeLanguage(event.target.value)}
              sx={{ width: 180 }}
            >
              {supportedLanguages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Paper>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 3, lg: 4 },
            gridTemplateColumns: { xs: '1fr', lg: '1.1fr 0.9fr' },
            alignItems: 'flex-start',
          }}
        >
          <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label={t('inputLabel')}
                placeholder={t('placeholder')}
                value={form.text}
                onChange={(event) => updateForm('text', event.target.value)}
                multiline
                minRows={2}
                helperText={!form.text.trim() ? t('textRequired') : ' '}
                error={!form.text.trim()}
              />

              <Box
                sx={{
                  display: 'grid',
                  gap: { xs: 2.5, md: 3 },
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                  alignItems: 'stretch',
                }}
              >
                <TextField
                  fullWidth
                  select
                  label={t('fontFamily')}
                  value={form.fontFamily}
                  onChange={(event) => updateForm('fontFamily', event.target.value)}
                >
                  {fontCatalog.map((font) => (
                    <MenuItem key={font.value} value={font.value} sx={{ fontFamily: font.value }}>
                      {font.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {t('fontSize')} · {form.fontSize}px
                  </Typography>
                  <Slider
                    value={form.fontSize}
                    min={28}
                    max={96}
                    step={2}
                    onChange={(_, value) =>
                      updateForm('fontSize', Array.isArray(value) ? value[0] : value)
                    }
                  />
                </Box>
                <TextField
                  fullWidth
                  type="color"
                  label={t('fontColor')}
                  value={form.fontColor}
                  onChange={(event) => updateForm('fontColor', event.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <Box
                  sx={{
                    gridColumn: { xs: 'span 1', md: '1 / span 2' },
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 1fr) auto' },
                    gap: { xs: 2, sm: 3 },
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    fullWidth
                    type="color"
                    label={t('backgroundColor')}
                    value={form.backgroundColor}
                    onChange={(event) => updateForm('backgroundColor', event.target.value)}
                    InputLabelProps={{ shrink: true }}
                    disabled={form.transparentBg}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={form.transparentBg}
                        onChange={(event) => updateForm('transparentBg', event.target.checked)}
                      />
                    }
                    label={t('transparentBackground')}
                    sx={{
                      m: 0,
                      justifySelf: { xs: 'flex-start', sm: 'flex-end' },
                      pl: { xs: 0, sm: 2 },
                    }}
                  />
                </Box>
                {form.transparentBg && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      gridColumn: { xs: 'span 1', md: '1 / span 2' },
                      pl: 0.5,
                    }}
                  >
                    {t('transparentHint')}
                  </Typography>
                )}
                <TextField
                  fullWidth
                  select
                  label={t('texture')}
                  value={form.texture}
                  onChange={(event) => updateForm('texture', event.target.value as TextureKey)}
                  disabled={form.transparentBg}
                >
                  <MenuItem value="none">{t('textureNone')}</MenuItem>
                  <MenuItem value="paper">{t('texturePaper')}</MenuItem>
                  <MenuItem value="dots">{t('textureDots')}</MenuItem>
                  <MenuItem value="lines">{t('textureLines')}</MenuItem>
                </TextField>
                <Alert
                  icon={<InfoOutlinedIcon fontSize="small" />}
                  severity="info"
                  variant="outlined"
                  sx={{
                    alignItems: 'center',
                    gridColumn: { xs: 'span 1', md: '1 / span 2' },
                  }}
                >
                  {t('textureHint')}
                </Alert>
              </Box>
            </Stack>
          </Paper>

          <Paper elevation={4} sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">{t('previewTitle')}</Typography>
                <Tooltip title={t('reset')}>
                  <span>
                    <IconButton color="primary" onClick={resetForm}>
                      <RestartAltRoundedIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
              <Divider />
              <Box
                ref={signatureRef}
                className={`signature-preview ${
                  form.transparentBg ? 'signature-preview--transparent' : ''
                }`}
                sx={{
                  backgroundColor: form.transparentBg ? 'transparent' : form.backgroundColor,
                  border: '1px dashed rgba(0,0,0,0.08)',
                  backgroundImage: form.transparentBg ? undefined : textureStyles[form.texture].backgroundImage,
                  backgroundBlendMode: textureStyles[form.texture].backgroundBlendMode,
                  backgroundSize: textureStyles[form.texture].backgroundSize,
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontFamily: form.fontFamily,
                    fontSize: form.fontSize,
                    color: form.fontColor,
                    display: 'inline-block',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {form.text || t('placeholder')}
                </Typography>
              </Box>
              <Alert
                icon={<InfoOutlinedIcon fontSize="small" />}
                severity="info"
                sx={{ alignItems: 'flex-start', gap: 0.5 }}
              >
                <Typography variant="body2">{t('exportHint')}</Typography>
                <Typography variant="body2">{t('blackImageHint')}</Typography>
              </Alert>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ flexWrap: 'wrap', rowGap: 2 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<FileDownloadRoundedIcon />}
                  onClick={() => exportSignature('png')}
                  disabled={!canExport}
                  sx={{ flex: 1, minWidth: { sm: 180 } }}
                >
                  {isExporting ? t('generating') : t('download')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<FileDownloadRoundedIcon />}
                  onClick={() => exportSignature('svg')}
                  disabled={!canExport}
                  sx={{ flex: 1, minWidth: { sm: 180 } }}
                >
                  {isExporting ? t('generating') : t('downloadSvg')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<RestartAltRoundedIcon />}
                  onClick={resetForm}
                  sx={{ flexBasis: { xs: '100%', sm: 'auto' }, minWidth: { sm: 180 } }}
                >
                  {t('reset')}
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Box>
        <SEOContent />
      </Container>
    </ThemeProvider>
  )
}

export default App
