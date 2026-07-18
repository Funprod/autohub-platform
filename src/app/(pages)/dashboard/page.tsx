import { RequireRole } from '@/processes/require-role/ui/RequireRole'
import { DealershipAnalyticsDashboard } from '@/widgets/dealership-analytics-dashboard/ui/DealershipAnalyticsDashboard'

export default function DashboardPage() {
    return (
        <RequireRole
            allowedRoles={['admin', 'analyst', 'dealership-head', 'manager']}
        >
            <DealershipAnalyticsDashboard />
        </RequireRole>
    )
}
