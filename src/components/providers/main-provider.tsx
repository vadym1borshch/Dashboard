import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: Record<string, any>
}

export const MainProvider = ({ children, messages }: Props) => {
  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
