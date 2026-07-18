export function generatePeriodOptions(monthsBack: number = 12) {
    const options: { value: string; label: string }[] = []
    const now = new Date()

    const monthNames = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ]

    for (let i = 0; i < monthsBack; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        options.push({
            value: `${year}-${month}`,
            label: `${monthNames[date.getMonth()]} ${year}`,
        })
    }

    return options
}
