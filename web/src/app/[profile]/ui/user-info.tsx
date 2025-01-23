import { cn } from "@/lib/utils"

type UserInfoProps = {
  className?: string
}

export function UserInfo({
  className
}: UserInfoProps) {
  return (
    <div className={cn("flex flex-col text-sm", className)}>
      <span className="font-semibold">Nome completo</span>
      <span>
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
        loremipsum
      </span>
    </div>
  )
}