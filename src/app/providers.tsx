'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode, useMemo } from 'react'

export function Providers({ children }: { children: ReactNode }) {
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

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
