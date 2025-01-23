import { cn } from "@/lib/utils"
import React, { HTMLAttributes } from "react"

export const Card = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("z-10 fixed h-screen border-r rounded-r-2xl py-2 bg-white", className)}
      {...props}
    />
  )
})

Card.displayName = 'Card'

export const Title = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="my-2 pl-6 pt-3 pr-3 pb-9"
      {...props}
    >
      <div>
        <span className="text-2xl leading-4 font-semibold">{children}</span>
      </div>
    </div>
  )
})

Title.displayName = 'Title'