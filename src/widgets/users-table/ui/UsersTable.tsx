'use client'

import {
    useGetUsersQuery,
    useUpdateUserRoleMutation,
} from '@/entities/user/api/userApi'
import { ROLE_LABELS } from '@/entities/user/model/constants'
import { Role, User } from '@/entities/user/model/types'
import {
    isErrorWithMessage,
    isFetchBaseQueryError,
} from '@/shared/lib/api/error-helpers'
import { exportToExcel } from '@/shared/lib/export/exportToExcel'
import { Box, Button, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'firstName', headerName: 'Имя', width: 150 },
    { field: 'surname', headerName: 'Фамилия', width: 150 },
    {
        field: 'role',
        headerName: 'Роль',
        width: 150,
        editable: true,
        type: 'singleSelect',
        valueOptions: Object.entries(ROLE_LABELS).map(([value, label]) => ({
            value,
            label,
        })),
        valueFormatter: (value: Role) => ROLE_LABELS[value] ?? value,
    },
    { field: 'dealershipCenterId', headerName: 'Филиал', width: 130 },
]

export const UsersTable = () => {
    const { data, isLoading, error } = useGetUsersQuery()

    const [updateUserRole] = useUpdateUserRoleMutation()

    const processRowUpdate = async (newRow: User, oldRow: User) => {
        if (newRow.role !== oldRow.role) {
            await updateUserRole({
                id: newRow.id,
                role: newRow.role,
            }).unwrap()
        }

        return newRow
    }

    const handleExport = () => {
        exportToExcel(
            data?.map((u) => ({ ...u, role: ROLE_LABELS[u.role] })) ?? [],
            [
                { key: 'id', label: 'ID' },
                { key: 'email', label: 'Email' },
                { key: 'firstName', label: 'Имя' },
                { key: 'surname', label: 'Фамилия' },
                { key: 'role', label: 'Роль' },
                { key: 'dealershipCenterId', label: 'Филиал' },
            ],
            'users-export'
        )
    }

    return (
        <Box>
            {error && (
                <Typography color="error">
                    {isFetchBaseQueryError(error) &&
                    isErrorWithMessage(error.data)
                        ? error.data.message
                        : 'Произошла ошибка, попробуйте позже'}
                </Typography>
            )}
            <DataGrid
                rows={data ?? []}
                columns={columns}
                loading={isLoading}
                pageSizeOptions={[5, 10, 25]}
                processRowUpdate={processRowUpdate}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
            />
            <Button onClick={handleExport}>Экспорт в Excel</Button>
        </Box>
    )
}
