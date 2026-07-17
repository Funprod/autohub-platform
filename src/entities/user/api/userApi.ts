import { baseApi } from '@/shared/api/baseApi'
import { clearUser, setUser } from '../model/slice'
import type { Role, User } from '../model/types'

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
        logout: builder.mutation<{ success: true }, void>({
            query: () => ({
                url: 'api/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch }) {
                try {
                    dispatch(clearUser())
                } catch {}
            },
        }),
        getUsers: builder.query<User[], void>({
            query: () => 'api/admin/users',
            providesTags: ['User'],
        }),
        updateUserRole: builder.mutation<User, { id: string; role: Role }>({
            query: ({ id, role }) => ({
                url: `api/admin/users/${id}`,
                method: 'PATCH',
                body: { role },
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const {
    useGetCurrentUserQuery,
    useLogoutMutation,
    useGetUsersQuery,
    useUpdateUserRoleMutation,
} = userApi
