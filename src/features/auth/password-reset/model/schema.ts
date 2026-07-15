import { z } from 'zod'

export const passwordResetSchema = z
    .object({
        email: z.string().email('Введите корректный email'),
        code: z
            .string()
            .min(6, 'Код должен содержать 6 цифр')
            .max(6, 'Код должен содержать 6 цифр'),
        password: z
            .string()
            .min(6, 'Пароль должен содержать минимум 6 символов'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    })

export type PasswordResetValues = z.infer<typeof passwordResetSchema>
