'use client'
import { ReactNode } from 'react'
import { ToggleThemeButton } from '@/components/shared/toggle-theme-button'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useWindowDimensions } from '@/helpers/hooks/useWindowDimensions'
import { Separator } from '@/components/ui/separator'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

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
  const { width } = useWindowDimensions()
  const t = useTranslations()
  const path = usePathname()
  const isMobile = width < 768
  return (
    <SidebarProvider>
      <Sidebar side={isMobile ? 'right' : 'left'}>
        <SidebarContent className="h-full">
          <SidebarGroup className="h-full justify-between">
            <SidebarGroupContent className="flex h-full flex-col gap-4">
              <SidebarGroupLabel className="text-3xl font-bold">
                SupportMe
              </SidebarGroupLabel>
              <Separator />
              <SidebarMenu className="">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn('text-base', {
                        'bg-primary': path === item.url,
                      })}
                    >
                      <Link href={item.url}>{t(item.title)}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <div className="flex items-center justify-between">
              <span>user</span>
              <ToggleThemeButton />
            </div>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="bg-background dark:bg-background-dark flex h-full w-full flex-col overflow-y-auto gap-8 p-4">
        <header className="flex w-full items-center justify-between ">
          <h1 className="font-bold text-4xl">Welcome back, Name</h1>
          <SidebarTrigger className="cursor-pointer" />
        </header>
        {children}
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout
