import { API_URL } from "@/lib/constants"
import { Publication } from "./ui/publication"
import { getPosts } from "@/app/(post)/lib/dal"

export async function generateStaticParams() {
  try {

    const response = await fetch(`${API_URL}/paths`)

    const { paths } = await response.json() as { paths: string[] }

    return paths.map((path) => ({
      params: path
    }))
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }

    return []
  }
}

export default async function Publications({ params }: { params: Promise<{ profile: string }> }) {
  const { profile } = await params

  const data = await getPosts(profile)

  return (
    <div className="grid grid-cols-3 gap-1">
      {
        data?.posts.map(({ url }) => (
          <Publication url={url} key={url} />
        ))
      }
    </div>
  )
}