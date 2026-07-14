'use client'

import { InputForm } from '@/shared/ui/form/InputForm'
import { Stack } from '@mui/material'
import { Control } from 'react-hook-form'
import { RegistrationFormValues } from '../../model/schema'

interface Props {
    control: Control<RegistrationFormValues>
}

export const CredentialsStep = ({ control }: Props) => {
    return (
        <Stack spacing={2}>
            <InputForm control={control} name="email" label="Email" />
            <InputForm
                control={control}
                name="password"
                label="Пароль"
                type="password"
            />
            <InputForm
                control={control}
                name="confirmPassword"
                label="Подтвердите пароль"
                type="password"
            />
        </Stack>
    )
}
