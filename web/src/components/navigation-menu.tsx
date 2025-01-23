import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import React, { HTMLAttributes, ReactNode } from "react";

export const NavigationMenu = React.forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn(
      '',
      className
    )}
    {...props}
  />
))

NavigationMenu.displayName = 'NavigationMenu'

export const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      '',
      className
    )}
    {...props}
  />
))

NavigationMenuList.displayName = 'NavigationMenuList'

const NavigationMenuItemVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        ghost: '',
        settings: ''
      }
    },
    defaultVariants: {
      variant: 'ghost'
    }
  }
)

export const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  HTMLAttributes<HTMLLIElement> & VariantProps<typeof NavigationMenuItemVariants>
>(({ className, variant, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      NavigationMenuItemVariants({
        variant
      }),
      className
    )}
    {...props}
  />
))

NavigationMenuItem.displayName = 'NavigationMenuItem'

function NavigationMenuSectionTitle(props: { children: ReactNode }) {
  return (
    <h3 className="px-4 py-3 text-xs text-zinc-500" {...props} />
  )
}

function NavigationMenuSectionItem({ href, label, icon }: { href: string, icon: ReactNode, label: string }) {
  return (
    <NavigationMenuItem>
      <Link
        className="flex items-center gap-2 text-sm px-4 py-3 hover:bg-zinc-100 rounded-lg"
        href={href}
      >
        {icon}
        {label}
      </Link>
    </NavigationMenuItem>
  )
}

export const NavigationMenuSection = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { title: string, items: { href: string, label: string, icon: ReactNode }[] }
>(({ className, title, items, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(className)}
    {...props}
  >
    <NavigationMenuSectionTitle>{title}</NavigationMenuSectionTitle>
    <NavigationMenuList>
      {
        items.map(({ href, label, icon }) => (
          <NavigationMenuSectionItem key={label} href={href} icon={icon} label={label} />
        ))
      }
    </NavigationMenuList>
  </div>
))

NavigationMenuSection.displayName = 'NavigationMenuSection'