'use server'

import { verifySession } from "@/app/(auth)/lib/dal"
import { API_URL } from "@/lib/constants"
import { cache } from "react"

type Profile = {
  username: string
  name: string | null
  profilePhotoURL: string | null
}

export const getProfile = cache(async (username: string): Promise<Profile | undefined> => {
  try {
    const token = await verifySession()

    const response = await fetch(`${API_URL}/users/${username}`, {
      method: 'GET',
      headers: {
        'Acept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      next: {
        tags: [`${username}-profile`]
      }
    })

    if (response.ok) {
      const data = await response.json()
      return data
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }
  }
})