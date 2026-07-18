'use client'

import type { AnalyticsDataPoint } from '@/entities/analytics/model/types'
import { Box, Typography } from '@mui/material'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

interface Props {
    data: AnalyticsDataPoint[]
}

export const SalesChart = ({ data }: Props) => {
    const chartWidth = Math.max(data.length * 80, 800)
    return (
        <Box
            sx={{
                maxWidth: '1600px',
                overflowX: 'auto',
            }}
        >
            <Typography>Продажи</Typography>
            <LineChart data={data} width={chartWidth} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#1976d2"
                    name="Продажи"
                />
            </LineChart>
        </Box>
    )
}
