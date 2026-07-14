import { DEALERSHIP_CENTERS } from '@/shared/lib/server/mock-dealership-centers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    const centers = type
        ? DEALERSHIP_CENTERS.filter((c) => c.type === type)
        : DEALERSHIP_CENTERS

    return NextResponse.json(centers)
}
