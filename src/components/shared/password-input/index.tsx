'use client'
import { ComponentProps, useState } from 'react'
import { Input } from '@/components/ui/input'
import { EyeIcon } from 'lucide-react'
import { EyeOffIcon } from 'lucide-react'

interface Props extends ComponentProps<'input'> {
  hidden?: boolean
}

const iconStyle =
  'absolute top-1/2 right-2 -translate-y-1/2 transform cursor-pointer select-none'

const PasswordInput = ({ hidden = true, ...props }: Props) => {
  const [type, setType] = useState<'text' | 'password'>(
    hidden ? 'password' : 'text'
  )
  const toggleType = () => setType(type === 'text' ? 'password' : 'text')

  return (
    <div className="relative flex items-center gap-2">
      <Input
        type={type}
        placeholder={props.placeholder || '••••••••'}
        {...props}
      />
      {type === 'password' ? (
        <EyeOffIcon size={20} onClick={toggleType} className={iconStyle} />
      ) : (
        <EyeIcon size={20} onClick={toggleType} className={iconStyle} />
      )}
    </div>
  )
}

export default PasswordInput
