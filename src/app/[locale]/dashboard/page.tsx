'use client'
import Switcher from '@/components/shared/switch'
import { useEffect, useState } from 'react'
import { EmployeesStats } from '@/app/[locale]/dashboard/stats/employees'
import { TeamsStats } from '@/app/[locale]/dashboard/stats/teams'

type Current = 'employees' | 'teams'

const DashboardPage = () => {
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
      {current === 'employees' ? <EmployeesStats /> : <TeamsStats />}
    </div>
  )
}

export default DashboardPage
