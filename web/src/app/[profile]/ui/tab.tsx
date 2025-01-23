'use client'

import { cn } from "@/lib/utils";
import { Grid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TabProps = {
  profile: string
}

export function Tab({
  profile
}: TabProps) {
  const pathname = usePathname()

  return (
    <div className="flex justify-center text-sm border-t border-border gap-12">
      <Link
        className={cn("flex justify-center items-center gap-2 py-4 w-full md:w-auto",
          pathname === `/${profile}` ? 'border-t border-zinc-950 ' : 'text-zinc-600'
        )}
        href={`/${profile}`}
      >
        <Grid className="size-6 md:size-3" />
        <span className="hidden md:inline">PUBLICAÇÕES</span>
      </Link>
      <Link
        className={cn("flex justify-center items-center gap-2 py-4 w-full md:w-auto",
          pathname === `/${profile}/saved` ? 'border-t border-zinc-950 ' : 'text-zinc-600'
        )}
        href={`/${profile}/saved`}
      >
        <Image className="size-6 md:size-3" width={10} height={10} alt="salvar" src='/bookmark.svg' />
        <span className="hidden md:inline">SALVOS</span>
      </Link>
      <Link className={cn("flex justify-center items-center gap-2 py-4 w-full md:w-auto",
        pathname === `/${profile}/tagged` ? 'border-t border-zinc-950 ' : 'text-zinc-600'
      )} href={`/${profile}/tagged`}>
        <Image className="size-6 md:size-3" width={16} height={16} alt="salvar" src='/markers.png' />
        <span className="hidden md:inline">MARCADOS</span>
      </Link>
    </div>
  )
}