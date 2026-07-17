import * as XLSX from 'xlsx'

interface ExportColumn<T> {
    key: keyof T
    label: string
}

export function exportToExcel<T extends object>(
    data: T[],
    columns: ExportColumn<T>[],
    filename: string
) {
    const sheetData = data.map((row) => {
        const transformedRow: Record<string, unknown> = {}
        columns.forEach((col) => {
            transformedRow[col.label] = row[col.key]
        })
        return transformedRow
    })
    const worksheet = XLSX.utils.json_to_sheet(sheetData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, `${filename}.xlsx`)
}
