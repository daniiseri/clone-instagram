type FollowerStatsProps = {
  className?: string
}

export function FollowerStats({
  className
}: FollowerStatsProps) {
  return (
    <ul className={className}>
      <li className="flex justify-center items-center md:block"><span className="text-zinc-500 md:text-black block md:inline text-center"><span className="text-black font-semibold block md:inline">6</span> publicações</span></li>
      <li className="flex justify-center items-center md:block"><span className="text-zinc-500 md:text-black block md:inline text-center"><span className="text-black font-semibold block md:inline">96</span> seguidores</span></li>
      <li className="flex justify-center items-center md:block"><span className="text-zinc-500 md:text-black block md:inline text-center"><span className="text-black font-semibold block md:inline">93</span> seguindo</span></li>
    </ul>
  )
}