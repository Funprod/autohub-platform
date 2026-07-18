import { RequireRole } from '@/processes/require-role/ui/RequireRole'
import { SalesFunnelTable } from '@/widgets/sales-funnel-table/ui/SalesFunnelTable'

export default function SalesFunnelPage() {
    return (
        <RequireRole
            allowedRoles={['admin', 'analyst', 'dealership-head', 'manager']}
        >
            <SalesFunnelTable />
        </RequireRole>
    )
}
