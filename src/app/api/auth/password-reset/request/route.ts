import {
    createPasswordResetCode,
    findUserByEmail,
} from '@/shared/lib/server/mock-db'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    const { email } = await request.json()
    const user = findUserByEmail(email)

    if (!user) {
        return NextResponse.json({ success: true })
    }

    const code = createPasswordResetCode(email)

    try {
        await resend.emails.send({
            from: 'AutoHub Platform <onboarding@resend.dev>',
            to: email,
            subject: 'Код для восстановления пароля',
            html: `
        <div>
          <h2>Восстановление пароля</h2>
          <p>Ваш код для сброса пароля:</p>
          <h1>${code}</h1>
          <p>Код действителен 10 минут.</p>
        </div>
      `,
        })
    } catch (err) {
        console.error('Ошибка отправки email:', err)
        return NextResponse.json(
            { message: 'Не удалось отправить письмо, попробуйте позже' },
            { status: 500 }
        )
    }

    return NextResponse.json({ success: true })
}
