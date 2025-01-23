import { getUser } from "@/app/(auth)/lib/dal";
import { Button } from "@/components/button";
import { DialodDemo } from "@/components/dialog-demo";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProfilePhoto } from "./ui/profile-photo";

export default async function Edit() {
  const user = await getUser()

  if (!user) return null

  return (
    <div>
      <h2 className="py-3 text-black text-xl font-bold mb-4">Editar perfil</h2>

      <div className="flex justify-between items-center bg-zinc-100 p-4 rounded-3xl my-4">
        <div className="flex">
          <div>
            {
              user.profilePhotoURL
                ? (
                  <Image className="rounded-full" width={64} height={64} alt="foto de perfil" src={user.profilePhotoURL} />
                ) : (
                  <Image width={64} height={64} alt="foto de perfil" src='/user.svg' />
                )
            }
          </div>

          <div className="flex flex-col justify-center px-4">
            <p>{user.username}</p>
            <p>{user.name}</p>
          </div>
        </div>

        <div>
          <DialodDemo
            className="h-auto w-96"
            closeButton="hidden"
            content={(<ProfilePhoto profilePhotoURL={user.profilePhotoURL} />)}
            trigger={(
              <Button className="px-4 rounded-lg bg-blue-500 text-white cursor-pointer h-8 flex justify-center items-center text-center text-sm">Alterar foto</Button>
            )}
          />
        </div>
      </div>


      <div className="mb-4">
        <div className="py-4">
          <span className="text-black font-bold">Site</span>
        </div>

        <div className="space-y-2">
          <input className="w-full px-4 py-2 rounded-xl border border-border bg-zinc-100" disabled value='portfolio-nu-peach-59.vercel.app' />
          <span className="block text-xs text-zinc-500">Somente é possível editar os links no celular. Acesse o app do Instagram e edite seu perfil para alterar os sites na sua bio.</span>
        </div>
      </div>

      <div className="relative mb-4">
        <div className="py-4">
          <label htmlFor="bio" className="text-black font-bold">Bio</label>
        </div>


        <textarea className="pl-4 pt-2 pr-20 pb-2 w-full rounded-xl border border-border outline-none focus:border-black" name="bio" id="bio">
        </textarea>

        <span className="absolute bottom-3 right-4 text-xs">68 / 150</span>
      </div>

      <div className="mb-4">
        <div className="py-4">
          <span className="text-black font-bold">Gênero</span>
        </div>

        <div className="space-y-2">
          <div className="border border-border p-4 rounded-xl hover:bg-zinc-100 cursor-pointer">
            <div className="flex justify-between items-center">
              <span>Masculino</span>
              <ChevronDown className="text-zinc-300 size-5" />
            </div>
          </div>
          <div>
            <span className="text-zinc-500 text-xs">Isso não fará parte do seu perfil público.</span>
          </div>
        </div>

      </div>

      <div className="mb-4">
        <div className="py-4">
          <span className="text-black font-bold">Mostrar sugestões de contas em perfil </span>
        </div>

        <div className="border border-border rounded-xl px-4 py-2">
          <div className="py-2 flex items-center justify-between">
            <div className="flex flex-col justify-start items-stretch">
              <span>Mostrar sugestões de contas em perfil</span>
              <span className="text-xs text-zinc-500">Escolha se as pessoas podem ver sugestões de contas semelhantes no seu perfil e se sua conta pode ser sugerida em outros perfis.</span>
            </div>
            <Switch className="ml-4" />
          </div>
        </div>
      </div>

      <div className="mb-4 py-4">
        <span className="text-xs text-zinc-500">Certas informações do perfil, como seu nome, a bio e os links, são visíveis para todos. <Link className="text-blue-950 hover:underline" href='#'>Veja quais informações do perfil estão visíveis</Link></span>
      </div>

      <div className="mt-4 flex flex-col justify-start items-end">
        <Button className="w-64 h-11 text-sm bg-blue-500 hover:bg-blue-600">Enviar</Button>
      </div>
    </div>
  )
}