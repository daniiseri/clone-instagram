import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef } from "react"

type PreviewProps = {
  previews?: Record<number, string>
  length?: number
  checked?: string
  setChecked: Dispatch<SetStateAction<string | undefined>>
}

export function Previews({
  previews,
  length,
  setChecked,
  checked
}: PreviewProps) {
  const sliderRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    function createSlides() {
      if (!previews) return

      if (sliderRef.current) {
        const ctx = sliderRef.current.getContext('2d')
        let count = 0
        if (ctx) {
          for (const [key, value] of Object.entries(previews)) {
            const image = document.createElement('img')
            image.id = `slide-${key}`
            image.width = 420
            image.height = 420
            image.src = value
            image.style.display = 'none'
            document.getElementById('images')?.appendChild(image)

            if (count === 0) {
              image.onload = () => {
                ctx.drawImage(image, 0, 0, 420, 420)
                setChecked(`slide-${key}`)
              }
            }

            count++;

          }
        }
      }
    }

    createSlides()
  }, [previews, setChecked])



  function handleChecked(e: ChangeEvent<HTMLInputElement>) {
    if (!sliderRef.current) return

    if (e.target.value !== checked) {
      setChecked(e.target.value)
      const ctx = sliderRef.current.getContext('2d')

      if (ctx) {
        const image = getImage(e.target.value)
        ctx.drawImage(image, 0, 0, 420, 420)
      }
    }
  }

  function getImage(imageId: string) {
    return document.getElementById(imageId) as CanvasImageSource
  }

  function next() {
    if (!sliderRef.current) return

    if (length && length > 1) {
      const ctx = sliderRef.current.getContext('2d')
      const position = Number(checked?.replaceAll(/\D/g, ''))

      if (position + 1 === length) {
        setChecked(`slide-${0}`)
        const image = getImage(`slide-${0}`) as HTMLImageElement
        URL.revokeObjectURL(image.src)
        ctx?.drawImage(image, 0, 0, 420, 420)
        return
      }

      setChecked(`slide-${position + 1}`)
      const image = getImage(`slide-${position + 1}`) as HTMLImageElement
      URL.revokeObjectURL(image.src)
      if (ctx) ctx.drawImage(image, 0, 0, 420, 420)
    }
  }

  function prev() {
    if (!sliderRef.current) return

    if (length && length > 1) {
      const ctx = sliderRef.current.getContext('2d')
      const position = Number(checked?.replaceAll(/\D/g, ''))

      if (position === 0) {
        setChecked(`slide-${length - 1}`)
        const image = getImage(`slide-${length - 1}`)
        ctx?.drawImage(image, 0, 0, 420, 420)
        return
      }

      setChecked(`slide-${position - 1}`)
      const image = getImage(`slide-${position - 1}`) as HTMLImageElement
      URL.revokeObjectURL(image.src)
      if (ctx) ctx.drawImage(image, 0, 0, 420, 420)
    }
  }

  if (!previews)
    return null

  return (
    <div className="relative">
      <div id="images">
      </div>

      <div className="hidden">
        {
          Object.keys(previews).map((key) => (
            <input key={key} type="radio" id={`radio-${key}`} name='slide' value={`slide-${key}`} onChange={handleChecked} />
          ))
        }
      </div>

      <canvas ref={sliderRef} width='420' height='420' className="h-full w-full cursor-pointer" />

      <div className="absolute  w-full flex justify-between px-2 top-1/2 -translate-y-1/2">
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black/65 hover:bg-black/50 cursor-pointer">
          <ChevronLeft className=" text-white" onClick={prev} />
        </div>
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black/65 hover:bg-black/50 cursor-pointer">
          <ChevronRight className=" text-white" onClick={next} />
        </div>
      </div>

      <div className="absolute w-full bottom-8 flex justify-center gap-1">
        {
          Object.keys(previews).map((key) => (
            <label
              key={key}
              htmlFor={`radio-${key}`}
              className={cn("w-2 h-2 bg-zinc-400 rounded-full scale-75 cursor-pointer",
                checked === `slide-${key}` && 'bg-blue-500'
              )}
            >
            </label>
          ))
        }
      </div>
    </div>
  )
}