export interface AnalyticsDataPoint {
    date: string
    traffic: number
    sales: number
    contracts: number
    conversion: number
}

export interface RequestParamsAnalytics {
    dealershipCenterId: string
    from: string
    to: string
}
