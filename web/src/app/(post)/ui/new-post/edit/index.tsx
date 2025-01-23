import { useState } from "react";
import { Filters } from "./filters";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Adjustments } from "./adjustments";

const tabVariants = cva(
  'w-1/2 text-center border-b p-2 cursor-pointer border-blue-950 text-blue-950 text-sm font-semibold',
  {
    variants: {
      variant: {
        active: '',
        inactive: 'opacity-50'
      }
    },
    defaultVariants: {
      variant: 'inactive'
    }
  }
)

type EditProps = {
  filter?: string
  setFilter: (filter: string) => void
}

export function Edit({
  filter,
  setFilter
}: EditProps) {
  const [tab, setTab] = useState(1)

  return (
    <div className="flex-1 h-full overflow-auto flex flex-col gap-4">
      <div className="w-full h-full flex">
        <div
          className={cn(tabVariants({
            variant: tab === 1 ? 'active' : 'inactive'
          }))}
          onClick={() => setTab(1)}
        >
          Filtros
        </div>
        <div
          className={cn(tabVariants({
            variant: tab === 2 ? 'active' : 'inactive'
          }))}
          onClick={() => setTab(2)}
        >
          Ajustes
        </div>
      </div>

      {
        tab === 1
          ? (
            <Filters setFilter={setFilter} filter={filter} />
          )
          : (
            <Adjustments />
          )
      }
    </div>
  )
}