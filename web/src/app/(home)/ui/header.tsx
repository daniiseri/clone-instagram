import { SearchInput } from "@/app/ui/search/ui/input";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <div className={cn(
      'z-10 fixed top-0 px-4 border-b border-border h-16 flex justify-between items-center w-full bg-white',
      'md:hidden'
    )}>
      <div className="w-1/2 md:flex-1 md:px-3 md:pt-6 md:pb-4 md:mb-7 md:mt-3">
        <Image className="w-auto" priority height={112} width={112} alt='logo' src='/Instagram_logo.svg.png' />
      </div>
      <div className="w-1/2 flex items-center gap-5">
        <SearchInput className="flex-1" />
        <Heart />
      </div>
    </div>
  )
}