import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { getMessages } from 'next-intl/server'
import { MainProvider } from '@/components/providers/main-provider'
import '@/app/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function BaseLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const messages = await getMessages()
  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <MainProvider messages={messages}>
        <div className="flex min-h-screen w-full items-center justify-center">
          {children}
        </div>
      </MainProvider>
    </body>
  )
}
