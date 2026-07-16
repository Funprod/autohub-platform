import { verifyAccessToken } from '@/shared/lib/server/jwt'
import { getAllUsers } from '@/shared/lib/server/mock-db'
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

        // Защита на уровне бэкенда — не только фронт должен проверять роль!
        if (payload.role !== 'admin') {
            return NextResponse.json(
                { message: 'Недостаточно прав' },
                { status: 403 }
            )
        }

        const users = getAllUsers()
        return NextResponse.json(users)
    } catch {
        return NextResponse.json(
            { message: 'Токен недействителен' },
            { status: 401 }
        )
    }
}
