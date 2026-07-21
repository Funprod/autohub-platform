'use client'
import { Button, Stack, Typography } from '@mui/material'

import { InputForm } from '@/shared/ui/form/InputForm'
import { Control, UseFormSetValue, useWatch } from 'react-hook-form'
import { TestDriveFormInput } from '../../model/schema'

interface Props {
    control: Control<TestDriveFormInput>
    setValue: UseFormSetValue<TestDriveFormInput>
}

export const TradeInSection = ({ control, setValue }: Props) => {
    const isTradeIn = useWatch({ control, name: 'tradeIn' })

    const handleYesBtn = () => {
        setValue('tradeIn', true)
    }
    const handleNoBtn = () => {
        setValue('tradeIn', false)
    }

    return (
        <Stack spacing={2}>
            <Typography>
                Планируете сдать свой автомобиль в Trade-in?
            </Typography>

            <Button
                type="button"
                variant={isTradeIn ? 'contained' : 'outlined'}
                onClick={handleYesBtn}
            >
                Да
            </Button>
            <Button
                type="button"
                variant={!isTradeIn ? 'contained' : 'outlined'}
                onClick={handleNoBtn}
            >
                Нет
            </Button>

            {isTradeIn && (
                <>
                    <InputForm
                        control={control}
                        label="Марка"
                        name="tradeInCarBrand"
                    />
                    <InputForm
                        control={control}
                        label="Модель"
                        name="tradeInCarModel"
                    />
                    <InputForm
                        control={control}
                        label="Год выпуска"
                        name="tradeInCarYear"
                        type="number"
                    />
                    <InputForm
                        control={control}
                        label="Пробег"
                        name="tradeInCarMileage"
                        type="number"
                    />
                </>
            )}
        </Stack>
    )
}
