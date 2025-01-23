import { cn } from "@/lib/utils";
import { Posts } from "./ui/posts";
import { Stories } from "./ui/stories";
import { Suggestions } from "./ui/suggestions";
import { getUser } from "../(auth)/lib/dal";
import { Header } from "./ui/header";

export default async function Home() {
  const user = await getUser()

  return (
    <>
      <Header />
      <div className="mt-16 md:mt-0 w-full flex justify-center items-stretch">
        <div className={cn(
          "max-w-7xl",
          "flex-1 flex justify-center items-stretch",
        )}>
          <div className={cn("mt-4 w-full sm:w-[632px]")}>
            <Stories />
            <div className="xs:px-20 2xs:px-10 px-0">
              <Posts />
            </div>
          </div>

          <div className={cn(
            'hidden',
            'mt-9',
            "lg:block lg:w-80 lg:pl-16"
          )}>
            <Suggestions user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
