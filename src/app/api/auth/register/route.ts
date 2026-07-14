import { signAccessToken, signRefreshToken } from '@/shared/lib/server/jwt'
import {
    createUser,
    findUserByEmail,
    toPublicUser,
} from '@/shared/lib/server/mock-db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
    const { email, password, firstName, surname, role, branch } = body

    const existingUser = findUserByEmail(email)
    if (existingUser) {
        return NextResponse.json(
            { message: 'Пользователь с таким email уже зарегистрирован' },
            { status: 409 }
        )
    }

    const passwordHash = bcrypt.hashSync(password, 10)
    const newUser = createUser({
        email,
        firstName,
        surname,
        role,
        dealershipCenterId: branch,
        passwordHash,
    })

    const accessToken = await signAccessToken({
        sub: newUser.id,
        role: newUser.role,
    })
    const refreshToken = await signRefreshToken({ sub: newUser.id })

    const response = NextResponse.json(toPublicUser(newUser))

    response.cookies.set('access_token', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 15,
        path: '/',
    })
    response.cookies.set('refresh_token', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    })

    return response
}
