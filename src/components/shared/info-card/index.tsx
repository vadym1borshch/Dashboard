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
  title: ReactNode
  subTitle?: ReactNode
  className?: string
  childrenClassName?: string
}

export const InfoCard = ({
  children,
  subTitle,
  title,
  className,
  childrenClassName,
}: Props) => {
  return (
    <Card className={cn('flex flex-col gap-2 bg-transparent p-4', className)}>
      <CardHeader className="p-0">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className={cn('flex items-center p-0', childrenClassName)}>
        {children}
      </CardContent>
      <CardFooter className="mt-auto p-0">{subTitle}</CardFooter>
    </Card>
  )
}
