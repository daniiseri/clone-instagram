'use client'

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/navigation-menu";
import { cn } from "@/lib/utils";
import { Heart, House, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo } from "react";
import { NewPost } from "../(post)/ui/new-post";
import { User } from "../(auth)/lib/dal";
import { cva } from "class-variance-authority";
import { usePathname } from "next/navigation";

type MenuProps = {
  className: string
  toggleShowSearch: () => void
  toggleShowNotifications: () => void
  close: () => void
  mode?: 'expanded' | 'compact' | 'collapsed' | null
  user?: User
  isActive?: string
  setIsActive: Dispatch<SetStateAction<string | undefined>>
  ENUM_PATHNAME?: Record<string, string>
}

const navigationMenuItemVariants = cva(
  '',
  {
    variants: {
      mode: {
        collapsed: '',
        compact: 'justify-center data-[active=true]:border data-[active=true]:border-border',
        expanded: '',
      }
    },
    defaultVariants: {
      mode: 'compact'
    }
  }
)

export function Menu({
  className,
  mode,
  user,
  toggleShowSearch,
  toggleShowNotifications,
  close,
  isActive,
  setIsActive,
  ENUM_PATHNAME
}: MenuProps) {
  const pathname = usePathname()



  const isPathname = useCallback((text: string) => {
    if (!ENUM_PATHNAME) return false

    return Object.values(ENUM_PATHNAME).includes(text)
  }, [ENUM_PATHNAME])

  useEffect(() => {
    if (!ENUM_PATHNAME) return

    setIsActive(ENUM_PATHNAME[pathname])
  }, [pathname, ENUM_PATHNAME, setIsActive])

  function handleChange(text: string) {
    if (!ENUM_PATHNAME) return

    const currentIsActive = isActive === text ? ENUM_PATHNAME[pathname] : text

    setIsActive(currentIsActive)
  }

  const ITEMS = useMemo(() => {
    switch (mode) {
      case 'collapsed': {
        return [
          { icon: <House className={cn(isActive === 'Página inicial' && 'fill-black')} />, text: 'Página inicial', href: '/' },
          { icon: <Image width={24} height={24} alt='explorar' src='/explore.svg' />, text: 'Explorar' },
          { icon: <Image width={24} height={24} alt='reels' src='/reels.svg' />, text: 'Reels' },
          { icon: <Image width={24} height={24} alt='mensagens' src={isActive === 'Mensagens' ? '/share-active.svg' : '/share.svg'} />, text: 'Mensagens', href: '/direct' },
          { icon: <Image width={24} height={24} alt='nova publicação' src='/add.svg' />, text: 'Criar', dialog: (mode?: 'expanded' | 'compact' | 'collapsed' | null) => <NewPost mode={mode} />, dialogTitle: 'Criar nova publicação' },
          {
            icon: <Image className={cn(user?.profilePhotoURL && 'rounded-full')} width={24} height={24} alt='perfil' src={user?.profilePhotoURL || '/user.svg'} />,
            text: 'Perfil',
            href: '/{username}'
          },
        ]
      }
      default: {
        return [
          { icon: <House className={cn(isActive === 'Página inicial' && 'fill-black')} />, text: 'Página inicial', href: '/' },
          {
            icon: <Search className="scale-105" />,
            text: 'Pesquisa',
            onClick: toggleShowSearch
          },
          { icon: <Image width={24} height={24} alt='explorar' src='/explore.svg' />, text: 'Explorar' },
          { icon: <Image width={24} height={24} alt='reels' src='/reels.svg' />, text: 'Reels' },
          { icon: <Image width={24} height={24} alt='mensagens' src={isActive === 'Mensagens' ? '/share-active.svg' : '/share.svg'} />, text: 'Mensagens', href: '/direct' },
          {
            icon: <Heart />,
            text: 'Notificações',
            onClick: toggleShowNotifications
          },
          { icon: <Image width={24} height={24} alt='nova publicação' src='/add.svg' />, text: 'Criar', dialog: (mode?: 'expanded' | 'compact' | 'collapsed' | null) => <NewPost mode={mode} />, dialogTitle: 'Criar nova publicação' },
          {
            icon: <div className={cn('border-2 border-transparent rounded-full', isActive === 'Perfil' && "border-black")}><Image className={cn(user?.profilePhotoURL && 'rounded-full aspect-square',)} width={24} height={24} alt='perfil' src={user?.profilePhotoURL || '/user.svg'} /></div>,
            text: 'Perfil',
            href: '/{username}'
          },
        ]
      }
    }


  }, [user?.profilePhotoURL, toggleShowSearch, toggleShowNotifications, mode, isActive])

  if (!user) return null

  return (
    <div className={cn(
      'z-20',
      className
    )}>
      {
        mode === 'compact'
          ? (
            <div className="p-3 rounded-lg hover:bg-zinc-100 cursor-pointer mb-7 mt-3">
              <Image className={cn(mode === 'compact' && 'mx-auto')} width={24} height={24} alt="página inicial" src='/instagram_icon.svg' />
            </div>

          ) : mode === 'expanded' && (
            <div className="md:flex-1 md:px-3 md:pt-6 md:pb-4 md:mb-7 md:mt-3">
              <Image className="w-auto" priority height={112} width={112} alt='logo' src='/Instagram_logo.svg.png' />
            </div>
          )
      }
      <NavigationMenu>
        <NavigationMenuList className="flex justify-evenly md:block">
          {
            ITEMS.map(({ icon, text, href, dialog, dialogTitle, onClick }) => (
              <NavigationMenuItem className="w-auto md:p-0 md:my-1" key={text} onClick={() => handleChange(text)}>
                {
                  dialog && dialogTitle
                    ? dialog(mode)
                    : (
                      <Link
                        onClick={onClick || close}
                        data-active={isActive === text && !isPathname(text)}
                        className={cn("flex items-center gap-3 p-3 rounded-lg md:hover:bg-zinc-100 cursor-pointer",
                          navigationMenuItemVariants({
                            mode
                          })
                        )}
                        href={href?.replace('{username}', user.username) || '#'}
                      >
                        {icon}

                        {
                          mode === 'expanded'
                          && (
                            <span className={cn('text-sm', isActive === text && 'font-bold')}>{text}</span>
                          )
                        }
                      </Link>
                    )
                }

              </NavigationMenuItem>
            ))
          }
        </NavigationMenuList>
      </NavigationMenu>
    </div >
  )
}