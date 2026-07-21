'use client'
import { useGetCarCatalogQuery } from '@/entities/car-catalog/api/carCatalogApi'
import { SelectForm } from '@/shared/ui/form/SelectForm'
import { Stack } from '@mui/material'
import { useEffect } from 'react'
import { Control, UseFormSetValue, useWatch } from 'react-hook-form'
import { TestDriveFormInput } from '../../model/schema'

interface Props {
    control: Control<TestDriveFormInput>
    setValue: UseFormSetValue<TestDriveFormInput>
}

export const CarSelectionSection = ({ control, setValue }: Props) => {
    const selectedBrandId = useWatch({ control, name: 'brand' })
    const selectedModelId = useWatch({ control, name: 'model' })
    const selectedConfigurationId = useWatch({ control, name: 'configuration' })

    const { data: catalog } = useGetCarCatalogQuery()

    useEffect(() => {
        if (!selectedBrandId) return
        setValue('model', '')
        setValue('configuration', '')
        setValue('color', '')
    }, [selectedBrandId, setValue])

    useEffect(() => {
        if (!selectedModelId) return
        setValue('configuration', '')
        setValue('color', '')
    }, [selectedModelId, setValue])

    useEffect(() => {
        if (!selectedConfigurationId) return
        setValue('color', '')
    }, [selectedConfigurationId, setValue])

    const selectedBrand = catalog?.find((b) => b.id === selectedBrandId)
    const availableModels = selectedBrand?.models ?? []

    const selectedModels = availableModels?.find(
        (m) => m.id === selectedModelId
    )
    const availableTrims = selectedModels?.trims ?? []

    const selectedTrims = availableTrims.find(
        (t) => t.id === selectedConfigurationId
    )
    const availableColors = selectedTrims?.colors ?? []

    const brandOptions =
        catalog?.map((b) => ({ value: b.id, label: b.name })) ?? []
    const modelOptions = availableModels.map((m) => ({
        value: m.id,
        label: m.name,
    }))
    const trimOptions = availableTrims.map((t) => ({
        value: t.id,
        label: t.name,
    }))
    const colorOptions = availableColors.map((color) => ({
        value: color,
        label: color,
    }))

    return (
        <Stack spacing={2}>
            <SelectForm
                control={control}
                name="brand"
                label="Бренд"
                options={brandOptions}
            />
            <SelectForm
                control={control}
                name="model"
                label="Модель"
                options={modelOptions}
            />
            <SelectForm
                control={control}
                name="configuration"
                label="Конфигурация"
                options={trimOptions}
            />
            <SelectForm
                control={control}
                name="color"
                label="Цвет"
                options={colorOptions}
            />
        </Stack>
    )
}
