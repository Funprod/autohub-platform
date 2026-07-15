'use client'

import {
    isErrorWithMessage,
    isFetchBaseQueryError,
} from '@/shared/lib/api/error-helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    useConfirmMutation,
    usePasswordResetMutation,
    useVerifyCodeMutation,
} from '../api/passwordResetApi'
import { passwordResetSchema, type PasswordResetValues } from '../model/schema'

import { RequestCodeStep } from './steps/RequestCodeStep'
import { NewPasswordStep } from './steps/NewPasswordStep'
import { VerifyCodeStep } from './steps/VerifyCodeStep'

export const PasswordResetFlow = () => {
    const [step, setStep] = useState(1)
    const router = useRouter()

    const { control, handleSubmit, trigger, getValues } =
        useForm<PasswordResetValues>({
            resolver: zodResolver(passwordResetSchema),
            defaultValues: {
                email: '',
                code: '',
                password: '',
                confirmPassword: '',
            },
        })

    const [requestCode, { isLoading: isRequestLoading, error: requestError }] =
        usePasswordResetMutation()
    const [verifyCode, { isLoading: isVerifyLoading, error: verifyError }] =
        useVerifyCodeMutation()
    const [confirm, { isLoading: isConfirmLoading, error: confirmError }] =
        useConfirmMutation()

    const handleNext = async () => {
        if (step === 1) {
            const isValid = await trigger('email')
            if (!isValid) return

            const result = await requestCode({ email: getValues('email') })
            if (!result.error) {
                setStep(step + 1)
            }
        }
        if (step === 2) {
            const isValid = await trigger('code')
            if (!isValid) return

            const result = await verifyCode({
                code: getValues('code'),
                email: getValues('email'),
            })
            if (!result.error) {
                setStep(step + 1)
            }
        }
    }

    const onSubmit = async (data: PasswordResetValues) => {
        const { confirmPassword: _confirmPassword, ...rest } = data
        const result = await confirm(rest)

        if (!result.error) {
            router.push('/login')
        }
    }

    const isLoading = isRequestLoading || isVerifyLoading || isConfirmLoading

    const getErrorMessage = (error: unknown): string | null => {
        if (isFetchBaseQueryError(error) && isErrorWithMessage(error.data)) {
            return error.data.message
        }
        return null
    }

    const hasAnyError = !!requestError || !!verifyError || !!confirmError

    const errorMessage =
        getErrorMessage(requestError) ??
        getErrorMessage(verifyError) ??
        getErrorMessage(confirmError) ??
        (hasAnyError ? 'Произошла ошибка, попробуйте позже' : null)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {step === 1 && <RequestCodeStep control={control} />}
                {step === 2 && <VerifyCodeStep control={control} />}
                {step === 3 && <NewPasswordStep control={control} />}
                {step < 3 && (
                    <Button
                        type="button"
                        disabled={isLoading}
                        onClick={handleNext}
                    >
                        Далее
                    </Button>
                )}
                {step === 3 && (
                    <Button type="submit" disabled={isLoading}>
                        Отправить
                    </Button>
                )}
                {isLoading && <Typography>Загрузка...</Typography>}
                {errorMessage && (
                    <Typography color="error">{errorMessage}</Typography>
                )}
            </Stack>
        </form>
    )
}
