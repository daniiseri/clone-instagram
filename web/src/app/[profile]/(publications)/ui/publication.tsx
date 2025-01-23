'use client'

import { cn } from "@/lib/utils";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type PublicationProps = {
  url: string
}

export function Publication({
  url
}: PublicationProps) {
  const [show, setShow] = useState(false)

  function onMouseEnter() {
    setShow(true)
  }

  function onMouseLeave() {
    setShow(false)
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="z-10 relative h-72 cursor-pointer"
    >
      <div className="bg-zinc-500 w-full h-full">
        <Image className="w-full h-full" height={240} width={240} alt='' src={url} />
      </div>

      <div className={cn("w-full h-full absolute top-0 left-0 bg-black/10 flex items-center",
        !show && 'hidden'
      )}>
        <div className="flex justify-center gap-4 w-full">
          <div className="flex gap-1 text-white fill-white">
            <Heart />
            <span>10</span>
          </div>
          <div className="flex gap-1 text-white fill-white">
            <MessageCircle />
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  )
}