import { signAccessToken, signRefreshToken } from '@/shared/lib/server/jwt'
import { createUser, findUserByEmail } from '@/shared/lib/server/mock-db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
        return NextResponse.redirect(
            new URL('/login?error=oauth_failed', request.url)
        )
    }

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
            code,
            grant_type: 'authorization_code',
        }),
    })

    if (!tokenResponse.ok) {
        return NextResponse.redirect(
            new URL('/login?error=oauth_failed', request.url)
        )
    }

    const tokens = await tokenResponse.json()

    const profileResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        }
    )
    const profile = await profileResponse.json()

    let user = findUserByEmail(profile.email)
    if (!user) {
        user = createUser({
            email: profile.email,
            firstName: profile.given_name ?? '',
            surname: profile.family_name ?? '',
            role: 'manager',
            dealershipCenterId: null,
            passwordHash: '',
        })
    }

    const accessToken = await signAccessToken({ sub: user.id, role: user.role })
    const refreshToken = await signRefreshToken({ sub: user.id })

    const response = NextResponse.redirect(new URL('/', request.url))
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
