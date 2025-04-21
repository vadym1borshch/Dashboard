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
import { format, Locale } from 'date-fns'

const data = [
  {
    name: 'Jan',
    office: 82,
    wfh: 44,
  },
  {
    name: 'Feb',
    office: 80,
    wfh: 40,
  },
  {
    name: 'Mar',
    office: 83,
    wfh: 42,
  },
  {
    name: 'Apr',
    office: 50,
    wfh: 50,
  },
  {
    name: 'May',
    office: 40,
    wfh: 60,
  },
  {
    name: 'Jun',
    office: 60,
    wfh: 40,
  },
  {
    name: 'Jul',
    office: 55,
    wfh: 55,
  },
  {
    name: 'Aug',
    office: 49,
    wfh: 61,
  },
  {
    name: 'Sep',
    office: 44,
    wfh: 70,
  },
  {
    name: 'Oct',
    office: 40,
    wfh: 40,
  },
  {
    name: 'Nov',
    office: 50,
    wfh: 50,
  },
  {
    name: 'Dec',
    office: 50,
    wfh: 50,
  },
]
const getLocalizedMonthName = (monthAbbr: string, locale: Locale) => {
  const date = new Date(`${monthAbbr} 1, 2024`)
  const str = format(date, 'LLL', { locale })
  const cleaned = str.replace(/\./g, '').trim()
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

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
          formatter={(value, name) => {
            if (name === 'wfh') {
              return [value, t('dashboard.charts.bar.labels.home')]
            } else if (name === 'office') {
              return [value, t('dashboard.charts.bar.labels.office')]
            }
          }}
          wrapperClassName="dark:!bg-black rounded-md shadow-lg dark:!border-border"
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
