import { cn } from "@/lib/utils";
import { AtSign } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <div className={cn(
      'fixed z-20 top-0 left-0 px-4 border-b border-border h-11 flex justify-between items-center w-full bg-white',
      'md:hidden'
    )}>
      <div>
        <Image width={24} height={24} alt="settings" src='/settings.svg' />
      </div>

      <div>
        <span>
          username
        </span>
      </div>

      <div>
        <AtSign className="size-6" />
      </div>
    </div>
  )
}