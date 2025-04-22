import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ChartPieIcon, ListChecksIcon, StarIcon, UsersIcon } from 'lucide-react'
import { InfoCard } from '@/components/shared/info-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PieChartWrapper } from '@/components/shared/charts/pie-chart'
import { LineChartWrapper } from '@/components/shared/charts/line-chart'

export const TeamsStats = () => {
  const t = useTranslations()
  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <InfoCard
          title={t('dashboard.cards.teams.1st.title')}
          childrenClassName="gap-1"
        >
          <>
            <UsersIcon className="self-start" />
            <span className="text-5xl font-bold">8</span>
            <Button size="sm" className="ml-auto">
              {t('dashboard.cards.button')}
            </Button>
          </>
        </InfoCard>
        <InfoCard
          title={
            <div className="flex w-full justify-between">
              {t('dashboard.cards.teams.2nd.title')}
              <StarIcon className="text-yellow-600" />
            </div>
          }
          childrenClassName=" gap-2 flex-wrap"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <TooltipProvider key={'ava' + i}>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="h-10 w-10">
                    <Image
                      src={`https://i.pravatar.cc/150?img=${i}`}
                      alt="avatar"
                      fill
                    />
                    {/*must get from user obj*/}
                    <AvatarFallback>A{i}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>first-last names</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </InfoCard>
        <InfoCard
          title={
            <div className="flex w-full justify-between">
              {t('dashboard.cards.teams.3rd.title')}
              <ChartPieIcon />
            </div>
          }
          childrenClassName="gap-2"
          className="pb-0 gap-0"
        >
          <PieChartWrapper/>
        </InfoCard>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ListChecksIcon />
            <span>{t('dashboard.charts.teams-title')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <LineChartWrapper/>
        </CardContent>
      </Card>
    </>
  )
}
