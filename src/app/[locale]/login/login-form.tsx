import { useTranslations } from 'next-intl'
import { useLoginValidation } from '@/app/[locale]/login/validation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React from 'react'

export const LoginForm = () => {
  const t = useTranslations()
  const formSchema = useLoginValidation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
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
                <Input placeholder={t('common.form.email')} {...field} />
              </FormControl>
              <FormDescription>
                <small>
                  {t('login.form-description', { platform: 'SupportMe' })}
                </small>
              </FormDescription>
              <FormMessage />
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
                <Input placeholder={t('common.form.password')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full self-center md:w-1/2">
          {t('login.title')}
        </Button>
      </form>
    </Form>
  )
}
