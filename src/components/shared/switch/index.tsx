'use client'
import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

type Value = {
  label: string
  key: string
}

interface Props {
  values: Value[]
  current: string
  setCurrent: (val: string) => void
}

const Switcher = ({ values, setCurrent, current }: Props) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, height: 0, x: 0, y: 0 })
  const [isVertical, setIsVertical] = useState(false)

  const t = useTranslations()
  const ref1 = useRef<HTMLButtonElement>(null)
  const ref2 = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const checkScreen = () => {
      setIsVertical(window.innerWidth < 768) // <sm
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const updateIndicator = () => {
      const target = current === values[0].key ? ref1.current : ref2.current
      if (target) {
        const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = target
        setIndicatorStyle({
          width: offsetWidth,
          height: offsetHeight,
          x: offsetLeft,
          y: offsetTop,
        })
      }

      animationFrameId = requestAnimationFrame(updateIndicator)
    }

    animationFrameId = requestAnimationFrame(updateIndicator)

    return () => cancelAnimationFrame(animationFrameId)
  }, [current, values])

  return (
    <div
      className={cn(
        'relative w-full md:w-fit rounded-[4px] p-1 transition-all duration-300 ease-in-out',
        'bg-primary dark:bg-secondary',
        isVertical ? 'flex flex-col' : 'inline-flex flex-row'
      )}
    >
      <div
        className="absolute rounded-[4px] bg-muted dark:bg-black transition-all duration-300 ease-in-out"
        style={{
          width: `${indicatorStyle.width}px`,
          height: `${indicatorStyle.height}px`,
          transform: `translate(${indicatorStyle.x}px, ${indicatorStyle.y}px)`,
        }}
      />

      <div
        className={cn(
          'relative z-10 flex transition-all duration-300 gap-1',
          isVertical ? 'flex-col' : 'flex-row'
        )}
      >
        {values.map((val, idx) => {
          const isActive = current === val.key
          const ref = idx === 0 ? ref1 : ref2

          return (
            <Button
              key={val.key}
              ref={ref}
              onClick={() => setCurrent(val.key)}
              className={cn(
                'relative z-10 px-6 py-1.5 text-sm font-semibold transition-colors duration-300 bg-transparent shadow-none',
                'rounded-md text-white',
                'hover:bg-transparent',
                {
                  'dark:text-white text-black': isActive,
                  'text-white': !isActive,
                }
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