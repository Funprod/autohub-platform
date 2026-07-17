'use client'

import {
    isErrorWithMessage,
    isFetchBaseQueryError,
} from '@/shared/lib/api/error-helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack, Typography } from '@mui/material'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { InputForm } from '@/shared/ui/form/InputForm'
import { Link } from '@/shared/ui/Link'
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
        <Stack spacing={3}>
            <Stack
                sx={{
                    alignItems: 'center',
                }}
            >
                <Typography>
                    Введите логин и пароль что бы продолжить
                </Typography>
            </Stack>
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
                    <Stack
                        spacing={2}
                        direction={'row'}
                        sx={{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Link href="/password-reset">Сброс пароля</Link>
                        <Link href="/registration">Регистрация</Link>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    )
}
