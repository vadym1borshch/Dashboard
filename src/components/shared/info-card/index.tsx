import { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  title: string
  subTitle?: ReactNode
  className?: string
}

export const InfoCard = ({ children, subTitle, title, className }: Props) => {
  return (
    <Card className={cn('flex flex-col gap-2 bg-transparent p-4', className)}>
      <CardHeader className="p-0">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
      <CardFooter className="p-0 mt-auto">{subTitle}</CardFooter>
    </Card>
  )
}
