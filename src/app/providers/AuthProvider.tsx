'use client'

import { useGetCurrentUserQuery } from '@/entities/user/api/userApi'
import { Box, CircularProgress } from '@mui/material'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { isLoading } = useGetCurrentUserQuery()

    if (isLoading) {
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
