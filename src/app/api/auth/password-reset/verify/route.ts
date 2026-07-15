import { NextResponse } from 'next/server'
import { verifyPasswordResetCode } from '@/shared/lib/server/mock-db'

export async function POST(request: Request) {
    const { email, code } = await request.json()
    const isValid = verifyPasswordResetCode(email, code)

    if (!isValid) {
        return NextResponse.json(
            { message: 'Неверный или истёкший код' },
            { status: 400 }
        )
    }

    return NextResponse.json({ success: true })
}
