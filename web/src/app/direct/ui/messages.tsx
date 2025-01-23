import { Button } from "@/components/button";
import Image from "next/image";

export function Messages() {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <div>
          <Image width={96} height={96} alt="messager" src='/messager.webp' />
        </div>

        <div className="text-center">
          <p className="text-xl">Suas mensagens</p>
          <p className="text-sm text-zinc-500">Envie fotos e mensagens privadas para um amigo ou grupo</p>
        </div>

        <Button className="text-xs w-auto py-2">Enviar mensagem</Button>
      </div>
    </div>
  )
}