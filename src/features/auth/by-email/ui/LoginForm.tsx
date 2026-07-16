'use client'

import {
    isErrorWithMessage,
    isFetchBaseQueryError,
} from '@/shared/lib/api/error-helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Link, Stack, Typography } from '@mui/material'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { InputForm } from '@/shared/ui/form/InputForm'
import { GoogleLoginButton } from '../../by-google/ui/GoogleLoginButton'
import { useLoginMutation } from '../api/authByEmailApi'
import { LoginFormValues, loginSchema } from '../model/schema'

export const LoginForm = () => {
    const router = useRouter()

    const { handleSubmit, control } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const [login, { isLoading, error }] = useLoginMutation()

    const handleLogin = async (data: LoginFormValues) => {
        const res = await login(data)
        if (!res.error) {
            router.push('/')
        }
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            {error && (
                <Typography color="error">
                    {isFetchBaseQueryError(error) &&
                    isErrorWithMessage(error.data)
                        ? error.data.message
                        : 'Произошла ошибка, попробуйте позже'}
                </Typography>
            )}
            <Stack spacing={2}>
                <InputForm control={control} name="email" label="Email" />
                <InputForm
                    control={control}
                    name="password"
                    label="Password"
                    type="password"
                />
                <Stack spacing={2}>
                    <Button disabled={isLoading} type="submit">
                        Войти
                    </Button>
                    <GoogleLoginButton />
                </Stack>
                <Stack spacing={2} direction={'row'}>
                    <Link href="/registration">Регистрация</Link>
                    <Link href="/password-reset">Сброс пароля</Link>
                </Stack>
            </Stack>
        </form>
    )
}
