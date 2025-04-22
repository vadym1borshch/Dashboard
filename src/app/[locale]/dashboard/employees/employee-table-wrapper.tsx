'use client'
import DataTable from '@/components/ui/data-table'
import { useTranslations } from 'next-intl'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { Employee, employees } from '@/app/[locale]/dashboard/employees/mock'
import {
  Tooltip, TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const EmployeeTableWrapper = () => {
  const t = useTranslations()
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: 'avatar',
      header: '',
      cell: ({ row }) => {
        const avatar: string = row.getValue('avatar')
        const firstName: string = row.getValue('firstName')
        const lastName: string = row.getValue('lastName')

        return (
          <Avatar className="h-10 w-10">
            {!avatar && (
              <AvatarFallback className="uppercase">
                {firstName[0]}
                {lastName[0]}
              </AvatarFallback>
            )}
            {!!avatar && (
              <Image src={avatar} alt={`${firstName} ${lastName}`} fill />
            )}
          </Avatar>
        )
      },
    },
    {
      accessorKey: 'firstName',
      header: () => {
        return <span>{t('dashboard.tables.employee.name')}</span>
      },
    },
    {
      accessorKey: 'lastName',
      header: () => {
        return (
          <span className="hidden md:inline">
            {t('dashboard.tables.employee.last-name')}
          </span>
        )
      },
      cell: ({ row }) => {
        const lastName: string = row.getValue('lastName')
        return <span className="hidden md:inline">{lastName}</span>
      },
    },
    {
      accessorKey: 'teamName',
      header: () => {
        return <span>{t('dashboard.tables.employee.team-name')}</span>
      },
    },
    {
      accessorKey: 'isTeamLeader',
      header: '',
      cell: ({ row }) => {
        const isTeamLeader: boolean = row.getValue('isTeamLeader')
        return isTeamLeader ? (
          <div className="flex items-center gap-1">
            <Badge variant="success" className="hidden md:block">
              {t('dashboard.tables.employee.team-leader')}
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>  <span className="block h-4 w-4 rounded-full bg-green-400 md:hidden" /></TooltipTrigger>
                <TooltipContent>
                  {t('dashboard.tables.employee.team-leader')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          </div>
        ) : null
      },
    },
  ]
  return <DataTable data={employees} columns={columns} />
}
