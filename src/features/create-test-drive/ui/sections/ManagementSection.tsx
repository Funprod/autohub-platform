'use client'
import { useAppSelector } from '@/shared/lib/hooks/redux-hooks'
import { InputForm } from '@/shared/ui/form/InputForm'
import { SelectForm } from '@/shared/ui/form/SelectForm'
import { Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Control, UseFormSetValue } from 'react-hook-form'
import { LEAD_SOURCE, STATUS_BID, TestDriveFormInput } from '../../model/schema'

interface Props {
    control: Control<TestDriveFormInput>
    setValue: UseFormSetValue<TestDriveFormInput>
}

const LEAD_SOURCE_LABELS: Record<(typeof LEAD_SOURCE)[number], string> = {
    website: 'Сайт',
    phone: 'Телефонный звонок',
    advertisement: 'Реклама',
    social: 'Социальные сети',
    walk_in: 'Заход в салон',
    other: 'Другое',
}

const STATUS_LABELS: Record<(typeof STATUS_BID)[number], string> = {
    NEW: 'Новая',
    CONFIRMED: 'Подтверждена',
    COMPLETED: 'Завершена',
    CANCELLED: 'Отменена',
    NO_SHOW: 'Клиент не пришёл',
    RESCHEDULED: 'Перенесена',
}

export const ManagementSection = ({ control, setValue }: Props) => {
    const currentUser = useAppSelector((state) => state.userReducer.user)
    const isManagerOrOperator =
        currentUser?.role === 'manager' || currentUser?.role === 'operator'

    useEffect(() => {
        if (isManagerOrOperator && currentUser) {
            setValue('managerId', currentUser.id)
        }
    }, [isManagerOrOperator, currentUser, setValue])

    return (
        <Stack spacing={2}>
            {isManagerOrOperator && currentUser && (
                <Typography>
                    Ответственный: {currentUser.firstName} {currentUser.surname}
                </Typography>
            )}
            <SelectForm
                control={control}
                name="leadSource"
                label="Источник обращение"
                options={LEAD_SOURCE.map((ls) => ({
                    label: LEAD_SOURCE_LABELS[ls],
                    value: ls,
                }))}
            />
            <SelectForm
                control={control}
                name="status"
                label="Статус заявки"
                options={STATUS_BID.map((sb) => ({
                    label: STATUS_LABELS[sb],
                    value: sb,
                }))}
                disabled
            />
            <InputForm
                control={control}
                name="internalComment"
                label="Комментарий"
                multiline
                rows={4}
            />
            <InputForm
                control={control}
                name="clientComment"
                label="Пожеланий клиента"
                multiline
                rows={4}
            />
        </Stack>
    )
}
