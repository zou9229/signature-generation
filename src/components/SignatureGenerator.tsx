'use client'

import { useMemo, useRef, useState, useEffect } from 'react'
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
  Snackbar,
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
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { toPng, toSvg } from 'html-to-image'
import { supportedLanguages } from '../i18n'
import { SEOContent } from './SEOContent'
import GeoInfo from './GeoInfo'
import { useRouter, usePathname } from 'next/navigation'
import '../App.css'

const fontCatalog = [
  { label: 'Great Vibes (English)', value: '"Great Vibes", cursive' },
  { label: 'Dancing Script (English)', value: '"Dancing Script", cursive' },
  { label: 'Ma Shan Zheng (中文楷书)', value: '"Ma Shan Zheng", cursive' },
  { label: 'ZCOOL XiaoWei (中文宋体)', value: '"ZCOOL XiaoWei", serif' },
  { label: 'Zhi Mang Xing (中文行书)', value: '"Zhi Mang Xing", cursive' },
  { label: 'Long Cang (中文草书)', value: '"Long Cang", cursive' },
  { label: 'Liu Jian Mao Cao (中文狂草)', value: '"Liu Jian Mao Cao", cursive' },
  { label: 'Playball (English)', value: '"Playball", cursive' },
  { label: 'Sacramento (English)', value: '"Sacramento", cursive' },
  { label: 'Parisienne (English)', value: '"Parisienne", cursive' },
  { label: 'Cookie (English)', value: '"Cookie", cursive' },
  { label: 'Yellowtail (English)', value: '"Yellowtail", cursive' },
  { label: 'Marck Script (English)', value: '"Marck Script", cursive' },
  { label: 'Noto Serif SC (中文宋体)', value: '"Noto Serif SC", serif' },
  { label: 'Allura (English)', value: '"Allura", cursive' },
  { label: 'Pacifico (English)', value: '"Pacifico", cursive' },
  { label: 'Satisfy (English)', value: '"Satisfy", cursive' },
  { label: 'Kaushan Script (English)', value: '"Kaushan Script", cursive' },
  { label: 'Yuji Syuku (日本語)', value: '"Yuji Syuku", serif' },
  { label: 'Nanum Pen Script (한국어)', value: '"Nanum Pen Script", cursive' },
  { label: 'Hi Melody (한국어)', value: '"Hi Melody", cursive' },
  { label: 'Kalam (Hindi)', value: '"Kalam", cursive' },
  { label: 'Aref Ruqaa (Arabic)', value: '"Aref Ruqaa", serif' },
  { label: 'Bad Script (Russian)', value: '"Bad Script", cursive' },
  { label: 'Caveat (European)', value: '"Caveat", cursive' },
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
  text: 'felix',
  fontFamily: fontCatalog[0].value,
  fontColor: '#1b1b1b',
  backgroundColor: '#ffffff',
  transparentBg: true,
  fontSize: 56,
  texture: 'none' as TextureKey,
}

type FormState = typeof defaultState

export function SignatureGenerator({ lang }: { lang: string }) {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [form, setForm] = useState<FormState>({ ...defaultState })
  const [isExporting, setIsExporting] = useState(false)
  const [toast, setToast] = useState<{ open: boolean; message: string }>({ open: false, message: '' })
  const signatureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n])

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

  const copyToClipboard = async () => {
    if (!signatureRef.current || !canExport) return
    setIsExporting(true)
    try {
      const texture = textureStyles[form.texture]
      const blob = await toPng(signatureRef.current, {
        cacheBust: true,
        backgroundColor: form.transparentBg ? undefined : form.backgroundColor,
        style: {
          backgroundImage: form.transparentBg ? undefined : texture.backgroundImage,
          backgroundBlendMode: texture.backgroundBlendMode,
          backgroundSize: texture.backgroundSize,
        },
      }).then((dataUrl) => fetch(dataUrl).then((res) => res.blob()))

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])
      setToast({ open: true, message: t('copySuccess') })
    } catch (error) {
      console.error(error)
      setToast({ open: true, message: t('copyFail') })
    } finally {
      setIsExporting(false)
    }
  }

  const handleLanguageChange = (newLang: string) => {
    router.push(`/${newLang}`)
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            mb: 3,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #eef2ff 0%, #fdf2f8 100%)',
            border: '1px solid rgba(15,23,42,0.08)',
          }}
        >
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={2} 
            alignItems="center" 
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Box sx={{ flex: 1, width: '100%', textAlign: { xs: 'center', md: 'left' } }}>
              <Typography component="h1" variant="h5" fontWeight={700} gutterBottom sx={{ mb: 0.5 }}>
                {t('title')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('subtitle')}
              </Typography>
            </Box>

            <Stack 
              direction="row" 
              spacing={2} 
              alignItems="center" 
              justifyContent={{ xs: 'center', md: 'flex-end' }}
              sx={{ flex: 1, width: '100%' }}
            >
              <Box sx={{ minWidth: 150 }}>
                <TextField
                  id="language-select"
                  select
                  size="small"
                  label={t('language')}
                  value={lang || 'en'}
                  onChange={(event) => handleLanguageChange(event.target.value)}
                  sx={{ width: '100%' }}
                >
                  {supportedLanguages.map((l) => (
                    <MenuItem key={l.code} value={l.code}>
                      {l.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <GeoInfo />
            </Stack>
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
                id="signature-text-input"
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
                  id="font-family-select"
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
                  id="font-color-input"
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
                    id="background-color-input"
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
                        id="transparent-bg-switch"
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
                  id="texture-select"
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
                  border: form.transparentBg ? '1px dashed rgba(0,0,0,0.1)' : '1px solid rgba(0,0,0,0.05)',
                  boxShadow: form.transparentBg ? 'none' : '0 8px 32px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
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
                    textAlign: 'center',
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
                spacing={1.5}
                sx={{ flexWrap: 'wrap', rowGap: 1.5 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<FileDownloadRoundedIcon />}
                  onClick={() => exportSignature('png')}
                  disabled={!canExport}
                  sx={{ flex: '1 1 45%' }}
                >
                  {isExporting ? t('generating') : t('download')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<FileDownloadRoundedIcon />}
                  onClick={() => exportSignature('svg')}
                  disabled={!canExport}
                  sx={{ flex: '1 1 45%' }}
                >
                  {isExporting ? t('generating') : t('downloadSvg')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ContentCopyRoundedIcon />}
                  onClick={copyToClipboard}
                  disabled={!canExport}
                  sx={{ flex: '1 1 45%' }}
                >
                  {t('copyImage')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<RestartAltRoundedIcon />}
                  onClick={resetForm}
                  sx={{ flex: '1 1 45%' }}
                >
                  {t('reset')}
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Box>
        <SEOContent />
        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          onClose={() => setToast({ ...toast, open: false })}
          message={toast.message}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Container>
    </>
  )
}
