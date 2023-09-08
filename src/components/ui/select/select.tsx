import { ComponentPropsWithoutRef, FC } from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as Select from '@radix-ui/react-select'
import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './select.module.scss'

type Props = {
  values: string[]
  variant?: 'primary' | 'active' | 'hover' | 'focus'
  label?: string
} & ComponentPropsWithoutRef<'select'>

export const SelectC: FC<Props> = ({ values, variant = 'primary', label, ...rest }) => {
  const items = values.map((item, i) => {
    return (
      <>
        <Select.Item className={clsx(s[variant])} key={i} value={item}>
          <Select.ItemText>{item}</Select.ItemText>
        </Select.Item>
      </>
    )
  })

  return (
    <div className={s.selectContainer}>
      <Select.Root>
        {label && (
          <label htmlFor={rest.name} aria-disabled={rest.disabled}>
            <Typography variant={'body2'} className={s.label}>
              {label}
            </Typography>
          </label>
        )}
        <Select.Trigger className="SelectTrigger" aria-label="Food">
          <Select.Value placeholder="Select-box" />
          <Select.Icon className="SelectIcon">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content className="SelectContent">
          <Select.Viewport className="SelectViewport">{items}</Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  )
}

// export type SelectItemProps = {
//   children: ReactNode
//   value: string
//   variant: 'primary' | 'active' | 'hover' | 'focus'
//   className?: string
// } & React.RefAttributes<HTMLDivElement>
//
// const SelectItem: React.FC<SelectItemProps> = React.forwardRef(
//   ({ children, className, variant = 'primary', ...props }, forwardedRef) => {
//     return (
//       <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
//         <Select.ItemText>{children}</Select.ItemText>
//         <Select.ItemIndicator className="SelectItemIndicator">
//           <CheckIcon />
//         </Select.ItemIndicator>
//       </Select.Item>
//     )
//   }