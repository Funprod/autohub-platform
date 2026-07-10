import { signAccessToken, verifyRefreshToken } from '@/shared/lib/server/jwt'
import { findUserById } from '@/shared/lib/server/mock-db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')?.value

    if (!refreshToken) {
        return NextResponse.json(
            { message: 'Refresh-токен отсутствует' },
            { status: 401 }
        )
    }

    try {
        const payload = await verifyRefreshToken(refreshToken)
        const user = findUserById(payload.sub)
        if (!user) {
            return NextResponse.json(
                { message: 'Пользователь не найден' },
                { status: 401 }
            )
        }

        const newAccessToken = await signAccessToken({
            sub: user.id,
            role: user.role,
        })
        const response = NextResponse.json({ success: true })
        response.cookies.set('access_token', newAccessToken, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 15,
            path: '/',
        })
        return response
    } catch {
        return NextResponse.json(
            { message: 'Refresh-токен недействителен' },
            { status: 401 }
        )
    }
}
