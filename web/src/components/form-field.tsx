'use client'
import { cn } from '@/lib/utils'
import { CircleCheck, CircleX } from 'lucide-react'
import React, { useState } from 'react'

type FormFieldProps = {
  errors?: string[]
  label?: string
}

export const FormField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & FormFieldProps
>(({ className, errors, label, type, ...props }, ref) => {
  const [typing, setTyping] = useState(false)
  const [currentType, setCurrentType] = useState(type)

  function show() {
    setCurrentType('text')
  }

  function hidden() {
    setCurrentType('password')
  }

  return (
    <div >
      <div
        className={
          cn(
            'relative p-2 border flex items-center justify-between rounded-sm gap-2',
            errors
              ? 'border-red-500'
              : 'border-border',
            className
          )
        }
      >
        <label className={
          cn(
            'absolute text-zinc-500 transition',
            typing && 'top-0 text-xs'
          )
        } htmlFor={props.id}>{label}</label>
        <input type={currentType} className='focus:outline-none' ref={ref} onChange={e => setTyping(!!e.target.value)} {...props} />

        <div>
          {
            errors
              ? <CircleX className='text-red-500 size-5' />
              : <CircleCheck className='text-zinc-500 size-5' />
          }
        </div>

        {
          type === 'password' && typing
            ? currentType === 'password'
              ? <button type='button' className='text-sm cursor-pointer font-bold hover:text-zinc-500' onClick={show}>Mostrar</button>
              : <button type='button' className='text-sm cursor-pointer font-bold hover:text-zinc-500' onClick={hidden}>Ocultar</button>
            : null
        }
      </div>
      {
        errors && <p className='text-sm text-red-500'>{errors}</p>
      }
    </div>
  )
})

FormField.displayName = 'FormField'