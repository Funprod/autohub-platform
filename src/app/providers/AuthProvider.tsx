'use client'

import { useGetCurrentUserQuery } from '@/entities/user/api/userApi'
import { Box, CircularProgress } from '@mui/material'
import { usePathname } from 'next/navigation'

const PUBLIC_PATHS = ['/login', '/registration', '/password-reset']

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const isPublicPath = PUBLIC_PATHS.includes(pathname)

    const { isLoading } = useGetCurrentUserQuery(undefined, {
        skip: isPublicPath,
    })

    if (isLoading && !isPublicPath) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        )
    }
    return children
}
