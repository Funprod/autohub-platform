import { CAR_CATALOG } from '@/shared/lib/server/mock-car-catalog'
import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json(CAR_CATALOG)
}
