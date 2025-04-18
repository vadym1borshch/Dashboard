import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  title: string
  subTitle?: string
  className?: string
}

export const InfoCard = ({ children, subTitle, title, className }: Props) => {
  return (
    <Card className={cn('flex flex-col gap-4 bg-transparent p-4', className)}>
      <h5 className="text-base">{title}</h5>
      {children}
      <h6 className="text-xs pt-2">{subTitle}</h6>
    </Card>
  )
}
