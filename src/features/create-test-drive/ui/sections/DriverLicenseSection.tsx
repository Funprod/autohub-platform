'use client'
import { DatePickerFormField } from '@/shared/ui/form/DatePickerFormField'
import { InputForm } from '@/shared/ui/form/InputForm'
import { SelectForm } from '@/shared/ui/form/SelectForm'
import { Stack } from '@mui/material'
import { Control } from 'react-hook-form'
import {
    DRIVER_LICENSE_CATEGORIES,
    TestDriveFormInput,
} from '../../model/schema'

interface Props {
    control: Control<TestDriveFormInput>
}

export const DriverLicenseSection = ({ control }: Props) => {
    return (
        <Stack spacing={2}>
            <InputForm
                control={control}
                label="Серия"
                name="driverLicenseSeries"
            />
            <InputForm
                control={control}
                label="Номер"
                name="driverLicenseNumber"
            />
            <SelectForm
                control={control}
                label="Категория"
                name="driverLicenseCategory"
                options={DRIVER_LICENSE_CATEGORIES.map((category) => ({
                    label: category,
                    value: category,
                }))}
            />
            <DatePickerFormField
                control={control}
                label="Срок действия"
                name="driverLicenseExpiresAt"
            />
        </Stack>
    )
}
