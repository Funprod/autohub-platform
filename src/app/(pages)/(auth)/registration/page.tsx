import { RegistrationForm } from '@/features/auth/registration/ui/RegistrationForm'
import { Box, Container, Typography } from '@mui/material'

export default function RegistrationPage() {
    return (
        <Container maxWidth="sm">
            <Typography>Регистрация</Typography>
            <Box>
                <RegistrationForm />
            </Box>
        </Container>
    )
}
