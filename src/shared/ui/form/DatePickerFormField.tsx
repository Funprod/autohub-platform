import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface Props<T extends FieldValues> extends Omit<
    DatePickerProps,
    'value' | 'onChange'
> {
    control: Control<T>
    label: string
    name: Path<T>
}

export const DatePickerFormField = <T extends FieldValues>({
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
                <DatePicker
                    label={label}
                    {...restProps}
                    value={field.value ?? null}
                    onChange={field.onChange}
                    slotProps={{
                        textField: {
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message,
                        },
                    }}
                />
            )}
        />
    )
}
