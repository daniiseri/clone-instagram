'use client'

import { User } from "@/app/(auth)/lib/dal";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

type InboxProps = {
  user?: User
}
export function Inbox({
  user
}: InboxProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleResize() {
      if (ref.current) {
        const before = ref.current.previousElementSibling
        if (before instanceof HTMLDivElement)
          ref.current.style.height = `calc(100% - ${before.offsetHeight}px)`
      }
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      handleResize()
    }
  }, [])

  return (
    <div className='w-auto border-r border-border md-lg:w-96 md-lg:h-screen'>
      <div className="flex justify-center pt-7 pb-3 md-lg:justify-between md-lg:items-center md-lg:h-[12.5%] md-lg:pr-8 md-lg:pl-6 md-lg:pt-11">
        <p className="hidden md-lg:block md-lg:font-extrabold">{user?.username}</p>
        <div className="p-2 md-lg:p-0">
          <SquarePen />
        </div>
      </div>

      <div ref={ref} className="md-lg:h-[88.75%] overflow-auto md-lg:px-6 md-lg:pt-11">
        <div className="hidden md-lg:w-20 md-lg:flex md-lg:flex-col md-lg:text-center">
          <Image className={cn(user?.profilePhotoURL && 'rounded-full')} width={76} height={76} alt="avatar" src={user?.profilePhotoURL || '/user.svg'} />
          <p className="text-xs text-zinc-500">Sua nota</p>
        </div>

        <div>
          <div className="hidden md-lg:flex md-lg:justify-between pt-4 pb-3">
            <p className="font-bold">Mensagens</p>
            <p className="text-sm text-zinc-500 font-semibold">Solicitações</p>
          </div>

          <div>
            {
              Array(15).fill(null).map((_, index) => (
                <div key={index} className="px-6 md-lg:p-0 md-lg:flex md-lg:items-center md-lg:gap-2 cursor-pointer hover:bg-zinc-100">
                  <Image width={64} height={64} alt={`avatar-${index}`} src='/user.svg' />
                  <div className="hidden md-lg:block">
                    <p className="text-sm">Nome completo</p>
                    <p className="text-xs">enviou um anexo . 2h</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}