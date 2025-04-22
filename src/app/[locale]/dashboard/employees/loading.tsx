"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useTranslations } from 'next-intl'

const Loading =  () => {
  const t = useTranslations()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.tables.employee.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-[60px_1fr_1fr_1fr_1fr] items-center gap-4">
        <>
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </>
        <>
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </>
      </CardContent>
    </Card>
  )
}

export default Loading
