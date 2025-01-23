'use server'

import { API_URL } from "@/lib/constants";
import { UploadSchema } from "../lib/definitions";
import { verifySession } from "@/app/(auth)/lib/dal";
import { revalidateTag } from "next/cache";

export async function updateProfilePhotoURLAction(profilePhotoURL: string) {
  try {
    const { token } = await verifySession()

    const response = await fetch(`${API_URL}/profile-photo`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        profilePhotoURL
      }),
    })

    if (response.ok) {
      revalidateTag('user')
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error })
    }
  }
}

export async function uploadAction(data: FormData) {
  const validatedFields = UploadSchema.safeParse({
    file: data.get('file')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const { token } = await verifySession()

    const response = await fetch(`${API_URL}/uploads`, {
      method: 'post',
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data: { url: string } = await response.json()
      return data
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error })
    }
  }
}