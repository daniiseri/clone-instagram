import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";

type SearchInputProps = {
  className?: string
}

export function SearchInput({ className }: SearchInputProps) {
  return (
    <div className={cn('relative',
      className
    )}>
      <input placeholder="Pesquisar" className="w-full h-9 md:h-10 px-4 py-1 bg-zinc-100 outline-none rounded-lg" type="text" />
      <div>
        <CircleX className="size-5 fill-zinc-400/50 stroke-zinc-100 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
      </div>
    </div>
  )
}