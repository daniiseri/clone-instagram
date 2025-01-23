'use client'

import { signup } from '@/app/(auth)/actions/auth'
import { Button } from '@/components/button'
import { FormField } from '@/components/form-field'
import { LoaderCircle } from 'lucide-react'
import { useActionState } from 'react'


export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, undefined)

  return (
    <form method='POST' action={formAction} className='space-y-2'>
      {
        state?.message && <p className='text-sm text-red-500'>{state.message}</p>
      }

      <FormField
        id="name"
        name="name"
        label='Nome completo'
        errors={state?.errors?.name}
      />

      <FormField
        id="username"
        name="username"
        label='Nome de usuário'
        errors={state?.errors?.username}
      />

      <FormField
        id="email"
        name="email"
        label='Email'
        errors={state?.errors?.email}
      />

      <FormField
        type='password'
        id="password"
        name="password"
        label='Senha'
        errors={state?.errors?.password}
      />

      <Button className='flex justify-center' disabled={isPending} type="submit">
        {
          isPending
            ? <LoaderCircle className='animate-spin' />
            : 'Cadastre-se'
        }
      </Button>
    </form>
  )
}