'use client'

import { useLogoutMutation } from '@/entities/user/api/userApi'
import { useAppSelector } from '@/shared/lib/hooks/redux-hooks'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export const Header = () => {
    const isAuth = useAppSelector((state) => state.user.isAuthenticated)
    const [logout] = useLogoutMutation()
    const router = useRouter()

    const handleBtnLogin = () => {
        router.push('/login')
    }

    const handleBtnLogout = async () => {
        const result = await logout().unwrap()

        if (result.success) {
            router.push('/login')
        }
    }

    return (
        <Box
            component="header"
            sx={{
                width: '100%',
                height: 60,
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                marginBottom: 2,
            }}
        >
            <Stack
                sx={{
                    paddingLeft: '24px',
                }}
            >
                <Typography color="primary.main" variant="h6">
                    AutoHub Platform
                </Typography>
            </Stack>
            <Stack
                sx={{
                    paddingRight: '24px',
                    marginLeft: 'auto',
                }}
            >
                {isAuth ? (
                    <Button onClick={handleBtnLogout}>Выйти</Button>
                ) : (
                    <Button onClick={handleBtnLogin}>Войти</Button>
                )}
            </Stack>
        </Box>
    )
}
