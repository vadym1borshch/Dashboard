import { sleep } from '@/helpers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmployeeTableWrapper } from '@/app/[locale]/dashboard/employees/employee-table-wrapper'
import { getTranslations } from 'next-intl/server'

const Employees = async ({ params }: { params: { locale: string } }) => {
  const t = await getTranslations({ locale: params.locale })
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
