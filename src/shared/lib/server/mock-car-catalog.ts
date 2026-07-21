// src/shared/lib/server/mock-car-catalog.ts
export interface CarTrim {
    id: string
    name: string
    colors: string[]
}

export interface CarModel {
    id: string
    name: string
    trims: CarTrim[]
}

export interface CarBrand {
    id: string
    name: string
    models: CarModel[]
}

export const CAR_CATALOG: CarBrand[] = [
    {
        id: 'haval',
        name: 'Haval',
        models: [
            {
                id: 'jolion',
                name: 'Jolion',
                trims: [
                    {
                        id: 'comfort',
                        name: 'Comfort',
                        colors: ['Белый', 'Чёрный', 'Серый'],
                    },
                    {
                        id: 'elite',
                        name: 'Elite',
                        colors: ['Белый', 'Чёрный', 'Красный', 'Синий'],
                    },
                ],
            },
            {
                id: 'f7',
                name: 'F7',
                trims: [
                    {
                        id: 'premium',
                        name: 'Premium',
                        colors: ['Белый', 'Чёрный'],
                    },
                    {
                        id: 'flagship',
                        name: 'Flagship',
                        colors: ['Чёрный', 'Синий', 'Серебристый'],
                    },
                ],
            },
        ],
    },
    {
        id: 'chery',
        name: 'Chery',
        models: [
            {
                id: 'tiggo7',
                name: 'Tiggo 7 Pro',
                trims: [
                    {
                        id: 'standard',
                        name: 'Standard',
                        colors: ['Белый', 'Серый'],
                    },
                    {
                        id: 'luxury',
                        name: 'Luxury',
                        colors: ['Белый', 'Чёрный', 'Красный'],
                    },
                ],
            },
        ],
    },
]
