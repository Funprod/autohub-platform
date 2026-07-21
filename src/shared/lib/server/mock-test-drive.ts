export interface TestDriveRecord {
    id: string
    firstName: string
    lastName: string
    middleName?: string
    phone: string
    email?: string
    preferredContactMethod: string
    birthDate: string
    driverLicenseSeries: string
    driverLicenseNumber: string
    driverLicenseCategory: string
    driverLicenseExpiresAt: string
    brand: string
    model: string
    configuration?: string
    color?: string
    date: string
    time: string
    duration: number
    dealershipCenterId: string
    location: string
    address?: string
    tradeIn: boolean
    tradeInCarBrand?: string
    tradeInCarModel?: string
    tradeInCarYear?: number
    tradeInCarMileage?: number
    managerId?: string
    leadSource: string
    status: string
    internalComment?: string
    clientComment?: string
    attachmentNames: string[] // просто имена файлов, реальное хранение файлов — отдельная задача
    createdBy: string
    createdAt: string
}

const testDriveRecords: TestDriveRecord[] = []

export function createTestDriveRecord(
    data: Omit<TestDriveRecord, 'id' | 'createdAt'>
): TestDriveRecord {
    const record: TestDriveRecord = {
        ...data,
        id: `td-${testDriveRecords.length + 1}`,
        createdAt: new Date().toISOString(),
    }
    testDriveRecords.push(record)
    return record
}

export function getAllTestDriveRecords(): TestDriveRecord[] {
    return testDriveRecords
}
