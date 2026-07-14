import { FormControl, InputLabel } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectProps } from '@mui/material/Select'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface Props<T extends FieldValues> extends Omit<
    SelectProps,
    'name' | 'error' | 'value' | 'onChange'
> {
    control: Control<T>
    name: Path<T>
    label: string
    options: { value: string; label: string }[]
}

export const SelectForm = <T extends FieldValues>({
    control,
    name,
    label,
    options,
    ...restProps
}: Props<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel id={`${name}-label`}>{label}</InputLabel>
                    <Select
                        {...field}
                        {...restProps}
                        labelId={`${name}-label`}
                        label={label}
                    >
                        {options.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    )
}
