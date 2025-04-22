'use client'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useLocale } from '@/helpers/hooks/useLocale'
import { getLocalizedMonthName } from '@/components/shared/charts/helpers'
import { data } from '@/components/shared/charts/line-chart/mock'

export const LineChartWrapper = () => {
  const { dateFnsLocale } = useLocale()
  const formattedData = data.map((item) => ({
    ...item,
    name: getLocalizedMonthName(item.name, dateFnsLocale),
  }))
  return (
    <ResponsiveContainer height={350} width="100%">
      <LineChart data={formattedData}>
        <Legend
          formatter={(value) => <span className="capitalize">{value}</span>}
        />
        <Tooltip
          labelClassName="font-bold"
          wrapperClassName="dark:!bg-black rounded-md shadow-lg dark:!border-border dark:[&_.recharts-tooltip-item]:!text-white [&_.recharts-tooltip-item]:!text-black"
        />
        <XAxis fontSize={12} dataKey="name" stroke="#888888" />
        <YAxis fontSize={12} stroke="#888888" />
        <CartesianGrid strokeDasharray="3 3" />
        <Line type="monotone" stroke="#84cc16" dataKey="delta" />
        <Line type="monotone" stroke="#3b82f6" dataKey="alpha" />
        <Line type="monotone" stroke="#f97316" dataKey="canary" />
      </LineChart>
    </ResponsiveContainer>
  )
}
