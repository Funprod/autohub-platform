import { baseApi } from '@/shared/api/baseApi'
import type { User } from '../model/types'

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, void>({
            query: () => 'api/auth/me',
        }),
    }),
})

export const { useGetCurrentUserQuery } = userApi
