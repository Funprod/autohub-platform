import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface Props<T extends FieldValues> extends Omit<
    TextFieldProps,
    'name' | 'error' | 'helperText'
> {
    control: Control<T>
    name: Path<T>
    label: string
}

export const InputForm = <T extends FieldValues>({
    control,
    label,
    name,
    ...restProps
}: Props<T>) => {
    return (
        <Controller
            control={control}
            name={name}

            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    {...restProps}
                    label={label}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />
            )}
        />
    )
}
