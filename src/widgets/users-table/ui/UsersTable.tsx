'use client'

import { useGetUsersQuery } from '@/entities/user/api/userApi'
import { ROLE_LABELS } from '@/entities/user/model/constants'
import { Role } from '@/entities/user/model/types'
import {
    isErrorWithMessage,
    isFetchBaseQueryError,
} from '@/shared/lib/api/error-helpers'
import { Typography } from '@mui/material'
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
        valueGetter: (value: Role) => ROLE_LABELS[value] ?? value,
    },
    { field: 'dealershipCenterId', headerName: 'Филиал', width: 130 },
]

export const UsersTable = () => {
    const { data, isLoading, error } = useGetUsersQuery()

    return (
        <>
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
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
            />
        </>
    )
}
