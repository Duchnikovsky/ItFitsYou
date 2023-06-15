import { signIn, signOut, useSession } from 'next-auth/react'
import CSS from '../styles/Auth.module.css'

export default function Auth() {
  const { data:session } = useSession()

  return (
    <>
    {(session && session.user)
      ?<div className={CSS.toAuthDiv}>
        <button className={CSS.button} onClick={() => signOut()}>Sign out</button>
      </div>
      :<div className={CSS.toAuthDiv}>
        <button className={CSS.button} onClick={() => signIn()}>Sign in</button>
      </div>
    }
    </>
  )
}
