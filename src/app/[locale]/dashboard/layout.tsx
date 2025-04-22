'use client'
import { ReactNode } from 'react'
import { Separator } from '@/components/ui/separator'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Image from 'next/image'
import { ToggleThemeButton } from '@/components/shared/toggle-theme-button'
import LangSwitcher from '@/components/shared/lang-switcher'

interface Props {
  children: ReactNode
}

const items = [
  {
    title: 'dashboard.pages.dashboard',
    url: '/dashboard',
  },
  {
    title: 'dashboard.pages.teams',
    url: '/dashboard/teams',
  },
  {
    title: 'dashboard.pages.employees',
    url: '/dashboard/employees',
  },
  {
    title: 'dashboard.pages.account',
    url: '/dashboard/account',
  },
  {
    title: 'dashboard.pages.settings',
    url: '/dashboard/settings',
  },
]

const DashboardLayout = ({ children }: Props) => {
  const t = useTranslations()
  const path = usePathname()
  return (
    <div className="flex h-svh w-full">
      <aside className="bg-muted hidden h-svh min-w-[20rem] flex-col gap-1 p-4 md:flex">
        <h2 className="mb-4 flex items-center justify-between text-2xl font-bold">
          SupportMe <LangSwitcher />
        </h2>
        <Separator className="mb-4" />
        {items.map((item) => (
          <Button
            key={item.title}
            asChild
            className={cn(
              'justify-start bg-transparent text-base text-black shadow-none dark:text-white',
              {
                'bg-primary text-white': path === item.url,
              }
            )}
          >
            <Link href={item.url}>{t(item.title)}</Link>
          </Button>
        ))}
        <div className="mt-auto flex items-center gap-2">
          <Avatar className="h-12 w-12">
            <Image src="https://i.pravatar.cc/150?img=3" alt="photo" fill />
            <AvatarFallback>NS</AvatarFallback>
          </Avatar>
          <span>Name</span>
          <ToggleThemeButton triggerClassName="ml-auto" />
        </div>
      </aside>

      <div className="bg-background dark:bg-background-dark flex h-full w-full flex-col gap-8 p-4">
        <header className="flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold">
            {t('dashboard.main-title', { name: 'Name' })}
          </h2>
          <Sheet>
            <SheetTrigger className="block md:hidden">
              <MenuIcon />
            </SheetTrigger>
            <SheetContent className="dark:bg-muted flex flex-col gap-2 border-0 bg-[#6b7081] p-4">
              <SheetHeader className="pb-4 text-2xl font-bold">
                <SheetTitle className="text-white">SupportMe</SheetTitle>
              </SheetHeader>
              <Separator className="mt-0 mb-4" />
              {items.map((item) => (
                <Button
                  key={item.title}
                  asChild
                  className={cn(
                    'justify-start bg-transparent text-base shadow-none',
                    {
                      'bg-primary': path === item.url,
                    }
                  )}
                >
                  <Link href={item.url}>{t(item.title)}</Link>
                </Button>
              ))}
              <div className="mt-auto flex items-center justify-between">
                <LangSwitcher />
                <ToggleThemeButton />
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
