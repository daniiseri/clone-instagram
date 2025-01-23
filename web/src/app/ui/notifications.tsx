import { useEffect, useRef } from "react";
import { Card, Title } from "./card";

export function Notifications() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      const before = ref.current.previousSibling
      if (before && before instanceof HTMLElement) {
        const resize = new ResizeObserver(() => {
          if (ref.current)
            ref.current.style.left = before.offsetWidth + 'px'
        })

        resize.observe(before)

        ref.current.style.left = before.offsetWidth + 'px'
      }
    }
  }, [])

  return (
    <Card className="z-20" ref={ref}>
      <Title>Notificações</Title>

      <div>

      </div>
    </Card>
  )
}