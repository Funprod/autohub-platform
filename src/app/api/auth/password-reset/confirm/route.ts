import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import {
    verifyPasswordResetCode,
    updateUserPassword,
} from '@/shared/lib/server/mock-db'

export async function POST(request: Request) {
    const { email, code, newPassword } = await request.json()

    const isValid = verifyPasswordResetCode(email, code)
    if (!isValid) {
        return NextResponse.json(
            { message: 'Неверный или истёкший код' },
            { status: 400 }
        )
    }

    const passwordHash = bcrypt.hashSync(newPassword, 10)
    updateUserPassword(email, passwordHash)

    return NextResponse.json({ success: true })
}
