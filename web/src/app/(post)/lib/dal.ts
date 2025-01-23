'use server'

import { verifySession } from "@/app/(auth)/lib/dal"
import { API_URL } from "@/lib/constants"
import { cache } from "react"

type Post = {
  url: string
}

export const getPosts = cache(async (username: string): Promise<{ posts: Post[] } | undefined> => {
  try {
    const token = await verifySession()

    const response = await fetch(`${API_URL}/users/${username}/posts`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      next: {
        tags: [`${username}-posts`]
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