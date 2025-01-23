'use client'

import { Button } from "@/components/button";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { updateProfilePhotoURLAction, uploadAction } from "../actions/profile-photo-actions";
import { DialogClose } from "@/components/ui/dialog";

type ProfilePhotoProps = {
  profilePhotoURL: string | null
}
export function ProfilePhoto({
  profilePhotoURL
}: ProfilePhotoProps) {
  const inputFile = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.addEventListener('change', async () => {
      if (!input.files) return

      const [file] = input.files
      const formData = new FormData()
      const extension = file.name.split('.').pop()?.toLowerCase()
      formData.append('file', new File([file], `profile.${extension}`, { type: file.type }))
      const response = await uploadAction(formData)

      if (response && 'url' in response) {
        await updateProfilePhotoURLAction(response.url)
      }
    })
    inputFile.current = input
  }, [])

  function toLoad() {
    if (inputFile.current) {
      inputFile.current.click()
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center m-4 align-baseline">
        <div>
          {
            profilePhotoURL
              ? (
                <Image className="rounded-full" width={56} height={56} alt='foto do perfil' src={profilePhotoURL} />
              ) : (
                <Image width={56} height={56} alt='foto do perfil' src='/user.svg' />
              )
          }
        </div>

        <div className="mt-3 mb-1 flex flex-col items-stretch leading-4">
          <span className="text-xl">Foto do perfil sincronizada</span>
        </div>

        <span className="text-sm text-zinc-500 inline-block leading-3">Instagram, Facebook</span>
      </div>

      <div className="mt-4">
        <Button onClick={toLoad} className="text-blue-500 font-bold" variant='secondary'>Carregar foto</Button>
        <Button variant='secondary'>Gerenciar configurações de sincronização</Button>
        <Button className="text-red-500 font-bold" variant='secondary'>Remover foto atual</Button>
        <DialogClose asChild><Button variant='secondary'>Cancelar</Button></DialogClose>
      </div>
    </div>
  )
}