import { InputForm } from '@/shared/ui/form/InputForm'
import { Stack } from '@mui/material'
import { Control } from 'react-hook-form'
import { PasswordResetValues } from '../../model/schema'

type Props = {
    control: Control<PasswordResetValues>
}

export const RequestCodeStep = ({ control }: Props) => {
    return (
        <Stack spacing={2}>
            <InputForm control={control} label="Email" name="email" />
        </Stack>
    )
}
