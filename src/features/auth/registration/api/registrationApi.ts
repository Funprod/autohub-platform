import { setUser } from '@/entities/user/model/slice'
import type { User } from '@/entities/user/model/types'
import { baseApi } from '@/shared/api/baseApi'
import { RegistrationFormValues } from '../model/schema'

export const registrationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<User, RegistrationFormValues>({
            query: (body) => ({
                url: 'api/auth/register',
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

export const { useRegisterMutation } = registrationApi
