'use client'

import type { AnalyticsDataPoint } from '@/entities/analytics/model/types'
import { Box, Typography } from '@mui/material'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

interface Props {
    data: AnalyticsDataPoint[]
}
export const ContractsChart = ({ data }: Props) => {
    const chartWidth = Math.max(data.length * 80, 800)

    return (
        <Box
            sx={{
                maxWidth: '1600px',
                overflowX: 'auto',
            }}
        >
            <Typography>Сделки</Typography>
            <BarChart width={chartWidth} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="contracts" fill="#1976d2" name="Сделки" />
            </BarChart>
        </Box>
    )
}
