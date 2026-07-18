export interface AnalyticsDataPoint {
    date: string
    traffic: number
    sales: number
    contracts: number
    conversion: number
}

export function generateAnalytics(
    dealershipCenterId: string,
    from: string,
    to: string
): AnalyticsDataPoint[] {
    const startDate = new Date(from)
    const endDate = new Date(to)
    const days = Math.max(
        1,
        Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        )
    )

    const seed = dealershipCenterId
        .split('')
        .reduce((acc, ch) => acc + ch.charCodeAt(0), 0)

    return Array.from({ length: days }, (_, i) => {
        const date = new Date(startDate)
        date.setDate(date.getDate() + i)

        const dayFactor = Math.sin((i + seed) * 0.3) * 0.5 + 1
        const traffic = Math.round(80 + dayFactor * 60)
        const sales = Math.round(traffic * (0.08 + Math.random() * 0.05))
        const contracts = Math.round(sales * (0.6 + Math.random() * 0.2))
        const conversion = Number(((sales / traffic) * 100).toFixed(1))

        return {
            date: date.toISOString().split('T')[0],
            traffic,
            sales,
            contracts,
            conversion,
        }
    })
}
