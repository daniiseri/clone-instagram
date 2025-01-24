import { useCallback, useEffect, useMemo, useState } from "react";
import { NewPostForm } from "./new-post-form";
import { Previews } from "./previews";
import { Edit } from "./edit";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { DialodDemo } from "@/components/dialog-demo";
import { Button } from "@/components/button";
import Image from "next/image";
import { DiscardPost } from "./discard-post";
import { MoveLeft } from "lucide-react";
import { uploadAction } from "@/app/accounts/edit/actions/profile-photo-actions";
import mime from 'mime-types'
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";

const newPostVariants = cva(
  'h-[28.75rem] overflow-hidden max-w-none border-none',
  {
    variants: {
      step: {
        1: 'w-[26.25rem]',
        2: 'w-[26.25rem]',
        3: 'w-[47.25rem]'
      }
    },
    defaultVariants: {
      step: 1
    }
  }
)

const titleVariants = {
  1: 'Cria nova publicação',
  2: 'Cortar',
  3: 'Editar',
}


export function NewPost({ mode }: { mode?: 'expanded' | 'compact' | 'collapsed' | null }) {

  const [previews, setPreviews] = useState<Record<number, string>>()
  const [filters, setFilters] = useState<Record<number, string | undefined>>()
  const [length, setLength] = useState<number>()
  const [step, setStep] = useState<VariantProps<typeof newPostVariants>['step']>(1)
  const [checked, setChecked] = useState<string>()

  const router = useRouter()

  useEffect(() => {
    if (!previews) return

    setFilters(Object.keys(previews).reduce((acc, key) => {
      return {
        ...acc,
        [key]: undefined
      }
    }, {}))

    return () => {
      setFilters(undefined)
    }

  }, [previews])

  function discardPost() {
    setPreviews(undefined)
    setLength(undefined)
    setStep(1)
  }

  const setFilter = useCallback((filter: string) => {
    if (!filters || !checked) return

    const key = Number(checked?.replaceAll(/\D/g, ''))

    setFilters({
      ...filters,
      [key]: filter
    })
  }, [filters, checked])

  const filter = useMemo(() => {
    if (!filters) return

    const key = Number(checked?.replaceAll(/\D/g, ''))
    return filters[key]
  }, [checked, filters])

  const onClose = useCallback(function () {
    setPreviews(undefined)
    setLength(undefined)
    setStep(undefined)
  }, [])

  const files = useCallback(async () => {
    if (!previews) return

    for (const preview of Object.values(previews)) {

      const response = await fetch(preview)

      const blob = await response.blob()

      const [_, fileName] = preview.split(process.env.NODE_ENV === 'development' ? 'localhost:3000/' : window.location.hostname + '/')

      const file = new File([blob], fileName + '.' + mime.extension(blob.type), { type: blob.type })

      const formData = new FormData()
      formData.append('file', file)
      await uploadAction(formData)

      router.refresh()

      onClose()
    }

  }, [previews, router, onClose])



  const header = useMemo(() => {
    switch (step) {
      case 1: {
        break;
      }
      case 2: {
        return (
          <div className="absolute left-0 top-1 px-3 font-semibold text-sm flex items-center justify-between w-full">
            <DiscardPost discardPost={discardPost} />
            <div
              className="text-blue-500 hover:text-blue-900 cursor-pointer"
              onClick={() => setStep(3)}
            >
              Avançar
            </div>
          </div>
        )
      }
      case 3: {
        return (
          <div className="absolute left-0 top-1 px-3 font-semibold text-sm flex items-center justify-between w-full">
            <div>
              <MoveLeft className="size-10 stroke-1 text-black cursor-pointer" onClick={() => setStep(2)} />
            </div>
            <DialogClose
              asChild
            >
              <div className="text-blue-500 hover:text-blue-900 cursor-pointer"
                onClick={files}>
                Avançar
              </div>
            </DialogClose>
          </div>
        )
      }
      default:
    }
  }, [step, files])

  return (
    <DialodDemo
      closeButton="hidden"
      onClose={onClose}
      className={cn(newPostVariants({
        step
      }))}
      title={titleVariants[step || 1]}
      trigger={<Button
        onClick={() => setStep(1)}
        variant='ghost'
        className={cn("flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-100 cursor-pointer w-full",
          mode === 'compact' && 'justify-center'
        )}
      >
        <Image width={24} height={24} alt='nova publicação' src='/add.svg' />
        {
          mode === 'expanded' && (
            <span>Criar</span>
          )
        }
      </Button>}
      content={step ? (
        <div className="w-full h-[26.25rem] flex flex-wrap">
          {header}
          {
            step === 1
              ? (
                <NewPostForm setStep={setStep} setLength={setLength} setPreviews={setPreviews} />
              ) : (
                <Previews setChecked={setChecked} checked={checked} previews={previews} length={length} />
              )
          }

          {
            step === 3 && (
              <Edit setFilter={setFilter} filter={filter} />
            )
          }
        </div>
      ) : null}
    />
  )
}