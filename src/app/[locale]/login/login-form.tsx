import React from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PasswordInput from '@/components/shared/password-input'
import { emailRegex, passwordRegex } from '@/@common/regex'
import { redirect } from 'next/navigation'


type FormType = {
  email: string
  password: string
}

export const LoginForm = () => {
  const t = useTranslations()

  const form = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = async (values: FormType) => {
    if (!values.email || !values.password) {
      return
    }
    if (
      !emailRegex.test(values.email) ||
      !passwordRegex.test(values.password)
    ) {
      form.setError('email', { message: '' })
      form.setError('password', { message: '' })
      form.setError('root', { message: t('errors.validations.login') })
      return
    }

    redirect("/dashboard")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('common.form.email')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t('common.form.email')}
                  onChange={(e) => {
                    form.clearErrors()
                    field.onChange(e.currentTarget.value)
                  }}
                  value={field.value}
                />
              </FormControl>
              <FormDescription>
                <small>
                  {t('login.form-description', { platform: 'SupportMe' })}
                </small>
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('common.form.password')}</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  onChange={(e) => {
                    form.clearErrors()
                    field.onChange(e.currentTarget.value)
                  }}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <span className="text-red-500">
            {form.formState.errors.root.message}
          </span>
        )}
        <Button type="submit" className="w-full self-center">
          {t('login.title')}
        </Button>
      </form>
    </Form>
  )
}
