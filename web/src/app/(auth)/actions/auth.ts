'use server'

import { LoginFormSchema, LoginFormState, SignupFormSchema, SignupFormState } from '@/app/(auth)/lib/definitions'
import { API_URL } from '@/lib/constants'
import { createSession, deleteSession } from '../lib/session'
import { redirect } from 'next/navigation'

export async function signup(state: SignupFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Call the provider or db to create a user...
  const { name, username, email, password } = validatedFields.data

  try {
    const response = await fetch(`${API_URL}/signup`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        name,
        username,
        email,
        password
      })
    })

    if (!response.ok) {
      const message = await response.text()
      return {
        message
      }
    }

    const { token } = await response.json()

    await createSession(token)
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, state }
    }
  }

  redirect('/')
}

export async function login(state: LoginFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Call the provider or db to create a user...
  const { email, password } = validatedFields.data

  try {
    const response = await fetch(`${API_URL}/signin`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        email,
        password
      })
    })

    if (!response.ok) {
      const message = await response.text()
      return {
        message
      }
    }

    const { token } = await response.json()

    await createSession(token)
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, state }
    }
  }

  redirect('/')
}

export async function logout() {
  try {
    await deleteSession()
  } catch (error) {
    console.log(error)
  }

  redirect('/login')
}