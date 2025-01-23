'use client'

import { User } from "@/app/(auth)/lib/dal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type SuggestionsProps = {
  user?: User
}

export function Suggestions({
  user
}: SuggestionsProps) {

  if (!user) return null

  return (
    <div className="space-y-4">
      <header className="flex items-center gap-2">
        <div>
          <Image className={cn(user.profilePhotoURL && 'rounded-full')} width={44} height={44} alt="foto de perfil" src={user.profilePhotoURL || '/user.svg'} />
        </div>

        <div className="flex-1">
          <p className="text-xs font-bold">{user.username}</p>
          <p>{user.name}</p>
        </div>

        <div>
          <Link className="text-blue-500 text-sm" href='#'>Mudar</Link>
        </div>
      </header>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-zinc-500 font-semibold">Sugestões para você</p> <p className="text-xs">Ver tudo</p>
        </div>
        <div className="space-y-2">
          {
            Array(6).fill(null).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div>
                  <Image width={48} height={48} alt="avatar" src='/user.svg' />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold">username</p>
                  <p className="text-xs text-zinc-500">Seguido(a) por</p>
                </div>

                <div>
                  <Link className="text-blue-500 text-sm" href='#'>Seguir</Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <footer className="text-zinc-300 text-xs space-y-3">
        <p>
          Sobre
          Ajuda
          Imprensa
          API
          Carreiras
          Privacidade
          Termos
          Localizações
          Idioma
          Meta Verified
        </p>
        <p>© 2024 Instagram from Meta</p>
      </footer>
    </div>
  )
}