import { LoginForm } from '@/features/auth/by-email/ui/LoginForm'
import { Box, Container, Typography } from '@mui/material'

export default function LoginPage() {
    return (
        <Container maxWidth="sm">
            <Typography>Введите логин и пароль что бы продолжить</Typography>
            <Box>
                <LoginForm />
            </Box>
        </Container>
    )
}
