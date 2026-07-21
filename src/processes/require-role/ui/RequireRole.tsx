'use client'
import { Role } from '@/entities/user/model/types'
import { useAppSelector } from '@/shared/lib/hooks/redux-hooks'
import { Typography } from '@mui/material'

type Props = {
    allowedRoles: Role[]
    children: React.ReactNode
}

export const RequireRole = ({ allowedRoles, children }: Props) => {
    const role = useAppSelector((state) => state.userReducer.user?.role)

    if (!role || !allowedRoles.includes(role)) {
        return <Typography color="error">Доступ запрещен</Typography>
    }

    return children
}
