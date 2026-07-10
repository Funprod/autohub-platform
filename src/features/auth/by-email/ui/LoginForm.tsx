'use client'

import {
    isErrorWithMessage,
    isFetchBaseQueryError,
} from '@/shared/lib/api/error-helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@mui/material'

import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { useLoginMutation } from '../api/authApi'
import { LoginFormValues, loginSchema } from '../model/schema'

export const LoginForm = () => {
    const route = useRouter()

    const { handleSubmit, control } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    })

    const [login, { isLoading, error }] = useLoginMutation()

    const handleLogin = async (data: LoginFormValues) => {
        const res = await login(data)
        if (!res.error) {
            route.push('/')
        }
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            {error &&
                isFetchBaseQueryError(error) &&
                isErrorWithMessage(error.data) && <p>{error.data.message}</p>}
            <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Email"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Password"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />
            <Button disabled={isLoading} type="submit">
                Войти
            </Button>
        </form>
    )
}
