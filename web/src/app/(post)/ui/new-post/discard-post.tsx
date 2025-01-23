import { Button } from "@/components/button";
import { DialodDemo } from "@/components/dialog-demo";
import { DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { MoveLeft } from "lucide-react";


type DiscardPostProps = {
  discardPost: () => void
}

export function DiscardPost({
  discardPost
}: DiscardPostProps) {
  return (
    <DialodDemo
      className="px-0 pb-2 lg:w-[25rem] h-auto"
      title="Descartar publicação?"
      trigger={<Button className="bg-transparent hover:bg-transparent p-0"><MoveLeft className="size-10 stroke-1 text-black" /></Button>}
      content={(
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 text-sm text-center">Se você sair agora, suas edições não serão salvas.</p>
          <Separator className="mt-4" />
          <Button onClick={discardPost} className="text-red-500 w-full bg-transparent hover:bg-transparent">Descartar</Button>
          <Separator />
          <DialogClose>Cancelar</DialogClose>
        </div>
      )}
    />
  )
}