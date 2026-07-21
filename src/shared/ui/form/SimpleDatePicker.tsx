import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickerValue } from '@mui/x-date-pickers/internals'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

interface Props {
    value: PickerValue
    label: string
    onChange: (value: PickerValue) => void
}

export const SimpleDatePicker = ({ value, label, onChange }: Props) => {
    const handleOnChange = (value: PickerValue) => {
        onChange(value)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker value={value} label={label} onChange={handleOnChange} />
        </LocalizationProvider>
    )
}
