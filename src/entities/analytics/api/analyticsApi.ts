import { baseApi } from '@/shared/api/baseApi'
import { AnalyticsDataPoint, AnalyticsRequestParams } from '../model/types'

export const analyticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnalytics: builder.query<
            AnalyticsDataPoint[],
            AnalyticsRequestParams
        >({
            query: (params) => ({
                url: '/api/analytics',
                params,
            }),
        }),
    }),
})

export const { useGetAnalyticsQuery } = analyticsApi
