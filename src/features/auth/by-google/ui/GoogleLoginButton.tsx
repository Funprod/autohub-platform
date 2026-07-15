'use client'

import { Button } from '@mui/material'

export const GoogleLoginButton = () => {
    return (
        <Button href="/api/auth/google" component="a">
            Войти через Google
        </Button>
    )
}
