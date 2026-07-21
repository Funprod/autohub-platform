export function generateTimeSlots(
    openTime: string = '10:00',
    closeTime: string = '20:00',
    intervalMinutes: number = 30
): { value: string; label: string }[] {
    const slots: { value: string; label: string }[] = []
    const [openHour, openMinute] = openTime.split(':').map(Number)
    const [closeHour, closeMinute] = closeTime.split(':').map(Number)

    let currentMinutes = openHour * 60 + openMinute
    const closeMinutes = closeHour * 60 + closeMinute

    while (currentMinutes < closeMinutes) {
        const hours = Math.floor(currentMinutes / 60)
        const minutes = currentMinutes % 60
        const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
        slots.push({ value: timeString, label: timeString })
        currentMinutes += intervalMinutes
    }

    return slots
}
