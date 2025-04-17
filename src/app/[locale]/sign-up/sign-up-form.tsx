import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
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
import { useLoginValidation } from '@/app/[locale]/sign-up/validation'
import { Checkbox } from '@/components/ui/checkbox'
import { Link } from '@/i18n/navigation'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { enUS, uk } from 'date-fns/locale'

export const SignUpForm = () => {
  const t = useTranslations()
  const formSchema = useLoginValidation()
  const locale = useLocale()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const localeMap = {
    en: enUS,
    ua: uk,
  }

  const dateFnsLocale = localeMap[locale as keyof typeof localeMap] ?? enUS

  const accountType = form.watch('accountType')

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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('common.form.account-type.label')}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t('common.form.account-type.placeholder')}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="personal">
                      {t('register.form.select-values.personal')}
                    </SelectItem>
                    <SelectItem value="company">
                      {t('register.form.select-values.company')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {accountType === 'company' && (
          <>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.form.company-name')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('common.form.company-name')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numsOfEmployees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.form.nums-of-employees')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('common.form.nums-of-employees')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('common.form.birth-date.label')}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'font-normal tracking-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>{t('common.form.birth-date.placeholder')}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    defaultMonth={field.value}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    fixedWeeks
                    weekStartsOn={1}
                    initialFocus
                    fromYear={1920}
                    toDate={new Date()}
                    captionLayout="dropdown-buttons"
                    locale={dateFnsLocale}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('common.form.confirm-password')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('common.form.confirm-password')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full self-center md:w-1/2">
          {t('register.sign-up')}
        </Button>
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-3">
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="terms" className="cursor-pointer">
                      {t('common.form.terms-of-use.label')}
                    </Label>
                  </span>
                  <p>
                    {t.rich('common.form.terms-of-use.description', {
                      link: (chunks) => (
                        <Button
                          asChild
                          className="h-fit bg-transparent p-0 text-base text-red-500 hover:bg-transparent"
                        >
                          <Link href="/terms-of-use">{chunks}</Link>
                        </Button>
                      ),
                    })}
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
