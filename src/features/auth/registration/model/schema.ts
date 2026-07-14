import { DealershipCenterType } from '@/entities/dealership-center/model/types'
import { Role } from '@/entities/user/model/types'
import { z } from 'zod'

const REGISTRABLE_ROLES = [
    'manager',
    'operator',
    'supervisor',
    'analyst',
] as const satisfies readonly Role[]

const REGISTRABLE_TYPE = [
    'dealership-center',
    'call-center',
] as const satisfies readonly DealershipCenterType[]

export const registrationSchema = z
    .object({
        firstName: z
            .string()
            .min(1, 'Имя обязательно для заполнения')
            .min(2, 'Имя должно содержать минимум 2 символа'),
        surname: z
            .string()
            .min(1, 'Фамилия обязательно для заполнения')
            .min(2, 'Фамилия должна содержать минимум 2 символа'),
        type: z.enum(REGISTRABLE_TYPE, {
            message: 'Выберите тип',
        }),
        role: z.enum(REGISTRABLE_ROLES, {
            message: 'Выберите должность',
        }),
        branch: z.string().min(1, 'Выберите филиал'),
        email: z.string().email('Введите корректный email'),
        password: z
            .string()
            .min(6, 'Пароль должен содержать минимум 6 символов'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    })

export type RegistrationFormValues = z.infer<typeof registrationSchema>
