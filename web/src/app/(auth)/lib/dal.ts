'use server'

import { API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { cache } from "react";

export const verifySession = cache(async () => {
  const token = (await cookies()).get('session')?.value

  return { token }
})

export type User = {
  name: string
  username: string
  email: string
  profilePhotoURL: string | null
}

export const getUser = cache(async (): Promise<User | undefined> => {
  const { token } = await verifySession()

  if (!token) return undefined

  const response = await fetch(`${API_URL}/users`, {
    headers: new Headers({
      'Authorization': `Bearer ${token}`
    }),
    method: 'get',
    next: {
      tags: ['user']
    }
  })

  const data = await response.json()

  return data
})