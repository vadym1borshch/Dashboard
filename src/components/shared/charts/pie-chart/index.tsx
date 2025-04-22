'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  {
    name: 'Delta',
    value: 55,
    color: '#84cc16',
  },
  {
    name: 'Alpha',
    value: 34,
    color: '#3b82f6',
  },
  {
    name: 'Canary',
    value: 11,
    color: '#f97316',
  },
]

export const PieChartWrapper = () => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        <Tooltip
          labelClassName="font-bold"
          wrapperClassName="dark:!bg-black rounded-md shadow-lg dark:!border-border dark:[&_.recharts-tooltip-item]:!text-white [&_.recharts-tooltip-item]:!text-black"
        />
        <Pie data={data} dataKey="value">
          {data.map((dataItem, index) => (
            <Cell key={`cell-${index}`} fill={dataItem.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
