import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SearchResults() {
  return (
    <div className="pt-3">
      <div className="mx-6 my-2 flex justify-between items-center">
        <span className="font-semibold">Recentes</span>
        <div className="text-blue-500 text-sm font-semibold hover:text-blue-900 cursor-pointer">
          Limpar tudo
        </div>
      </div>

      <ul className="my-2">
        <li className="hover:bg-zinc-100">
          <Link href={'#'}>
            <div className="px-6 py-2 space-x-3 flex justify-between items-center">
              <div className="w-11">
                <Image height={48} width={48} alt="" src='/user.svg' />
              </div>

              <div className="flex flex-col text-sm">
                <div>
                  <span className="font-semibold">username</span>
                </div>
                <span className="block max-w-full overflow-ellipsis overflow-hidden text-nowrap">
                  <span className="max-w-full text-zinc-500">nome completo . Seguido(a) por nome</span>
                </span>
              </div>

              <div className="p-2">
                <X className="text-zinc-500" />
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}