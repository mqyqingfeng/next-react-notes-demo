import { signIn, signOut } from "auth"
import { auth } from "auth"
import Link from 'next/link'

function SignIn({
  provider,
  ...props
}) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <button {...props}>Sign In</button>
    </form>
  )
}

function SignOut(props) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button {...props}>
        Sign Out
      </button>
    </form>
  )
}

export default async function Header() {
  const session = await auth()
  return (
    <header style={{display: "flex", "justifyContent": "space-around"}}>
        <Link href="/client">Client Side Component</Link>
        {
          !session?.user ? <SignIn /> : <span style={{display: "flex", "alignItems": "center"}}>{session?.user.name}   <SignOut /></span>
        }
    </header>
  )
}