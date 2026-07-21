import { baseApi } from '@/shared/api/baseApi'

import { TestDriveFormValues } from '../model/schema'
import { TestDriveRecord } from '../model/types'

export const createTestDriveApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTestDrive: builder.mutation<TestDriveRecord, TestDriveFormValues>(
            {
                query: (data) => {
                    const formData = new FormData()

                    Object.entries(data).forEach(([key, value]) => {
                        if (key === 'attachments') {
                            ;(value as File[]).forEach((file) =>
                                formData.append('attachments', file)
                            )
                        } else if (value instanceof Date) {
                            formData.append(key, value.toISOString())
                        } else if (value !== undefined && value !== null) {
                            formData.append(key, String(value))
                        }
                    })

                    return {
                        url: '/api/test-drive',
                        method: 'POST',
                        body: formData,
                    }
                },
            }
        ),
    }),
})

export const { useCreateTestDriveMutation } = createTestDriveApi
