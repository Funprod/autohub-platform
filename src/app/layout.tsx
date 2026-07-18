import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import { AppProviders } from './providers/AppProviders'
import { AuthProvider } from './providers/AuthProvider'
import { StoreProvider } from './providers/StoreProvider'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: 'AutoHub Platform',
    description: 'AutoHub Platform',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable}`}
        >
            <body className={inter.variable}>
                <StoreProvider>
                    <AppRouterCacheProvider>
                        <AuthProvider>
                            <AppProviders>{children}</AppProviders>
                        </AuthProvider>
                    </AppRouterCacheProvider>
                </StoreProvider>
            </body>
        </html>
    )
}
