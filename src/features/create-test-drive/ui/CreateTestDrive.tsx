'use client'
import {
    isErrorWithMessage,
    isFetchBaseQueryError,
} from '@/shared/lib/api/error-helpers'
import { useAppDispatch } from '@/shared/lib/hooks/redux-hooks'
import { addNotification } from '@/shared/model/notifications/slice'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateTestDriveMutation } from '../api/createTestDriveApi'
import { TestDriveFormValues, testDriveSchema } from '../model/schema'
import { AttachmentsSection } from './sections/AttachmentsSection'
import { CarSelectionSection } from './sections/CarSelectionSection'
import { ClientSection } from './sections/ClientSection'
import { DriverLicenseSection } from './sections/DriverLicenseSection'
import { LogisticsSection } from './sections/LogisticsSection'
import { ManagementSection } from './sections/ManagementSection'
import { TradeInSection } from './sections/TradeInSection'

const SECTIONS_FIELDS: Record<number, (keyof TestDriveFormValues)[]> = {
    1: [
        'firstName',
        'lastName',
        'middleName',
        'email',
        'preferredContactMethod',
        'birthDate',
        'phone',
    ],
    2: [
        'driverLicenseSeries',
        'driverLicenseNumber',
        'driverLicenseCategory',
        'driverLicenseExpiresAt',
    ],
    3: ['brand', 'model', 'configuration', 'color'],
    4: [
        'tradeIn',
        'tradeInCarBrand',
        'tradeInCarModel',
        'tradeInCarYear',
        'tradeInCarMileage',
    ],
    5: [
        'date',
        'time',
        'duration',
        'dealershipCenterId',
        'location',
        'address',
    ],
    6: [
        'managerId',
        'leadSource',
        'status',
        'internalComment',
        'clientComment',
    ],
    7: ['attachments'],
}

export const CreateTestDrive = () => {
    const { control, setValue, handleSubmit, trigger, reset } = useForm({
        resolver: zodResolver(testDriveSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            middleName: '',
            phone: '',
            email: '',
            driverLicenseSeries: '',
            driverLicenseNumber: '',
            brand: '',
            model: '',
            configuration: '',
            color: '',
            time: '',
            duration: '15',
            dealershipCenterId: '',
            address: '',
            tradeIn: false,
            tradeInCarBrand: '',
            tradeInCarModel: '',
            tradeInCarYear: '',
            tradeInCarMileage: '',
            managerId: '',
            leadSource: 'website',
            status: 'NEW',
            internalComment: '',
            clientComment: '',
            attachments: [],
        },
    })

    const [section, setSection] = useState<number>(1)

    const dispatch = useAppDispatch()

    const [createTestDrive] = useCreateTestDriveMutation()

    const onSubmit = async (data: TestDriveFormValues) => {
        try {
            await createTestDrive(data).unwrap()
            dispatch(
                addNotification({
                    id: crypto.randomUUID(),
                    type: 'success',
                    message: 'Заявка на тест-драйв создана',
                })
            )
            reset()
            setSection(1)
        } catch (err) {
            const errorMessage =
                isFetchBaseQueryError(err) && isErrorWithMessage(err.data)
                    ? err.data.message
                    : 'Попробуйте позже'
            dispatch(
                addNotification({
                    id: crypto.randomUUID(),
                    type: 'error',
                    message: `Заявка не создана, произошла ошибка - ${errorMessage}}`,
                })
            )
        }
    }

    const handleNextSection = async () => {
        const isValid = await trigger(SECTIONS_FIELDS[section])
        if (isValid) {
            setSection(section + 1)
        }
    }

    const handleBackSection = () => {
        setSection(section - 1)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <Stack spacing={2}>
                        {section === 1 && <ClientSection control={control} />}
                        {section === 2 && (
                            <DriverLicenseSection control={control} />
                        )}
                        {section === 3 && (
                            <CarSelectionSection
                                control={control}
                                setValue={setValue}
                            />
                        )}
                        {section === 4 && (
                            <TradeInSection
                                control={control}
                                setValue={setValue}
                            />
                        )}
                        {section === 5 && (
                            <LogisticsSection control={control} />
                        )}
                        {section === 6 && (
                            <ManagementSection
                                control={control}
                                setValue={setValue}
                            />
                        )}
                        {section === 7 && (
                            <AttachmentsSection control={control} />
                        )}
                    </Stack>
                    <Stack spacing={2} sx={{ flexDirection: 'row' }}>
                        {section > 1 && (
                            <Button type="button" onClick={handleBackSection}>
                                Назад
                            </Button>
                        )}
                        {section < 7 && (
                            <Button type="button" onClick={handleNextSection}>
                                Далее
                            </Button>
                        )}
                        {section === 7 && (
                            <Button type="submit">Отправить</Button>
                        )}
                    </Stack>
                </Stack>
            </LocalizationProvider>
        </form>
    )
}
