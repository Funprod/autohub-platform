import { clearUser } from '@/entities/user/model/slice'
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { redirectToLogin } from '../lib/navigation/redirect'

const baseQuery = fetchBaseQuery({ baseUrl: '/', credentials: 'include' })

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery(
            { url: '/api/auth/refresh', method: 'POST' },
            api,
            extraOptions
        )
        if (refreshResult.data) {
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(clearUser())
            redirectToLogin()
        }
    }
    return result
}

export const baseApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})
