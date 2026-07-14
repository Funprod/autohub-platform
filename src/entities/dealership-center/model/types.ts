export interface DealershipCenter {
    id: string
    name: string
    type: 'dealership-center' | 'call-center'
    city: string
}

export type DealershipCenterType = 'dealership-center' | 'call-center'
