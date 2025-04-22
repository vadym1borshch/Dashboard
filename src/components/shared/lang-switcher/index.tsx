import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from '@/helpers/hooks/useLocale'
import { cn } from '@/lib/utils'

const commonStyles = 'bg-transparent shadow-none text-black dark:text-white'

const LangSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { locale } = useLocale()

  const changeLanguage = (locale: string) => {
    router.replace(pathname, { locale })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        className={cn(commonStyles, {
          'bg-green-500 text-white': locale === 'en',
        })}
        onClick={() => {
          if (locale === 'en') return
          changeLanguage('en')
        }}
      >
        EN
      </Button>
      <Button
        className={cn(commonStyles, {
          'bg-green-500 text-white': locale === 'ua',
        })}
        onClick={() => {
          if (locale === 'ua') return
          changeLanguage('ua')
        }}
      >
        UA
      </Button>
    </div>
  )
}

export default LangSwitcher
