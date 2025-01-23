import { getUser } from "../(auth)/lib/dal";
import { Inbox } from "./ui/inbox";
import { Messages } from "./ui/messages";

export default async function Direct() {
  const user = await getUser()

  return (
    <div className="flex-1 flex max-h-full">
      <Inbox user={user} />
      <Messages />
    </div>
  )
}