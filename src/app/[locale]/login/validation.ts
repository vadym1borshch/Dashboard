import { useTranslations } from 'next-intl'
import { z } from 'zod'

export const useLoginValidation = () => {
  const t = useTranslations()
  return z.object({
    email: z.string().email({
      message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  })
};