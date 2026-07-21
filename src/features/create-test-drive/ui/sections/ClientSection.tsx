'use client'
import { DatePickerFormField } from '@/shared/ui/form/DatePickerFormField'
import { InputForm } from '@/shared/ui/form/InputForm'
import { SelectForm } from '@/shared/ui/form/SelectForm'
import { Stack } from '@mui/material'
import { Control } from 'react-hook-form'
import { TestDriveFormInput } from '../../model/schema'

interface Props {
    control: Control<TestDriveFormInput>
}

const CONTACT_OPTIONS = [
    { value: 'phone', label: 'Телефон' },
    { value: 'email', label: 'Email' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'whatsapp', label: 'Whatsapp' },
]

export const ClientSection = ({ control }: Props) => {
    return (
        <Stack spacing={2}>
            <InputForm control={control} label="Имя" name="firstName" />
            <InputForm control={control} label="Фамилия" name="lastName" />
            <InputForm control={control} label="Отчество" name="middleName" />
            <InputForm control={control} label="Email" name="email" />
            <InputForm control={control} label="Номер Телефона" name="phone" />
            <SelectForm
                control={control}
                label="Выберите способ связи"
                name="preferredContactMethod"
                options={CONTACT_OPTIONS}
            />
            <DatePickerFormField
                control={control}
                label="Дата рождения"
                name="birthDate"
            />
        </Stack>
    )
}
