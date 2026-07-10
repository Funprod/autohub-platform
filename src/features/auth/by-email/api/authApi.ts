import { setUser } from '@/entities/user/model/slice'
import type { User } from '@/entities/user/model/types'
import { baseApi } from '@/shared/api/baseApi'
import type { LoginFormValues } from '../model/schema'

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<User, LoginFormValues>({
            query: (body) => ({
                url: 'api/auth/login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    dispatch(setUser(data.data))
                } catch {}
            },
        }),
    }),
})

export const { useLoginMutation } = authApi
