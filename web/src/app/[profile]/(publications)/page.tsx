import { Publication } from "./ui/publication"
import { getPosts } from "@/app/(post)/lib/dal"

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