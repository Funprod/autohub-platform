import { baseApi } from '@/shared/api/baseApi'
import { setUser } from '../model/slice'
import type { User } from '../model/types'

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, void>({
            query: () => 'api/auth/me',
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled
                    dispatch(setUser(result.data))
                } catch {}
            },
        }),
        getUsers: builder.query<User[], void>({
            query: () => 'api/admin/users',
        }),
    }),
})

export const { useGetCurrentUserQuery, useGetUsersQuery } = userApi
