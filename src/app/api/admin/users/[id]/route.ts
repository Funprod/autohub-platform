import { verifyAccessToken } from '@/shared/lib/server/jwt'
import { updateUserRole } from '@/shared/lib/server/mock-db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })
    }

    try {
        const payload = await verifyAccessToken(token)
        if (payload.role !== 'admin') {
            return NextResponse.json(
                { message: 'Недостаточно прав' },
                { status: 403 }
            )
        }

        const { id } = await params
        const { role } = await request.json()

        const updatedUser = updateUserRole(id, role)
        if (!updatedUser) {
            return NextResponse.json(
                { message: 'Пользователь не найден' },
                { status: 404 }
            )
        }

        return NextResponse.json(updatedUser)
    } catch {
        return NextResponse.json(
            { message: 'Токен недействителен' },
            { status: 401 }
        )
    }
}
