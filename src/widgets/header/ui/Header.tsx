'use client'

import { useLogoutMutation } from '@/entities/user/api/userApi'
import { Link } from '@/shared/ui/Link'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

interface Props {
    isAuth: boolean
}

export const Header = ({ isAuth }: Props) => {
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
                position: 'sticky',
                top: 0,
                zIndex: (theme) => theme.zIndex.appBar,
            }}
        >
            <Stack
                sx={{
                    paddingLeft: '24px',
                }}
            >
                <Typography
                    component={Link}
                    href="/"
                    variant="h6"
                    sx={{ color: 'white.main' }}
                >
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
