'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
    const { control, setValue, handleSubmit, trigger } =
        useForm<RegistrationFormValues>({
            resolver: zodResolver(registrationSchema),
        })

    const handleNext = async () => {
        const isValid = await trigger(STEPS_FIELDS[step])
        if (isValid) {
            setStep(step + 1)
        }
    }

    const handleBack = () => {
        setStep((prev) => prev - 1)
    }

    const onSubmit = (data: RegistrationFormValues) => {
        // тут будет вызов мутации register — добавим отдельным шагом
        console.log(data)
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
            </Stack>
        </form>
    )
}
