import { baseApi } from '@/shared/api/baseApi'
import { PasswordResetValues } from '../model/schema'

export const passwordResetApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        passwordReset: builder.mutation<
            { success: boolean; devCode?: string },
            Pick<PasswordResetValues, 'email'>
        >({
            query: (body) => ({
                url: 'api/auth/password-reset/request',
                method: 'POST',
                body,
            }),
        }),
        verifyCode: builder.mutation<
            { success: true },
            Pick<PasswordResetValues, 'email' | 'code'>
        >({
            query: (body) => ({
                url: 'api/auth/password-reset/verify',
                method: 'POST',
                body,
            }),
        }),
        confirm: builder.mutation<
            { success: true },
            Pick<PasswordResetValues, 'email' | 'password' | 'code'>
        >({
            query: ({ password, ...rest }) => ({
                url: 'api/auth/password-reset/confirm',
                method: 'POST',
                body: { newPassword: password, ...rest },
            }),
        }),
    }),
})

export const {
    usePasswordResetMutation,
    useVerifyCodeMutation,
    useConfirmMutation,
} = passwordResetApi
