import { generateFunnelData } from '@/shared/lib/server/mock-funnel'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const dealershipCenterId = searchParams.get('dealershipCenterId')
    const period = searchParams.get('period')

    if (!dealershipCenterId || !period) {
        return NextResponse.json(
            { message: 'Не хватает параметров: dealershipCenterId, period' },
            { status: 400 }
        )
    }

    const data = generateFunnelData(dealershipCenterId, period)
    return NextResponse.json(data)
}
