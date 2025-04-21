'use client'
import { InfoCard } from '@/components/shared/info-card'
import Switcher from '@/components/shared/switch'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  AlertTriangleIcon,
  BadgeCheckIcon,
  LaptopIcon,
  PartyPopperIcon,
  UserCheck2Icon,
  UserIcon,
  UserRoundXIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import BarChartContainer from '@/components/shared/bar-chart'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

const totalEmployees = 109
const employeesPresent = 85
const employeesPresentPerc = Math.round(
  (employeesPresent / totalEmployees) * 100
)

type Current = 'employees' | 'teams'

const DashboardPage = () => {
  const t = useTranslations()
  const [current, setCurrent] = useState<Current>('employees')

  useEffect(() => {
    const statistic = localStorage.getItem('statistic')
    if (!statistic) {
      setCurrent('employees')
    } else {
      setCurrent(statistic as Current)
    }
  }, [])

  return (
    <div className="mr-4 flex h-[calc(100%-100px)] flex-col gap-4">
      <Switcher
        values={[
          { label: 'common.form.switch.value1', key: 'employees' },
          {
            label: 'common.form.switch.value2',
            key: 'teams',
          },
        ]}
        current={current}
        setCurrent={(val) => {
          setCurrent(val as Current)
          localStorage.setItem('statistic', val)
        }}
      />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <InfoCard title={t('dashboard.cards.1st.title')}>
          <div className="flex items-center gap-1">
            <UserIcon className="self-start" />
            <span className="text-5xl font-bold">{totalEmployees}</span>
            <Button size="sm" className="ml-auto">
              {t('dashboard.cards.1st.button')}
            </Button>
          </div>
        </InfoCard>
        <InfoCard
          title={t('dashboard.cards.2nd.title')}
          subTitle={
            <span
              className={cn('flex items-center gap-1 text-green-400', {
                'text-red-500': employeesPresentPerc < 75,
              })}
            >
              {employeesPresentPerc > 75 ? (
                <BadgeCheckIcon />
              ) : (
                <AlertTriangleIcon />
              )}
              {employeesPresentPerc < 75 && t('dashboard.cards.2nd.extra')}{' '}
              {employeesPresentPerc} % {t('dashboard.cards.2nd.sub-title')}
            </span>
          }
        >
          <div className="flex items-center gap-1">
            {employeesPresentPerc > 75 ? (
              <UserCheck2Icon className="self-start" />
            ) : (
              <UserRoundXIcon className="self-start" />
            )}
            <span className="text-5xl font-bold">{employeesPresent}</span>
          </div>
        </InfoCard>
        <InfoCard
          title={t('dashboard.cards.3rd.title')}
          subTitle={
            <span className="flex items-center gap-2 text-rose-400">
              <PartyPopperIcon />{' '}
              {t('dashboard.cards.3rd.sub-title', { name: 'name' })}
            </span>
          }
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-20 w-20">
              <Image src="https://i.pravatar.cc/150?img=3" alt="avatar" fill />
              <AvatarFallback>NS</AvatarFallback>
            </Avatar>
            <span className="text-2xl">name</span>
          </div>
        </InfoCard>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <LaptopIcon /> <span>{t('dashboard.charts.main-title')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <BarChartContainer />
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage
