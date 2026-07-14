import { baseApi } from '@/shared/api/baseApi'
import { DealershipCenter, DealershipCenterType } from '../model/types'

export const dealershipCenterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDealershipCenters: builder.query<
            DealershipCenter[],
            DealershipCenterType | undefined
        >({
            query: (type) => ({
                url: '/api/dealership-centers/',
                params: type ? { type } : undefined,
            }),
        }),
    }),
})

export const { useGetDealershipCentersQuery } = dealershipCenterApi
