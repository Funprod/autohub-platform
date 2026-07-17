'use client'

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { theme } from '@/shared/theme'

type Props = {
    children: React.ReactNode
}

export function AppProviders({ children }: Props) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
