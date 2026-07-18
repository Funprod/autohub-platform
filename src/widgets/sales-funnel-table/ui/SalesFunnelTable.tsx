'use client'

import { useGetDealershipCentersQuery } from '@/entities/dealership-center/api/dealershipCenterApi'
import { useGetSalesFunnelQuery } from '@/entities/sales-funnel/api/salesFunnelApi'
import {
    isErrorWithMessage,
    isFetchBaseQueryError,
} from '@/shared/lib/api/error-helpers'
import { exportToExcel } from '@/shared/lib/export/exportToExcel'
import { FunnelRow, FunnelStageData } from '@/shared/lib/server/mock-funnel'
import {
    Box,
    Button,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { generatePeriodOptions } from '../model/generatePeriodOptions'
import { ManagerFunnelChart } from './charts/ManagerFunnelChart'

const columns: GridColDef[] = [
    {
        field: 'managerName',
        headerName: 'Имя',
        width: 150,
        valueGetter: (_, row: FunnelRow) => row.managerName,
        renderCell: (params) => {
            return (
                <span>
                    <span style={{ color: 'gray' }}>{params.value}</span>
                </span>
            )
        },
    },
    {
        field: 'traffic',
        headerName: 'Трафик',
        width: 150,
        valueGetter: (_, row: FunnelRow) => row.stages.traffic,
        renderCell: (params) => {
            const { plan, fact } = params.value as FunnelStageData
            const isUnderPlan = fact < plan
            return (
                <span>
                    <span style={{ color: isUnderPlan ? 'red' : 'green' }}>
                        {fact}
                    </span>
                    {' / '}
                    <span style={{ color: 'gray' }}>{plan}</span>
                </span>
            )
        },
    },
    {
        field: 'deals',
        headerName: 'сделки',
        width: 150,
        valueGetter: (_, row: FunnelRow) => row.stages.deals,
        renderCell: (params) => {
            const { plan, fact } = params.value as FunnelStageData
            const isUnderPlan = fact < plan
            return (
                <span>
                    <span style={{ color: isUnderPlan ? 'red' : 'green' }}>
                        {fact}
                    </span>
                    {' / '}
                    <span style={{ color: 'gray' }}>{plan}</span>
                </span>
            )
        },
    },
    {
        field: 'requests',
        headerName: 'запросы',
        width: 150,
        valueGetter: (_, row: FunnelRow) => row.stages.requests,
        renderCell: (params) => {
            const { plan, fact } = params.value as FunnelStageData
            const isUnderPlan = fact < plan
            return (
                <span>
                    <span style={{ color: isUnderPlan ? 'red' : 'green' }}>
                        {fact}
                    </span>
                    {' / '}
                    <span style={{ color: 'gray' }}>{plan}</span>
                </span>
            )
        },
    },
    {
        field: 'testDrives',
        headerName: 'Тест драйвы',
        width: 150,
        valueGetter: (_, row: FunnelRow) => row.stages.testDrives,
        renderCell: (params) => {
            const { plan, fact } = params.value as FunnelStageData
            const isUnderPlan = fact < plan
            return (
                <span>
                    <span style={{ color: isUnderPlan ? 'red' : 'green' }}>
                        {fact}
                    </span>
                    {' / '}
                    <span style={{ color: 'gray' }}>{plan}</span>
                </span>
            )
        },
    },
    {
        field: 'sales',
        headerName: 'Продажи',
        width: 150,
        valueGetter: (_, row: FunnelRow) => row.stages.sales,
        renderCell: (params) => {
            const { plan, fact } = params.value as FunnelStageData
            const isUnderPlan = fact < plan
            return (
                <span>
                    <span style={{ color: isUnderPlan ? 'red' : 'green' }}>
                        {fact}
                    </span>
                    {' / '}
                    <span style={{ color: 'gray' }}>{plan}</span>
                </span>
            )
        },
    },
]

export const SalesFunnelTable = () => {
    const [dealershipCenterId, setDealershipCenterId] = useState('')
    const PERIOD_OPTIONS = generatePeriodOptions(12)
    const [period, setPeriod] = useState<string>(PERIOD_OPTIONS[0].value)
    const [managerRow, setManagerRow] = useState<FunnelRow | null>(null)

    const { data: centers } = useGetDealershipCentersQuery('dealership-center')

    const { data, isLoading, error } = useGetSalesFunnelQuery(
        {
            dealershipCenterId: dealershipCenterId,
            period: period,
        },
        {
            skip: !period || !dealershipCenterId,
        }
    )

    const handleExport = () => {
        const flatData = (data ?? []).map((row) => ({
            managerName: row.managerName,
            trafficPlan: row.stages.traffic.plan,
            trafficFact: row.stages.traffic.fact,
            testDrivesPlan: row.stages.testDrives.plan,
            testDrivesFact: row.stages.testDrives.fact,
            requestsPlan: row.stages.requests.plan,
            requestsFact: row.stages.requests.fact,
            dealsPlan: row.stages.deals.plan,
            dealsFact: row.stages.deals.fact,
            salesPlan: row.stages.sales.plan,
            salesFact: row.stages.sales.fact,
        }))

        exportToExcel(
            flatData,
            [
                { key: 'managerName', label: 'Менеджер' },
                { key: 'trafficPlan', label: 'Трафик (план)' },
                { key: 'trafficFact', label: 'Трафик (факт)' },
                { key: 'testDrivesPlan', label: 'Тест-драйвы (план)' },
                { key: 'testDrivesFact', label: 'Тест-драйвы (факт)' },
                { key: 'requestsPlan', label: 'Заявки (план)' },
                { key: 'requestsFact', label: 'Заявки (факт)' },
                { key: 'dealsPlan', label: 'Сделки (план)' },
                { key: 'dealsFact', label: 'Сделки (факт)' },
                { key: 'salesPlan', label: 'Продажи (план)' },
                { key: 'salesFact', label: 'Продажи (факт)' },
            ],
            `sales-funnel-${period}`
        )
    }

    return (
        <Box>
            <Stack spacing={2}>
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
                <TextField
                    select
                    label="Выберите Период"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                >
                    {PERIOD_OPTIONS.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>
            {error && (
                <Typography color="error">
                    {isFetchBaseQueryError(error) &&
                    isErrorWithMessage(error.data)
                        ? error.data.message
                        : 'Произошла ошибка, попробуйте позже'}
                </Typography>
            )}
            {isLoading && <Typography>Загрузка...</Typography>}
            {data && (
                <DataGrid
                    getRowId={(row) => row.managerId}
                    rows={data ?? []}
                    columns={columns}
                    loading={isLoading}
                    pageSizeOptions={[5, 10, 25]}
                    onRowClick={(cell) => setManagerRow(cell.row)}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                />
            )}
            {managerRow && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ManagerFunnelChart managerRow={managerRow} />
                </Box>
            )}
            <Button onClick={handleExport}>Экспорт в Excel</Button>
        </Box>
    )
}
