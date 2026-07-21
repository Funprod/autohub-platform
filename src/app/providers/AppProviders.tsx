'use client'

import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { useAppSelector } from '@/shared/lib/hooks/redux-hooks'
import { theme } from '@/shared/theme'
import { Header } from '@/widgets/header/ui/Header'
import { NotificationContainer } from '@/widgets/notifications/NotificationContainer'
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar'

type Props = {
    children: React.ReactNode
}

export function AppProviders({ children }: Props) {
    const isAuth = useAppSelector((state) => state.userReducer.isAuthenticated)
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NotificationContainer />
            <Box
                sx={{
                    position: 'relative',
                }}
            >
                <Header isAuth={isAuth} />
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                    }}
                >
                    {isAuth && <Sidebar />}
                    <Box sx={{ flex: 1, padding: 2 }}>{children}</Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
