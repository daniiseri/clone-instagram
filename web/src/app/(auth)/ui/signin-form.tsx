'use client'

import { Button } from "@/components/button";
import { FormField } from "@/components/form-field";
import { useActionState } from "react";
import { login } from "../actions/auth";
import { LoaderCircle } from "lucide-react";

export function SigninForm() {
  const [state, formAction, isPending] = useActionState(login, undefined)

  return (
    <form method="POST" action={formAction} className='space-y-2'>
      {
        state?.message && <p className="text-sm text-red-500">{state.message}</p>
      }

      <FormField
        id='email'
        name='email'
        label='Email'
        errors={state?.errors?.email}
      />

      <FormField
        id='password'
        name='password'
        label='Senha'
        type="password"
        errors={state?.errors?.password}
      />

      <Button className='flex justify-center' disabled={isPending} type="submit">
        {
          isPending
            ? <LoaderCircle className='animate-spin' />
            : 'Entrar'
        }
      </Button>
    </form>
  )
}