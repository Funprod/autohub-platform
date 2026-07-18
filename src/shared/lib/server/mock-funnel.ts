export interface FunnelStageData {
    plan: number
    fact: number
}

export interface FunnelRow {
    managerId: string
    managerName: string
    dealershipCenterId: string
    stages: {
        traffic: FunnelStageData
        testDrives: FunnelStageData
        requests: FunnelStageData
        deals: FunnelStageData
        sales: FunnelStageData
    }
}

const MANAGER_NAMES = [
    'Иван Петров',
    'Дмитрий Кузнецов',
    'Анна Морозова',
    'Павел Новиков',
    'Елена Фёдорова',
    'Кирилл Козлов',
    'Татьяна Никитина',
    'Роман Захаров',
]

function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
}

export function generateFunnelData(
    dealershipCenterId: string,
    period: string
): FunnelRow[] {
    const seedBase =
        dealershipCenterId
            .split('')
            .reduce((acc, ch) => acc + ch.charCodeAt(0), 0) +
        period.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)

    return MANAGER_NAMES.map((managerName, i) => {
        const seed = seedBase + i * 17

        const trafficPlan = 100 + Math.floor(seededRandom(seed) * 50)
        const trafficFact = Math.floor(
            trafficPlan * (0.7 + seededRandom(seed + 1) * 0.5)
        )

        const testDrivesPlan = Math.floor(trafficPlan * 0.35)
        const testDrivesFact = Math.floor(
            trafficFact * (0.25 + seededRandom(seed + 2) * 0.2)
        )

        const requestsPlan = Math.floor(testDrivesPlan * 0.6)
        const requestsFact = Math.floor(
            testDrivesFact * (0.5 + seededRandom(seed + 3) * 0.2)
        )

        const dealsPlan = Math.floor(requestsPlan * 0.7)
        const dealsFact = Math.floor(
            requestsFact * (0.6 + seededRandom(seed + 4) * 0.2)
        )

        const salesPlan = Math.floor(dealsPlan * 0.85)
        const salesFact = Math.floor(
            dealsFact * (0.8 + seededRandom(seed + 5) * 0.2)
        )

        return {
            managerId: `mgr-${dealershipCenterId}-${i}`,
            managerName,
            dealershipCenterId,
            stages: {
                traffic: { plan: trafficPlan, fact: trafficFact },
                testDrives: { plan: testDrivesPlan, fact: testDrivesFact },
                requests: { plan: requestsPlan, fact: requestsFact },
                deals: { plan: dealsPlan, fact: dealsFact },
                sales: { plan: salesPlan, fact: salesFact },
            },
        }
    })
}
