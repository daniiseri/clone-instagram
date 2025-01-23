import { ImagePlay } from "lucide-react"
import { ChangeEvent, Dispatch, SetStateAction } from "react"

type NewPostFormProps = {
  setPreviews: Dispatch<SetStateAction<Record<number, string> | undefined>>
  setLength: Dispatch<SetStateAction<number | undefined>>
  setStep: Dispatch<1 | 2 | 3 | null | undefined>
}

export function NewPostForm({
  setPreviews,
  setLength,
  setStep,
}: NewPostFormProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    setLength(files?.length)

    if (files?.length) {
      Object.entries(files).forEach(([key, value]) => {
        const url = URL.createObjectURL(value)

        setPreviews(prevState => ({ ...prevState, [key]: url }))
      })
    }

    setStep(2)
  }

  return (
    <div className="h-full flex-1 flex flex-col gap-4 justify-center items-center">
      <input className="hidden" id='post' type="file" multiple onChange={handleChange} />

      <div >
        <ImagePlay className="size-16 stroke-1" />
      </div>

      <div className="text-xl">
        Arraste as fotos e os vídeos aqui
      </div>

      <label className="rounded-lg px-4 py-1 bg-blue-400 hover:bg-blue-500 text-white w-auto font-semibold cursor-pointer text-sm " htmlFor="post">
        Selecionar do computador
      </label>
    </div>
  )
}