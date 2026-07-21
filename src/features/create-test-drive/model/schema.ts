import { z } from 'zod'

export const DRIVER_LICENSE_CATEGORIES = [
    'A',
    'A1',
    'B',
    'BE',
    'B1',
    'C',
    'CE',
    'C1',
    'C1E',
    'D',
    'DE',
    'D1',
    'D1E',
    'M',
    'Tm',
    'Tb',
] as const

export const LEAD_SOURCE = [
    'website',
    'phone',
    'advertisement',
    'social',
    'walk_in',
    'other',
] as const

export const STATUS_BID = [
    'NEW',
    'CONFIRMED',
    'COMPLETED',
    'CANCELLED',
    'NO_SHOW',
    'RESCHEDULED',
] as const

export const testDriveSchema = z
    .object({
        firstName: z.string().trim().min(1, 'Введите имя'),
        lastName: z.string().trim().min(1, 'Введите фамилию'),
        middleName: z.string().trim().optional(),

        phone: z
            .string()
            .trim()
            .min(1, 'Введите телефон')
            .regex(/^\+?[0-9\s()-]{10,20}$/, 'Некорректный телефон'),

        email: z
            .string()
            .trim()
            .email('Некорректный email')
            .optional()
            .or(z.literal('')),

        preferredContactMethod: z.enum(
            ['phone', 'email', 'telegram', 'whatsapp'],
            {
                error: 'Выберите способ связи',
            }
        ),

        birthDate: z.date({ error: 'Укажите дату рождения' }),

        driverLicenseSeries: z.string().trim().min(1, 'Укажите серию прав'),
        driverLicenseNumber: z.string().trim().min(1, 'Укажите номер прав'),
        driverLicenseCategory: z.enum(DRIVER_LICENSE_CATEGORIES, {
            error: 'Выберите категорию водительских прав',
        }),
        driverLicenseExpiresAt: z.date({ error: 'Укажите срок действия прав' }),

        brand: z.string().min(1, 'Выберите марку'),
        model: z.string().min(1, 'Выберите модель'),
        configuration: z.string().optional(),
        color: z.string().optional(),

        date: z.date({ error: 'Выберите дату' }),
        time: z.string().min(1, 'Выберите время'),
        duration: z.coerce.number().min(15).max(180),

        dealershipCenterId: z.string().min(1, 'Выберите дилерский центр'),
        location: z.enum(['showroom', 'client-address']),
        address: z.string().optional(),

        tradeIn: z.boolean(),
        tradeInCarBrand: z.string().optional(),
        tradeInCarModel: z.string().optional(),
        tradeInCarYear: z.coerce.number().optional(),
        tradeInCarMileage: z.coerce.number().optional(),

        managerId: z.string().optional(),
        leadSource: z.enum(LEAD_SOURCE),
        status: z.enum(STATUS_BID),
        internalComment: z.string().max(2000).optional(),
        clientComment: z.string().max(1000).optional(),

        attachments: z
            .array(z.instanceof(File))
            .min(1, 'Прикрепите скан водительского удостоверения')
            .max(10),
    })
    .refine((data) => data.location !== 'client-address' || !!data.address, {
        message: 'Укажите адрес',
        path: ['address'],
    })
    .refine((data) => !data.tradeIn || !!data.tradeInCarBrand, {
        message: 'Укажите марку автомобиля клиента',
        path: ['tradeInCarBrand'],
    })

export type TestDriveFormValues = z.infer<typeof testDriveSchema>

export type TestDriveFormInput = z.input<typeof testDriveSchema>
