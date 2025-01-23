'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname()

  return (
    <main className="flex flex-col items-center justify-center gap-2 sm:p-4">
      <div className="border border-border p-4 lg:w-80 space-y-4">
        <Image
          width={180}
          height={180}
          alt="logo"
          src='/Instagram_logo.svg.png'
          className="mx-auto"
        />
        {children}
      </div>
      <div className="border border-border p-4 lg:w-80">
        {
          pathname === '/signup'
            ? (
              <p className="text-center text-sm">Tem uma conta? <Link className="text-blue-500 font-semibold" href='/login'>Conecte-se</Link></p>
            ) : (
              <p className="text-center text-sm">Não tem uma conta? <Link className="text-blue-500 font-semibold" href='/signup'>Cadastre-se</Link> </p>
            )
        }
      </div>
    </main>
  )
} 