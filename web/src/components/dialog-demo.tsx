import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { cn } from "@/lib/utils";

type DialodDemoProps = {
  trigger: ReactNode
  title?: string
  content: ReactNode
  className?: string
  onClose?: () => void
  closeButton?: 'default' | 'hidden'
}
export function DialodDemo({
  trigger,
  content,
  title,
  className,
  onClose,
  closeButton,
}: DialodDemoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent
        closed={!content}
        closeButton={closeButton}
        onClose={onClose}
        className={cn('flex flex-col p-0 h-full gap-0',
          className,
        )}>
        <DialogHeader>
          <DialogTitle className={cn("text-center font-normal",
            title && "p-3"
          )}>
            {title}
          </DialogTitle>
        </DialogHeader>

        {content}

      </DialogContent>
    </Dialog>
  )
}