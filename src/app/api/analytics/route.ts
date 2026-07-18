import { generateAnalytics } from '@/shared/lib/server/mock-analytics'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const dealershipCenterId = searchParams.get('dealershipCenterId')
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    if (!dealershipCenterId || !from || !to) {
        return NextResponse.json(
            { message: 'Не хватает параметров: dealershipCenterId, from, to' },
            { status: 400 }
        )
    }

    const data = generateAnalytics(dealershipCenterId, from, to)
    return NextResponse.json(data)
}
