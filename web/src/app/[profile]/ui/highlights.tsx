'use client'

import { cn } from "@/lib/utils";
import { Heart, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Highlights() {
  const ref = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLUListElement>(null)
  const [width, setWidth] = useState<string>()

  useEffect(() => {
    if (!ref.current || !slidesRef.current) return


    function handleResize() {
      if (!ref.current || !slidesRef.current) return

      if (ref.current.offsetHeight !== slidesRef.current.offsetHeight)
        ref.current.style.height = slidesRef.current.offsetHeight + 'px'

      switch (true) {
        case document.body.offsetWidth < 320: {
          setWidth(ref.current.offsetWidth / 4 + 'px')
          break;
        }
        case document.body.offsetWidth < 448: {
          setWidth(ref.current.offsetWidth / 5 + 'px')
          break;
        }
        case document.body.offsetWidth < 512: {
          setWidth(ref.current.offsetWidth / 6 + 'px')
          break;
        }
        case document.body.offsetWidth < 640: {
          setWidth(ref.current.offsetWidth / 8 + 'px')
          break;
        }
        case document.body.offsetWidth < 768: {
          setWidth(ref.current.offsetWidth / 10 + 'px')
          break;
        }
        case document.body.offsetWidth < 896: {
          setWidth(ref.current.offsetWidth / 5 + 'px')
          break;
        }
        case document.body.offsetWidth < 1024: {
          setWidth(ref.current.offsetWidth / 6 + 'px')
          break;
        }
        default: setWidth(ref.current.offsetWidth / 7 + 'px')
      }
    }

    const resize = new ResizeObserver(handleResize)

    resize.observe(ref.current)

  }, [])


  return (
    <div ref={ref} className="w-full mb-11 2xs:px-2 md:px-8 overflow-hidden relative">
      <ul ref={slidesRef} className="absolute left-0 flex items-center">
        {
          Array(10).fill(null).map((_, index) => (
            <li
              key={index}
              style={{
                width
              }}
              className={cn("flex flex-col gap-2 items-center md:px-4 md:py-3 px-1 pt-1")}
            >
              <div className="border border-border rounded-full size-full">
                <Image className="md:size-full" width={88} height={88} alt={`avatar-${index}`} src='/user.svg' />
              </div>
              <span><Heart className="size-4" /></span>
            </li>
          ))
        }
        <li
          style={{
            width
          }}
          className={cn("flex flex-col gap-2 items-center md:px-4 md:py-3 px-1 pt-1")}
        >
          <div className="p-1 rounded-full border border-border size-full" >
            <div className=" bg-zinc-100 flex justify-center items-center rounded-full">
              <Plus className="size-full text-zinc-300 stroke-1" />
            </div>
          </div>
          <span className="text-xs">Novo</span>
        </li>
      </ul>
    </div>
  )
}