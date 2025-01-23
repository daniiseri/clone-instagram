import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

const FILTERS = [
  'Aden',
  'Clarendon',
  'Crema',
  'Gingham',
  'Juno',
  'Lark',
  'Ludwig',
  'Moon',
  'Original',
  'Perpetua',
  'Reyes',
  'Slumber'
]

type FiltersProps = {
  filter?: string
  setFilter: (filter: string) => void
}

export function Filters({
  filter,
  setFilter
}: FiltersProps) {
  const [value, setValue] = useState(0)

  return (
    <div className="flex justify-center flex-wrap gap-4 w-full h-full">
      {
        FILTERS.map((currentFilter, index) => (
          <div
            key={index}
            className='space-y-3 cursor-pointer'
            onClick={() => setFilter(currentFilter)}
          >
            <Image
              className={cn("w-20 rounded-sm",
                filter === currentFilter && 'border-2 border-blue-500'
              )}
              width={48}
              height={48}
              alt={`image-${index}`}
              src={'/image-filter.jpg'}
            />
            <p className={cn('text-center text-xs',
              filter === currentFilter && 'text-blue-500'
            )}>{currentFilter}</p>
          </div>
        ))
      }

      <div className="p-4 w-full border-t border-border flex gap-4">
        <Slider min={0} max={100} value={[value]} onValueChange={value => setValue(value[0])} />
        <span>{value}</span>
      </div>
    </div>
  )
}