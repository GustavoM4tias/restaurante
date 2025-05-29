// src/utils/formatDate.js

export function formatDate(isoString, mode = 'datetime') {
    if (!isoString) return '—'

    // Separa em data e hora (presume sempre terminar em "Z")
    const [datePart, timePartWithZone] = isoString.split('T')
    const [timePart] = timePartWithZone.split('Z') // e.g. "20:54:00.000"

    // Verifica se é data-only (horário zero)
    const isDateOnly = timePart.startsWith('00:00:00')

    // Quebra a data ISO (YYYY-MM-DD)
    const [year, month, day] = datePart.split('-')

    // Formata só DD/MM/AAAA
    const formattedDate = `${day}/${month}/${year}`

    if (isDateOnly) {
        // Se for data-only, ignoramos hora
        if (mode === 'time') {
            return ''
        }
        // date ou datetime => só data
        return formattedDate
    }

    // Caso tenha hora, converte para horário local
    const dateObj = new Date(isoString)

    switch (mode) {
        case 'date':
            return dateObj.toLocaleDateString('pt-BR')
        case 'time':
            return dateObj.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            })
        case 'datetime':
        default:
            return dateObj.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
    }
}
