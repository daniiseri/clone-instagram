import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  '',
  {
    variants: {
      variant: {
        ghost: '',
        primary: 'rounded-lg px-4 py-1 bg-blue-400 hover:bg-blue-500 text-white w-full font-semibold',
        gray: 'rounded-lg px-4 py-1 bg-gray-200 hover:bg-gray-300 w-full text-sm',
        secondary: 'border-t border-border px-2 py-1 text-center w-full h-12 text-sm'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
)

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
>(({ className, variant, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(buttonVariants({ variant }), className)}
    {...props}
  />
))

Button.displayName = 'Button'