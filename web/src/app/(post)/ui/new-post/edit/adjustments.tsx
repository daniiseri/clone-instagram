import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react"

const ADJUSTMENTS = [
  'Brilho',
  'Contraste',
  'Esmaecer',
  'Saturação',
  'Temperatura',
  'Vinheta'
]

export function Adjustments() {
  const [values, setValues] = useState<Record<string, number>>()
  const [show, setShow] = useState<string>()

  useEffect(() => {
    setValues(ADJUSTMENTS.reduce((acc, value) => {
      return {
        ...acc,
        [value]: 0
      }
    }, {}))
  }, [setValues])

  function handleChange(key: string, value: number) {
    setValues(prevState => ({ ...prevState, [key]: value }))
  }

  function reset(key: string) {
    if (values && values?.[key] !== 0) {
      setValues({
        ...values,
        [key]: 0
      })
    }
  }

  if (!values) return null

  return (
    <div className="px-4 pb-4 space-y-3 w-full">
      {
        ADJUSTMENTS.map(adjustment => (
          <div onMouseEnter={() => setShow(adjustment)} onMouseLeave={() => setShow(undefined)} key={adjustment} className="space-y-3">
            <div className="flex justify-between">
              <label htmlFor={adjustment}>{adjustment}</label>
              {
                show === adjustment && values[adjustment] !== 0
                && (
                  <span onClick={() => reset(adjustment)} className="text-blue-500 text-sm scale-90 cursor-pointer hover:text-blue-900 font-semibold">Redefinir</span>
                )
              }
            </div>

            <div className="flex gap-8">
              <Slider value={[values[adjustment]]} onValueChange={(value) => handleChange(adjustment, value[0])} id={adjustment} defaultValue={[values[adjustment]]} max={100} step={1} min={-100} />

              <span className="text-xs">{values[adjustment]}</span>
            </div>
          </div>
        ))
      }
    </div>
  )
}