'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { LoginForm } from '@/app/[locale]/login/login-form'

const LoginPage = () => {
  const t = useTranslations()
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <Card className="w-[90vw] md:w-1/2 lg:w-1/3">
        <CardHeader>
          <CardTitle>{t('login.title')}</CardTitle>
          <CardDescription>
            <small>{t('login.description', { platform: 'SupportMe' })}</small>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="justify-between">
          <small>{t('login.no-account')}</small>
          <Button variant="outline" asChild>
            <Link href="/sign-up">{t('register.sign-up')}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>

  )
}

export default LoginPage
