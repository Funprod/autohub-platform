import { baseApi } from '@/shared/api/baseApi'
import { CarBrand } from '../model/types'

export const carCatalogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCarCatalog: builder.query<CarBrand[], void>({
            query: () => `/api/car-catalog`,
        }),
    }),
})

export const { useGetCarCatalogQuery } = carCatalogApi
