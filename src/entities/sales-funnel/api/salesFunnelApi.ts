import { baseApi } from '@/shared/api/baseApi'
import { FunnelRow, FunnelRowRequestParams } from '../model/types'

export const salesFunnelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSalesFunnel: builder.query<FunnelRow[], FunnelRowRequestParams>({
            query: (params) => ({
                url: '/api/sales-funnel',
                params,
            }),
        }),
    }),
})

export const { useGetSalesFunnelQuery } = salesFunnelApi
