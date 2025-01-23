'use client'

import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Menu } from "./menu";
import { cva, VariantProps } from "class-variance-authority";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User } from "../(auth)/lib/dal";
import { Search } from "./search";
import { Notifications } from "./notifications";

const menuVariants = cva(
  'fixed border-border bg-white',
  {
    variants: {
      mode: {
        collapsed: 'w-full border-t bottom-0',
        compact: 'h-screen border-r px-3 pt-2 pb-5',
        expanded: 'h-screen border-r w-61 px-3 pt-2 pb-5',
      }
    },
    defaultVariants: {
      mode: 'compact'
    }
  }
)

const compactRoutes = ['/direct']

export function Layout({ children, user }: { children: ReactNode, user?: User }) {
  const [mode, setMode] = useState<VariantProps<typeof menuVariants>['mode']>()
  const [isActive, setIsActive] = useState<string>()
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [lastBodyWidth, setLastBodyWidth] = useState<number>()
  const ref = useRef<HTMLDivElement | null>(null)
  const path = usePathname()

  const ENUM_PATHNAME = useMemo(() => {
    if (!user) return

    const { username } = user

    return {
      '/': 'Página inicial',
      '/direct': 'Mensagens',
      [`/${username}`]: 'Perfil'
    }
  }, [user])

  const setCollapsed = useCallback(() => {
    setMode('collapsed')
  }, [])

  const setCompact = useCallback(() => {
    setMode('compact')
  }, [])

  const setExpanded = useCallback(() => {
    if (!showNotifications && !showSearch)
      setMode('expanded')
  }, [showNotifications, showSearch])

  const handleMode = useCallback(function handleMode() {
    switch (true) {
      case document.body.offsetWidth < 768: {
        setCollapsed()
        break;
      }
      case document.body.offsetWidth < 1280 || compactRoutes.includes(path): {
        setCompact()
        break;
      }
      default: setExpanded()
    }
  }, [path, setCompact, setCollapsed, setExpanded])

  function toggleShowSearch() {
    closeNotifications()

    if (!showSearch)
      setCompact()

    setShowSearch(!showSearch)
  }

  const closeSearch = useCallback(function () {
    if (showSearch)
      setShowSearch(false)
  }, [showSearch])

  function toggleShowNotifications() {
    closeSearch()

    if (!showNotifications)
      setCompact()

    setShowNotifications(!showNotifications)
  }

  const closeNotifications = useCallback(function () {
    if (showNotifications)
      setShowNotifications(false)
  }, [showNotifications])

  const close = useCallback(function () {
    if (!ENUM_PATHNAME) return

    closeNotifications()
    closeSearch()

    setIsActive(ENUM_PATHNAME[path])

    handleMode()
  }, [path, handleMode, closeNotifications, closeSearch, ENUM_PATHNAME])


  const handleResize = useCallback(function (includeMode?: boolean) {
    setLastBodyWidth(document.body.offsetWidth)

    if (includeMode)
      handleMode()

    if (ref.current) {
      if (document.body.offsetWidth < 768) {
        if (ENUM_PATHNAME && lastBodyWidth && lastBodyWidth >= 768) {
          closeNotifications()
          closeSearch()
          setIsActive(ENUM_PATHNAME[path])
        }

        ref.current.style.marginLeft = '0'

        const before = ref.current.previousElementSibling
        if (before instanceof HTMLDivElement)
          ref.current.style.height = `calc(100vh - ${before.offsetHeight}px)`

        return
      }

      if (compactRoutes.includes(path) || document.body.offsetWidth < 1280) {
        ref.current.style.marginLeft = '4.625rem'
        ref.current.style.height = '100vh'
        return
      }

      ref.current.style.marginLeft = '15.25rem'
      ref.current.style.height = '100vh'
    }
  }, [path, handleMode, ENUM_PATHNAME, closeNotifications, closeSearch, lastBodyWidth])

  useEffect(() => {
    window.addEventListener('resize', () => handleResize(true))

    handleResize(true)

    return () => {
      window.addEventListener('resize', () => handleResize(true))
    }
  }, [path, setCollapsed, setCompact, setExpanded, showNotifications, showSearch, handleResize])

  useEffect(() => {
    handleResize()
  }, [mode, handleResize])


  if (!mode) return null

  return (
    <div className="flex">
      <Menu
        ENUM_PATHNAME={ENUM_PATHNAME}
        setIsActive={setIsActive}
        isActive={isActive}
        close={close}
        toggleShowSearch={toggleShowSearch}
        toggleShowNotifications={toggleShowNotifications}
        user={user}
        className={cn(menuVariants({
          mode
        }))}
        mode={mode}
      />
      {
        showSearch
        && (
          <Search />
        )
      }
      {
        showNotifications
        && (
          <Notifications />
        )
      }

      <div className={cn("flex-1")} ref={ref} onClick={close}>
        {children}
      </div>
    </div>
  )
}