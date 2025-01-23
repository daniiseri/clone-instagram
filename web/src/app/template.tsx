import { ReactNode } from "react";
import { getUser } from "./(auth)/lib/dal";
import { Layout } from "./ui/layout";

export default async function Template({ children }: { children: ReactNode }) {
  const user = await getUser()

  return user ? (
    <Layout user={user}>
      {children}
    </Layout>
  ) : (
    <>{children}</>
  )
}