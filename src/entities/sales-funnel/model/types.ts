export interface FunnelStageData {
    plan: number
    fact: number
}

export interface FunnelRow {
    managerId: string
    managerName: string
    dealershipCenterId: string
    stages: {
        traffic: FunnelStageData
        testDrives: FunnelStageData
        requests: FunnelStageData
        deals: FunnelStageData
        sales: FunnelStageData
    }
}

export interface FunnelRowRequestParams {
    dealershipCenterId: string
    period: string
}
