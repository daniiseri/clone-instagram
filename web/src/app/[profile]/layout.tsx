import Image from "next/image";
import { ReactNode } from "react";
import { Tab } from "./ui/tab";
import { Footer } from "./ui/footer";
import Link from "next/link";
import { getProfile } from "./lib/dal";
import { Header } from "./ui/header";
import { FollowerStats } from "./ui/follower-stats";
import { Highlights } from "./ui/highlights";
import { UserInfo } from "./ui/user-info";

export default async function ProfileLayout({ children, params }: { children: ReactNode, params: { profile: string } }) {
  const { profile } = await params

  const user = await getProfile(profile)

  return (
    <div className="mt-16 md:mt-0 h-full flex flex-col justify-between lg:w-[60.75rem] mx-auto">
      <Header />

      <main className="md:px-5 pt-8 flex-1 flex flex-col">
        {/**/}
        <header className="flex items-center mb-2 md:mb-11 mx-4 md:mx-0">
          <div className="lg:w-72 md-lg:w-60 md:w-48 sm:w-36 mr-7">
            <Image className="rounded-full mx-auto max-w-40 w-1/2  md:w-3/4 aspect-square" width={160} height={160} alt="avatar" src={user?.profilePhotoURL || '/user.svg'} />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span>username</span>
              <div className="flex items-center 4xs:gap-2">
                <div><Link href='/accounts/edit' className="flex justify-center items-center rounded-lg px-4 md:py-1 bg-gray-200 hover:bg-gray-300 text-sm text-center text-ellipsis w-0 4xs:w-16 3xs:w-24 md:w-auto leading-4">Editar perfil</Link></div>
                <div><Link href='#' className="flex justify-center items-center rounded-lg px-4 md:py-1 bg-gray-200 hover:bg-gray-300 text-sm text-center text-ellipsis w-0 4xs:w-16 3xs:w-28 md:w-auto leading-4">Itens Arquivados</Link></div>
                <Image className="hidden md:inline" width={24} height={24} alt="settings" src='/settings.svg' />
              </div>
            </div>

            <FollowerStats className="hidden md:flex gap-8 text-sm" />

            <UserInfo className="hidden md:flex" />
          </div>
        </header>

        <UserInfo className="flex md:hidden  px-4 pb-5" />


        {/**/}
        <Highlights />

        <hr />

        <FollowerStats className="py-3 flex justify-around md:hidden" />

        <Tab profile={profile} />

        {children}
      </main>

      <Footer />
    </div>
  )
}