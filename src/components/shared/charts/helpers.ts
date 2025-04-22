import { format, Locale } from 'date-fns'

export const getLocalizedMonthName = (monthAbbr: string, locale: Locale) => {
  const date = new Date(`${monthAbbr} 1, 2024`)
  const str = format(date, 'LLL', { locale })
  const cleaned = str.replace(/\./g, '').trim()
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}
