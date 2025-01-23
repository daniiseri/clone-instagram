'use client'

import { Ellipsis, Heart, MessageCircle, Volume2, VolumeOff } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import ReactPlayer from 'react-player';

export function Posts() {
  const ref = useRef<ReactPlayer>(null)
  const [muted, setMuted] = useState(0)

  const volumeIcon = useMemo(() => {
    return muted === 0
      ? <VolumeOff className="size-4" onClick={() => setMuted(1)} />
      : <Volume2 className="size-4" onClick={() => setMuted(0)} />
  }, [muted])

  return (
    <div className="h-full 2xs:space-y-3">
      <header className="flex items-center gap-2 2xs:px-0 px-4 2xs:py-0 py-3">
        <div>
          <Image width={32} height={32} alt="avatar" src='/user.svg' />
        </div>
        <div className="text-xs flex-1">
          <p><span className="font-bold">username</span><span className="text-zinc-500">. 1d</span></p>
          <p>música . Áudio original</p>
        </div>
        <div>
          <Ellipsis />
        </div>
      </header>

      <div className="relative border border-border lg:min-h-[75%] rounded-[2px]">
        <ReactPlayer
          ref={ref}
          width={'100%'}
          volume={muted}
          url='https://www.youtube.com/embed/ihgWUo6tvJQ'
          controls={false}
          playing={true}
        />
        <div className="cursor-pointer absolute bottom-4 right-4 p-2 rounded-full bg-zinc-800 text-white">{volumeIcon}</div>
      </div>

      <footer className="2xs:space-y-3 2xs:px-0 px-4">
        <div className="flex justify-between">
          <div className="flex gap-2 py-2">
            <div>
              <Heart />
            </div>
            <div>
              <MessageCircle />
            </div>
            <div>
              <Image width={28} height={28} alt="comentar" src='/share.svg' />
            </div>
          </div>

          <div className="py-2">
            <Image className="w-4 h-auto" width={18} height={18} alt="salvar" src='/bookmark.svg' />
          </div>
        </div>

        <div>
          <p className="text-sm">Curtido por <span className="font-bold">username</span> e <span className="font-bold">outras pessoas</span></p>
        </div>

        <div>
          <p className="text-xs">Ver tradução</p>
        </div>

        <div>
          <input className="focus:outline-none text-sm" type="text" placeholder="Adicione um comentário..." />
        </div>
      </footer>
    </div>
  )
}