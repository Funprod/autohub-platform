import { baseApi } from '@/shared/api/baseApi'
import { AnalyticsDataPoint, RequestParamsAnalytics } from '../model/types'

export const analyticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnalytics: builder.query<
            AnalyticsDataPoint[],
            RequestParamsAnalytics
        >({
            query: (params) => ({
                url: '/api/analytics',
                params,
            }),
        }),
    }),
})

export const { useGetAnalyticsQuery } = analyticsApi
