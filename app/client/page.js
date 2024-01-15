import { auth } from "auth"
import ClientComponent from "@/components/ClientComponent"
import { SessionProvider } from "next-auth/react"

export default async function ClientPage() {
  const session = await auth()
  if (session?.user) {
    // 选择需要的信息传给客户端，避免敏感信息泄露
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  }

  return (
    <SessionProvider session={session}>
      <ClientComponent />
    </SessionProvider>
  )
}