'use client'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useLayoutEffect } from '@radix-ui/react-use-layout-effect'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

type Value = {
  label: string
  key: string
}

interface Props {
  value1: Value
  value2: Value
}

const Switcher = ({ value1, value2 }: Props) => {
  const [active, setActive] = useState(value1)
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const t = useTranslations()
  const ref1 = useRef<HTMLButtonElement>(null)
  const ref2 = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    const target = active === value1 ? ref1.current : ref2.current
    if (target) {
      const { offsetWidth, offsetLeft } = target
      setIndicatorStyle({ width: offsetWidth, left: offsetLeft })
    }
  }, [active, value1, value2])

  return (
    <div className="dark:bg-secondary relative inline-flex w-fit rounded-[4px] bg-primary p-1">
      <div
        className="absolute top-1/2 h-8 rounded-[4px] bg-muted transition-all duration-300 ease-in-out dark:bg-black"
        style={{
          width: `${indicatorStyle.width}px`,
          transform: `translate(${indicatorStyle.left}px, -50%)`,
        }}
      />

      <div className="relative z-10 flex items-center gap-1">
        {[value1, value2].map((val, idx) => {
          const isActive = active === val
          const ref = idx === 0 ? ref1 : ref2

          return (
            <Button
              key={val.key}
              ref={ref}
              onClick={() => setActive(val)}
              className={cn(
                'relative z-10 px-6 py-1.5 text-sm font-semibold transition-colors duration-300 bg-transparent',
                'rounded-md text-white',
                'hover:bg-transparent',
                { 'dark:text-white text-black': isActive, 'text-white': !isActive },

              )}
            >
              {t(val.label)}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default Switcher
