import { LoginForm } from '@/features/auth/by-email/ui/LoginForm'
import { Container } from '@mui/material'

export default function LoginPage() {
    return (
        <Container maxWidth="sm">
            <LoginForm />
        </Container>
    )
}
