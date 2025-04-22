import { InfoCard } from '@/components/shared/info-card'
import {
  AlertTriangleIcon,
  BadgeCheckIcon,
  LaptopIcon,
  PartyPopperIcon,
  UserCheck2Icon,
  UserIcon,
  UserRoundXIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import BarChartContainer from '../../../../../components/shared/charts/bar-chart'
import { useTranslations } from 'next-intl'

const totalEmployees = 109
const employeesPresent = 60
const employeesPresentPerc = Math.round(
  (employeesPresent / totalEmployees) * 100
)

export const EmployeesStats = () => {
  const t = useTranslations()
  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <InfoCard
          title={t('dashboard.cards.employees.1st.title')}
          childrenClassName="gap-1"
        >
          <>
            <UserIcon className="self-start" />
            <span className="text-5xl font-bold">{totalEmployees}</span>
            <Button size="sm" className="ml-auto">
              {t('dashboard.cards.button')}
            </Button>
          </>
        </InfoCard>
        <InfoCard
          title={t('dashboard.cards.employees.2nd.title')}
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
              {employeesPresentPerc < 75 &&
                t('dashboard.cards.employees.2nd.extra')}
              {employeesPresentPerc} %{' '}
              {t('dashboard.cards.employees.2nd.sub-title')}
            </span>
          }
          childrenClassName="gap-1"
        >
          <>
            {employeesPresentPerc > 75 ? (
              <UserCheck2Icon className="self-start" />
            ) : (
              <UserRoundXIcon className="self-start" />
            )}
            <span className="text-5xl font-bold">{employeesPresent}</span>
          </>
        </InfoCard>
        <InfoCard
          title={t('dashboard.cards.employees.3rd.title')}
          subTitle={
            <span className="flex items-center gap-2 text-rose-400">
              <PartyPopperIcon />
              {t('dashboard.cards.employees.3rd.sub-title', { name: 'name' })}
            </span>
          }
          childrenClassName="gap-2"
        >
          <>
            <Avatar className="h-10 w-10">
              <Image src="https://i.pravatar.cc/150?img=3" alt="avatar" fill />
              <AvatarFallback>NS</AvatarFallback>
            </Avatar>
            <span className="text-2xl">name</span>
          </>
        </InfoCard>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <LaptopIcon /> <span>{t('dashboard.charts.employees-title')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <BarChartContainer />
        </CardContent>
      </Card>
    </>
  )
}
