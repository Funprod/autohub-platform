import { verifyAccessToken } from '@/shared/lib/server/jwt'
import { createTestDriveRecord } from '@/shared/lib/server/mock-test-drive'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
        return NextResponse.json({ message: 'Не авторизован' }, { status: 401 })
    }

    try {
        const payload = await verifyAccessToken(token)

        const formData = await request.formData()

        // Достаём обычные текстовые поля
        const fields: Record<string, string> = {}
        const attachmentNames: string[] = []

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                attachmentNames.push(value.name)
            } else {
                fields[key] = value as string
            }
        }

        const record = createTestDriveRecord({
            firstName: fields.firstName,
            lastName: fields.lastName,
            middleName: fields.middleName,
            phone: fields.phone,
            email: fields.email,
            preferredContactMethod: fields.preferredContactMethod,
            birthDate: fields.birthDate,
            driverLicenseSeries: fields.driverLicenseSeries,
            driverLicenseNumber: fields.driverLicenseNumber,
            driverLicenseCategory: fields.driverLicenseCategory,
            driverLicenseExpiresAt: fields.driverLicenseExpiresAt,
            brand: fields.brand,
            model: fields.model,
            configuration: fields.configuration,
            color: fields.color,
            date: fields.date,
            time: fields.time,
            duration: Number(fields.duration),
            dealershipCenterId: fields.dealershipCenterId,
            location: fields.location,
            address: fields.address,
            tradeIn: fields.tradeIn === 'true',
            tradeInCarBrand: fields.tradeInCarBrand,
            tradeInCarModel: fields.tradeInCarModel,
            tradeInCarYear: fields.tradeInCarYear
                ? Number(fields.tradeInCarYear)
                : undefined,
            tradeInCarMileage: fields.tradeInCarMileage
                ? Number(fields.tradeInCarMileage)
                : undefined,
            managerId: fields.managerId,
            leadSource: fields.leadSource,
            status: fields.status,
            internalComment: fields.internalComment,
            clientComment: fields.clientComment,
            attachmentNames,
            createdBy: payload.sub,
        })

        return NextResponse.json(record)
    } catch {
        return NextResponse.json(
            { message: 'Токен недействителен' },
            { status: 401 }
        )
    }
}
