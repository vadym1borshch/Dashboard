import { InfoCard } from '@/components/shared/info-card'
import Switcher from '@/components/shared/switch'

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Switcher
        value1={{ label: 'common.form.switch.value1', key: 'employees' }}
        value2={{ label: 'common.form.switch.value2', key: 'teams' }}
      />
      <div className="grid grid-cols-3 gap-4">
        <InfoCard title="Total">1</InfoCard>
        <InfoCard title="Total2">2</InfoCard>
        <InfoCard title="Total3" subTitle="subTitle">
          3
        </InfoCard>
      </div>
      <div>chart</div>
    </div>
  )
}

export default DashboardPage
