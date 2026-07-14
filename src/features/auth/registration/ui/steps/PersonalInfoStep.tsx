'use client'

import { InputForm } from '@/shared/ui/form/InputForm'
import { Stack } from '@mui/material'
import { Control } from 'react-hook-form'
import type { RegistrationFormValues } from '../../model/schema'

interface Props {
    control: Control<RegistrationFormValues>
}

export const PersonalInfoStep = ({ control }: Props) => {
    return (
        <Stack spacing={2}>
            <InputForm control={control} name="firstName" label="Имя" />
            <InputForm control={control} name="surname" label="Фамилия" />
        </Stack>
    )
}
