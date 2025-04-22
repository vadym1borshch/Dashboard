'use client'
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/helpers/hooks/useLocale'
import { data } from '@/components/shared/charts/bar-chart/mock'
import { getLocalizedMonthName } from '@/components/shared/charts/helpers'

const BarChartContainer = () => {
  const t = useTranslations()
  const { dateFnsLocale } = useLocale()
  const formattedData = data.map((item) => {
    return {
      ...item,
      name: getLocalizedMonthName(item.name, dateFnsLocale),
    }
  })
  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart
        data={formattedData}
        className="[&_.recharts-tooltip-cursor]:fill-zinc-200 dark:[&_.recharts-tooltip-cursor]:fill-zinc-800"
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          separator=" - "
          labelClassName="font-bold"
          wrapperClassName="dark:!bg-black rounded-md shadow-lg dark:!border-border"
          formatter={(value, name) => {
            if (name === 'wfh') {
              return [value, t('dashboard.charts.bar.labels.home')]
            } else if (name === 'office') {
              return [value, t('dashboard.charts.bar.labels.office')]
            }
          }}
        />
        <Legend
          iconType="circle"
          formatter={(value) =>
            value === 'wfh' ? (
              <span>{t('dashboard.charts.bar.labels.home')}</span>
            ) : (
              <span>{t('dashboard.charts.bar.labels.office')}</span>
            )
          }
        />
        <Bar dataKey="office" stackId={1} fill="#00dc4d" />
        <Bar dataKey="wfh" stackId={1} fill="#6b7280" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartContainer
