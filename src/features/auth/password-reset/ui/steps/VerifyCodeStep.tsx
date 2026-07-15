import { InputForm } from '@/shared/ui/form/InputForm'
import { Stack, Typography } from '@mui/material'
import { Control } from 'react-hook-form'
import { PasswordResetValues } from '../../model/schema'

type Props = {
    control: Control<PasswordResetValues>
}

export const VerifyCodeStep = ({ control }: Props) => {
    return (
        <Stack spacing={2}>
            <Typography>
                Если аккаунт с таким email существует, мы отправили на него код.
            </Typography>
            <InputForm control={control} label="Введите код" name="code" />
        </Stack>
    )
}
