'use client'

import { Box, Chip, Stack, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import {
    Control,
    Controller,
    ControllerFieldState,
    ControllerRenderProps,
} from 'react-hook-form'
import { TestDriveFormInput } from '../../model/schema'

interface Props {
    control: Control<TestDriveFormInput>
}

export const AttachmentsSection = ({ control }: Props) => {
    return (
        <Controller
            control={control}
            name="attachments"
            render={({ field, fieldState }) => (
                <DropzoneField field={field} fieldState={fieldState} />
            )}
        />
    )
}

interface DropzoneFieldProps {
    field: ControllerRenderProps<TestDriveFormInput, 'attachments'>
    fieldState: ControllerFieldState
}

const DropzoneField = ({ field, fieldState }: DropzoneFieldProps) => {
    // Явно указываем TypeScript, что в value лежит массив файлов File[]
    const files = (field.value as File[]) ?? []

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            field.onChange([...files, ...acceptedFiles])
        },
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'application/pdf': ['.pdf'],
        },
    })

    const handleRemove = (index: number) => {
        const updated = files.filter((_, i) => i !== index)
        field.onChange(updated)
    }

    return (
        <Stack spacing={2}>
            <Box
                {...getRootProps()}
                sx={{
                    border: '2px dashed',
                    borderColor: isDragActive ? 'primary.main' : 'grey.400',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                }}
            >
                <input {...getInputProps()} />
                <Typography>
                    {isDragActive
                        ? 'Отпустите файлы здесь'
                        : 'Перетащите файлы сюда или кликните для выбора'}
                </Typography>
            </Box>

            <Stack spacing={1} sx={{ flexWrap: 'wrap' }}>
                {files.map((file, index) => (
                    <Chip
                        key={`${file.name}-${index}`}
                        label={file.name}
                        onDelete={() => handleRemove(index)}
                    />
                ))}
            </Stack>

            {fieldState.error && (
                <Typography color="error">
                    {fieldState.error.message}
                </Typography>
            )}
        </Stack>
    )
}
