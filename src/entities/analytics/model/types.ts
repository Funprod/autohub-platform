export interface AnalyticsDataPoint {
    date: string
    traffic: number
    sales: number
    contracts: number
    conversion: number
}

export interface AnalyticsRequestParams {
    dealershipCenterId: string
    from: string
    to: string
}
