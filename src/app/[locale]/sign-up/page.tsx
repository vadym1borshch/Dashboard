'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import React from 'react'
import { useTranslations } from 'next-intl'
import { SignUpForm } from '@/app/[locale]/sign-up/sign-up-form'

const SignUpPage = () => {
  const t = useTranslations()
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-[90vw] md:w-1/2 lg:w-1/3">
        <CardHeader>
          <CardTitle>{t('register.title')}</CardTitle>
          <CardDescription>
            <small>
              {t('register.description', { platform: 'SupportMe' })}
            </small>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUpPage
