import { sleep } from '@/helpers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmployeeTableWrapper } from '@/app/[locale]/dashboard/employees/employee-table-wrapper'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

const Employees = async ({ params }: Props) => {
  const { locale } = await params
  const t = await getTranslations({ locale })
  await sleep(5000)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.tables.employee.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <EmployeeTableWrapper />
      </CardContent>
    </Card>
  )
}

export default Employees
