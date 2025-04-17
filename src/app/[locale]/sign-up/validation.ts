import { useTranslations } from 'next-intl'
import { z } from 'zod'

export const useLoginValidation = () => {
  const t = useTranslations()
  return z
    .object({
      email: z.string().email({}),
      password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
      }),
      accountType: z.enum(['personal', 'company']),
      companyName: z.string().optional(),
      numsOfEmployees: z.coerce.number().optional(),
      birthDate: z.date().refine((date) => {
        const now = new Date()
        const eighteen = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate())
        return date <= eighteen
      }, "You must be at least 18 years old to register."),
      confirmPassword: z.string(),
      terms: z.boolean(),
    })
    .superRefine((data, ctx) => {
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
