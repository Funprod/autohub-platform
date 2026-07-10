import { signAccessToken, signRefreshToken } from '@/shared/lib/server/jwt'
import { findUserByEmail, toPublicUser } from '@/shared/lib/server/mock-db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { email, password } = await request.json()

    const user = findUserByEmail(email)
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return NextResponse.json(
            { message: 'Неверный email или пароль' },
            { status: 401 }
        )
    }

    const accessToken = await signAccessToken({ sub: user.id, role: user.role })
    const refreshToken = await signRefreshToken({ sub: user.id })

    const response = NextResponse.json(toPublicUser(user))

    response.cookies.set('access_token', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 15, // 15 минут
        path: '/',
    })
    response.cookies.set('refresh_token', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 дней
        path: '/',
    })

    return response
}
