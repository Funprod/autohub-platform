import { InputForm } from '@/shared/ui/form/InputForm'
import { Stack } from '@mui/material'
import { Control } from 'react-hook-form'
import { PasswordResetValues } from '../../model/schema'

type Props = {
    control: Control<PasswordResetValues>
}

export const NewPasswordStep = ({ control }: Props) => {
    return (
        <Stack spacing={2}>
            <InputForm
                control={control}
                label="Пароль"
                name="password"
                type="password"
            />
            <InputForm
                control={control}
                label="Подтвердите пароль"
                name="confirmPassword"
                type="password"
            />
        </Stack>
    )
}
