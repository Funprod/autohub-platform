'use client'

import { useGetDealershipCentersQuery } from '@/entities/dealership-center/api/dealershipCenterApi'

import { SelectForm } from '@/shared/ui/form/SelectForm'

import { Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Control, UseFormSetValue, useWatch } from 'react-hook-form'
import type { RegistrationFormValues } from '../../model/schema'

interface Props {
    control: Control<RegistrationFormValues>
    setValue: UseFormSetValue<RegistrationFormValues>
}

const TYPE_OPTIONS = [
    { value: 'dealership-center', label: 'Дилерский центр' },
    { value: 'call-center', label: 'Колл-центр' },
]

const ROLE_OPTIONS = [
    { value: 'manager', label: 'Менеджер' },
    { value: 'operator', label: 'Оператор' },
    { value: 'supervisor', label: 'Супервайзер' },
    { value: 'analyst', label: 'Аналитик' },
]

export const WorkInfoStep = ({ control, setValue }: Props) => {
    const selectedType = useWatch({ control, name: 'type' })

    const { data, isLoading, isError } = useGetDealershipCentersQuery(
        selectedType,
        {
            skip: !selectedType,
        }
    )

    const BRANCH_OPTIONS = data
        ? data.map((center) => ({ value: center.id, label: center.name }))
        : []

    useEffect(() => {
        if (!selectedType) {
            return
        }
        setValue('branch', '')
    }, [selectedType, setValue])

    return (
        <Stack spacing={2}>
            <SelectForm
                control={control}
                name="type"
                label="Тип"
                options={TYPE_OPTIONS}
            />
            <SelectForm
                control={control}
                name="role"
                label="Должность"
                options={ROLE_OPTIONS}
            />
            {isLoading && <Typography>Загрузка филиалов</Typography>}
            {isError && (
                <Typography>Произошла ошибка, попробуйте позже</Typography>
            )}
            {selectedType && !isLoading && !isError && (
                <SelectForm
                    control={control}
                    name="branch"
                    label="Филиал"
                    options={BRANCH_OPTIONS}
                />
            )}
        </Stack>
    )
}
