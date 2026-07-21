import { CreateTestDrive } from '@/features/create-test-drive/ui/CreateTestDrive'
import { RequireRole } from '@/processes/require-role/ui/RequireRole'

export default function CreateTestDrivePage() {
    return (
        <RequireRole allowedRoles={['operator', 'manager', 'admin']}>
            <CreateTestDrive />
        </RequireRole>
    )
}
