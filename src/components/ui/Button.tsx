'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
          variant === 'primary' && 'bg-gold text-navy hover:bg-gold-light active:bg-gold-dark shadow-sm',
          variant === 'secondary' && 'bg-navy text-white hover:bg-navy-800 shadow-sm',
          variant === 'outline' && 'border-2 border-gold text-gold hover:bg-gold hover:text-navy',
          variant === 'whatsapp' && 'bg-[#25D366] text-white hover:bg-[#20BA5A] shadow-sm',
          variant === 'ghost' && 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
          size === 'sm' && 'text-sm px-4 py-2 rounded-lg',
          size === 'md' && 'text-base px-6 py-3 rounded-xl',
          size === 'lg' && 'text-lg px-8 py-4 rounded-xl',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
