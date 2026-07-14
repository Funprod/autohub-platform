export interface DealershipCenter {
    id: string
    name: string
    type: 'dealership-center' | 'call-center'
    city: string
}

export const DEALERSHIP_CENTERS: DealershipCenter[] = [
    {
        id: 'dc-1',
        name: 'Хавал Моторс Восток',
        type: 'dealership-center',
        city: 'Москва',
    },
    {
        id: 'dc-2',
        name: 'Хавал Моторс Юг',
        type: 'dealership-center',
        city: 'Краснодар',
    },
    {
        id: 'dc-3',
        name: 'Хавал Моторс Урал',
        type: 'dealership-center',
        city: 'Екатеринбург',
    },
    {
        id: 'dc-4',
        name: 'Хавал Моторс Сибирь',
        type: 'dealership-center',
        city: 'Новосибирск',
    },
    {
        id: 'cc-1',
        name: 'Контакт-центр Гран Северо-Запад',
        type: 'call-center',
        city: 'Санкт-Петербург',
    },
    {
        id: 'cc-2',
        name: 'Контакт-центр Гран Центр',
        type: 'call-center',
        city: 'Москва',
    },
]
