'use client'

import { Button } from "@/components/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Stories() {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const slidesRef = useRef<HTMLDivElement | null>(null)
  const [slideWidth, setSlideWidth] = useState<string>()

  useEffect(() => {
    function handleResize() {
      if (sliderRef.current && slidesRef.current) {
        switch (true) {
          case document.body.offsetWidth < 320: {
            const width = sliderRef.current.offsetWidth / 3

            slidesRef.current.style.width = width * 50 + 'px'

            setSlideWidth(width + 'px')

            break;
          }
          case document.body.offsetWidth < 380: {
            const width = sliderRef.current.offsetWidth / 4

            slidesRef.current.style.width = width * 50 + 'px'

            setSlideWidth(width + 'px')

            break;
          }
          case document.body.offsetWidth < 480: {
            const width = sliderRef.current.offsetWidth / 6

            slidesRef.current.style.width = width * 50 + 'px'

            setSlideWidth(width + 'px')

            break;
          }
          case document.body.offsetWidth < 640: {
            const width = sliderRef.current.offsetWidth / 7

            slidesRef.current.style.width = width * 50 + 'px'

            setSlideWidth(width + 'px')

            break;
          }
          default: {
            const width = sliderRef.current.offsetWidth / 8

            slidesRef.current.style.width = width * 50 + 'px'

            setSlideWidth(width + 'px')
          }
        }
      }
    }

    if (sliderRef.current) {
      const resize = new ResizeObserver(handleResize)
      resize.observe(sliderRef.current)
    }

    handleResize()
  }, [])


  function next() {
  }

  function prev() {
  }

  return (
    <div className="-z-10 2xs:mb-6 relative 2xs:border-none border-b border-border">
      <div ref={sliderRef} className="relative overflow-hidden h-24 w-full">
        <div ref={slidesRef} className="absolute left-0 top-0 flex">
          {
            Array(50).fill(null).map((_, index) => (
              <div style={{ width: slideWidth }} key={index} className="px-2">
                <Image className="w-full" width={128} height={128} alt={`avatar-${index}`} src='/user.svg' />
                <p className="text-xs">username {index}</p>
              </div>
            ))
          }
        </div>
      </div>

      <Button className="hover:bg-white w-6 h-6 p-0 bg-white border border-border rounded-full absolute left-3 top-5 cursor-pointer flex justify-center items-center text-zinc-950">< ChevronLeft onClick={prev} /></Button>
      <Button className="hover:bg-white w-6 h-6 p-0 bg-white border border-border rounded-full absolute right-3 top-5 cursor-pointer flex justify-center items-center text-zinc-950"><ChevronRight onClick={next} /></Button>
    </div>
  );
}
