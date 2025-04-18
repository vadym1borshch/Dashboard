import { useLocale as nextIntlLocale } from 'next-intl'
import { enUS, uk } from 'date-fns/locale'

const localeMap = {
  en: enUS,
  ua: uk,
}

export const useLocale = () => {
  const locale = nextIntlLocale()
  const dateFnsLocale = localeMap[locale as keyof typeof localeMap] ?? enUS

  return { locale, dateFnsLocale }
}