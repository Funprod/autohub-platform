import { setUser } from '@/entities/user/model/slice'
import type { User } from '@/entities/user/model/types'
import { baseApi } from '@/shared/api/baseApi'
import type { LoginFormValues } from '../model/schema'

export const authByEmailApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<User, LoginFormValues>({
            query: (body) => ({
                url: 'api/auth/login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled
                    dispatch(setUser(result.data))
                } catch {}
            },
        }),
    }),
})

export const { useLoginMutation } = authByEmailApi
