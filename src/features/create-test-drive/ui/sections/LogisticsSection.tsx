'use client'
import { Stack } from '@mui/material'

import { useGetDealershipCentersQuery } from '@/entities/dealership-center/api/dealershipCenterApi'
import { DatePickerFormField } from '@/shared/ui/form/DatePickerFormField'
import { InputForm } from '@/shared/ui/form/InputForm'
import { SelectForm } from '@/shared/ui/form/SelectForm'
import { Control, useWatch } from 'react-hook-form'
import { generateTimeSlots } from '../../model/generateTimeSlots'
import { TestDriveFormInput } from '../../model/schema'

interface Props {
    control: Control<TestDriveFormInput>
}

const DURATION_OPTIONS = ['15', '30', '45', '60', '90']
const LOCATION_OPTIONS = [
    { value: 'showroom', label: 'В дилерском центре' },
    { value: 'client-address', label: 'Ваш адрес' },
]

export const LogisticsSection = ({ control }: Props) => {
    const timeOptions = generateTimeSlots()
    const { data } = useGetDealershipCentersQuery('dealership-center')
    const location = useWatch({ control, name: 'location' })

    const dealershipCenterOptions = data
        ? data.map((dc) => ({ value: dc.id, label: dc.name }))
        : []

    return (
        <Stack spacing={2}>
            <DatePickerFormField
                control={control}
                label="Выберите дату"
                name="date"
            />
            <SelectForm
                control={control}
                label="Выберите время"
                name="time"
                options={timeOptions}
            />
            <SelectForm
                control={control}
                label="Выберите продолжительность"
                name="duration"
                options={DURATION_OPTIONS.map((duration) => ({
                    value: duration,
                    label: duration,
                }))}
            />
            <SelectForm
                control={control}
                label="Выберите Дилерский центр"
                name="dealershipCenterId"
                options={dealershipCenterOptions}
            />
            <SelectForm
                control={control}
                label="Выберите где будет проходит тест-драйв"
                name="location"
                options={LOCATION_OPTIONS}
            />
            {location === 'client-address' && (
                <InputForm
                    control={control}
                    label="Введите адрес"
                    name="address"
                />
            )}
        </Stack>
    )
}
