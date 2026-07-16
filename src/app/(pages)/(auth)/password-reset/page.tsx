import { PasswordResetFlow } from '@/features/auth/password-reset/ui/PasswordResetFlow'
import { Box, Container, Typography } from '@mui/material'

export default function PasswordResetPage() {
    return (
        <Container maxWidth="sm">
            <Typography>Сброс пароля</Typography>
            <Box>
                <PasswordResetFlow />
            </Box>
        </Container>
    )
}
