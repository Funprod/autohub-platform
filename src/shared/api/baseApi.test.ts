import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { redirectToLogin } from '../lib/navigation/redirect'
jest.mock('@reduxjs/toolkit/query/react', () => {
    const mockBaseQuery = jest.fn()
    return {
        ...jest.requireActual('@reduxjs/toolkit/query/react'),
        fetchBaseQuery: jest.fn(() => mockBaseQuery),
    }
})
jest.mock('../lib/navigation/redirect', () => ({
    redirectToLogin: jest.fn(),
}))

import { clearUser } from '@/entities/user/model/slice'

import { baseQueryWithReauth } from './baseApi'

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- нужен для получения ссылки на мок в тесте
const mockBaseQuery = fetchBaseQuery({} as any) as unknown as jest.Mock

describe('baseQueryWithReauth', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- нужен для получения ссылки на мок в тесте
    const api = { dispatch: jest.fn() } as any
    beforeEach(() => {
        mockBaseQuery.mockReset()
        api.dispatch.mockReset()
    })

    test('успешный запрос без 401 - возвращает данные, без попытки refresh', async () => {
        const mockUser = { data: { id: '1', email: 'test@test.com' } }
        mockBaseQuery.mockResolvedValue(mockUser)
        const result = await baseQueryWithReauth('/some-endpoint', api, {})

        expect(result).toEqual(mockUser)
        expect(mockBaseQuery).toHaveBeenCalledTimes(1)
    })
    test('ошибка 401 - refresh успешен - повторный запрос успешен', async () => {
        const mockUser = { data: { id: '1', email: 'test@test.com' } }
        const mockError = {
            error: { status: 401, data: { message: 'Не авторизован' } },
        }
        const mockSuccess = { data: { success: true } }
        mockBaseQuery.mockResolvedValueOnce(mockError)
        mockBaseQuery.mockResolvedValueOnce(mockSuccess)
        mockBaseQuery.mockResolvedValueOnce(mockUser)

        const result = await baseQueryWithReauth('/some-endpoint', api, {})

        expect(result).toEqual(mockUser)
        expect(mockBaseQuery).toHaveBeenCalledTimes(3)
    })
    test('401 - refresh тоже 401 - clearUser и редирект на /login', async () => {
        const mockError = {
            error: { status: 401, data: { message: 'Не авторизован' } },
        }
        mockBaseQuery.mockResolvedValueOnce(mockError)
        mockBaseQuery.mockResolvedValueOnce(mockError)

        const result = await baseQueryWithReauth('/some-endpoint', api, {})

        expect(result).toEqual(mockError)
        expect(api.dispatch).toHaveBeenCalledWith(clearUser())
        expect(redirectToLogin).toHaveBeenCalledTimes(1)
    })
    test('non-401 ошибка (500) - refresh не запускается, ошибка возвращается как есть', async () => {
        const serverError = {
            error: { status: 500, data: { message: 'Internal Server Error' } },
        }
        mockBaseQuery.mockResolvedValueOnce(serverError)

        const result = await baseQueryWithReauth('/some-endpoint', api, {})

        expect(result).toEqual(serverError)
        expect(mockBaseQuery).toHaveBeenCalledTimes(1)
    })
})
