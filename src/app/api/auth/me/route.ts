import { verifyAccessToken } from '@/shared/lib/server/jwt'
import { findUserById, toPublicUser } from '@/shared/lib/server/mock-db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })
    }

    try {
        const payload = await verifyAccessToken(token)
        const user = findUserById(payload.sub)
        if (!user) {
            return NextResponse.json(
                { message: 'Пользователь не найден' },
                { status: 401 }
            )
        }
        return NextResponse.json(toPublicUser(user))
    } catch {
        // Токен истёк или невалиден — фронт должен среагировать на 401 и попробовать refresh
        return NextResponse.json(
            { message: 'Токен недействителен' },
            { status: 401 }
        )
    }
}
