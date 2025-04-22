import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { passwordRegex } from '@/@common/regex'

export const useLoginValidation = () => {
  const t = useTranslations()
  return z
    .object({
      email: z.string().email(t('errors.validations.email')),
      password: z
        .string()
        .min(8, t('errors.validations.password.min-char'))
        .refine((password) => {
          return passwordRegex.test(password)
        }, t('errors.validations.password.contains')),
      accountType: z.enum(['personal', 'company'], {
        message: t('errors.validations.required-field', {
          field: t('common.form.account-type.label'),
        }),
      }),
      companyName: z.string().optional(),
      numsOfEmployees: z.coerce.number().optional(),
      birthDate: z
        .date({
          message: t('errors.validations.required-field', {
            field: t('common.form.birth-date.label'),
          }),
        })
        .refine((date) => {
          const now = new Date()
          const eighteen = new Date(
            now.getFullYear() - 18,
            now.getMonth(),
            now.getDate()
          )
          return date <= eighteen
        }, t('errors.validations.year-validation')),
      confirmPassword: z.string(),
      terms: z
        .boolean({
          required_error: t('errors.validations.terms'),
        })
        .refine((val) => val, {
          message: t('errors.validations.terms'),
        }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['confirmPassword'],
          message: t('errors.validations.password.confirm'),
        })
      }
      if (data.accountType === 'company' && !data.companyName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['companyName'],
          message: t('errors.validations.required-field', {
            field: t('common.form.company-name'),
          }),
        })
      }
      if (
        data.accountType === 'company' &&
        (!data.numsOfEmployees || data.numsOfEmployees < 1)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['numsOfEmployees'],
          message: t('errors.validations.required-field', {
            field: t('common.form.nums-of-employees'),
          }),
        })
      }
    })
}
