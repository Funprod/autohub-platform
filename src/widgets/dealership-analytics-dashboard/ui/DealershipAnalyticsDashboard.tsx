'use client'
import { useGetAnalyticsQuery } from '@/entities/analytics/api/analyticsApi'
import { useGetDealershipCentersQuery } from '@/entities/dealership-center/api/dealershipCenterApi'

import { SimpleDatePicker } from '@/shared/ui/form/SimpleDatePicker'
import { Box, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { PickerValue } from '@mui/x-date-pickers/internals'
import { useState } from 'react'
import { ContractsChart } from './charts/ContractsChart'
import { ConversionChart } from './charts/ConversionChart'
import { SalesChart } from './charts/SalesChart'
import { TrafficChart } from './charts/TrafficChart'

export const DealershipAnalyticsDashboard = () => {
    const [dealershipCenterId, setDealershipCenterId] = useState('')
    const [from, setFrom] = useState<Date | null>(null)
    const [to, setTo] = useState<Date | null>(null)
    const { data: centers } = useGetDealershipCentersQuery('dealership-center')
    const { data: analytics, isLoading } = useGetAnalyticsQuery(
        {
            dealershipCenterId,
            from: from ? from.toISOString().split('T')[0] : '',
            to: to ? to.toISOString().split('T')[0] : '',
        },
        {
            skip: !dealershipCenterId || !from || !to,
        }
    )

    const handleDatePickerFrom = (value: PickerValue) => {
        setFrom(value)
    }
    const handleDatePickerTo = (value: PickerValue) => {
        setTo(value)
    }

    return (
        <Box>
            <Stack spacing={3}>
                <TextField
                    select
                    label="Выберите Дилерский центр"
                    value={dealershipCenterId}
                    onChange={(e) => setDealershipCenterId(e.target.value)}
                    sx={{
                        width: '270px',
                    }}
                >
                    {(centers ?? []).map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Stack direction="row" spacing={2}>
                    <SimpleDatePicker
                        label="Выберите откуда начать"
                        value={from}
                        onChange={handleDatePickerFrom}
                    />
                    <SimpleDatePicker
                        label="Выберите до куда искать"
                        value={to}
                        onChange={handleDatePickerTo}
                    />
                </Stack>
                {isLoading && <Typography>Загрузка...</Typography>}
                {analytics && (
                    <>
                        <ContractsChart data={analytics} />
                        <ConversionChart data={analytics} />
                        <SalesChart data={analytics} />
                        <TrafficChart data={analytics} />
                    </>
                )}
            </Stack>
        </Box>
    )
}
