import { FunnelRow } from '@/entities/sales-funnel/model/types'
import { Box, Stack, Typography } from '@mui/material'
import {
    Funnel,
    FunnelChart,
    LabelList,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'

interface Props {
    managerRow: FunnelRow
}

export const ManagerFunnelChart = ({ managerRow }: Props) => {
    const funnelData = [
        {
            name: 'Трафик',
            value: managerRow.stages.traffic.fact,
            fill: '#8884d8',
        },
        {
            name: 'Тест-драйвы',
            value: managerRow.stages.testDrives.fact,
            fill: '#83a6ed',
        },
        {
            name: 'Заявки',
            value: managerRow.stages.requests.fact,
            fill: '#8dd1e1',
        },
        {
            name: 'Сделки',
            value: managerRow.stages.deals.fact,
            fill: '#82ca9d',
        },
        {
            name: 'Продажи',
            value: managerRow.stages.sales.fact,
            fill: '#a4de6c',
        },
    ]

    return (
        <Box sx={{ width: '500px' }}>
            <Stack sx={{ alignItems: 'center' }}>
                <Typography>{managerRow.managerName}</Typography>
            </Stack>
            <ResponsiveContainer width="100%" height={500}>
                <FunnelChart>
                    <Tooltip />
                    <Funnel dataKey="value" data={funnelData} isAnimationActive>
                        <LabelList
                            position="right"
                            fill="#000"
                            stroke="none"
                            dataKey="name"
                        />
                    </Funnel>
                </FunnelChart>
            </ResponsiveContainer>
        </Box>
    )
}
