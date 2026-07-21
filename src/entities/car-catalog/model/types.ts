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
