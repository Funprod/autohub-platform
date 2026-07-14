'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
    isErrorWithMessage,
    isFetchBaseQueryError,
} from '@/shared/lib/api/error-helpers'
import { useRouter } from 'next/navigation'
import { useRegisterMutation } from '../api/registrationApi'
import { RegistrationFormValues, registrationSchema } from '../model/schema'
import { CredentialsStep } from './steps/CredentialsStep'
import { PersonalInfoStep } from './steps/PersonalInfoStep'
import { WorkInfoStep } from './steps/WorkInfoStep'

const STEPS_FIELDS: Record<number, (keyof RegistrationFormValues)[]> = {
    1: ['firstName', 'surname'],
    2: ['type', 'role', 'branch'],
    3: ['email', 'password', 'confirmPassword'],
}

export const RegistrationForm = () => {
    const [step, setStep] = useState(1)
    const router = useRouter()
    const { control, setValue, handleSubmit, trigger } =
        useForm<RegistrationFormValues>({
            resolver: zodResolver(registrationSchema),
            defaultValues: {
                firstName: '',
                surname: '',
                type: '' as RegistrationFormValues['type'],
                role: '' as RegistrationFormValues['role'],
                branch: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
        })

    const [registration, { isLoading, error }] = useRegisterMutation()

    const handleNext = async () => {
        const isValid = await trigger(STEPS_FIELDS[step])
        if (isValid) {
            setStep(step + 1)
        }
    }

    const handleBack = () => {
        setStep((prev) => prev - 1)
    }

    const onSubmit = async (data: RegistrationFormValues) => {
        const { confirmPassword: _confirmPassword, ...rest } = data
        const result = await registration(rest)
        if (!result.error) {
            router.push('/')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {step === 1 && <PersonalInfoStep control={control} />}
                {step === 2 && (
                    <WorkInfoStep control={control} setValue={setValue} />
                )}
                {step === 3 && <CredentialsStep control={control} />}
                <Stack direction="row" spacing={2}>
                    {step > 1 && (
                        <Button type="button" onClick={handleBack}>
                            Назад
                        </Button>
                    )}
                    {step < 3 && (
                        <Button type="button" onClick={handleNext}>
                            Далее
                        </Button>
                    )}
                    {step === 3 && (
                        <Button type="submit">Зарегистрироваться</Button>
                    )}
                </Stack>
                {isLoading && <Typography>Регистрация...</Typography>}
                {error && (
                    <Typography color="error">
                        {isFetchBaseQueryError(error) &&
                        isErrorWithMessage(error.data)
                            ? error.data.message
                            : 'Произошла ошибка, попробуйте позже'}
                    </Typography>
                )}
            </Stack>
        </form>
    )
}
