import { RequireRole } from '@/processes/require-role/ui/RequireRole'
import { UsersTable } from '@/widgets/users-table/ui/UsersTable'

export default function AdminPage() {
    return (
        <RequireRole allowedRoles={['admin']}>
            <UsersTable />
        </RequireRole>
    )
}
