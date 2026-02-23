"use client"

import React, { useEffect, useRef } from 'react'
import { SessionProvider, useSession, signOut } from 'next-auth/react'

function SessionGuard({ children }) {
  const { data: session } = useSession()
  const signingOut = useRef(false)

  useEffect(() => {
    if (signingOut.current) return

    if (session?.error === "AccountDeactivated") {
      signingOut.current = true
      signOut({ callbackUrl: "/LoginSignup?error=deactivated" })
    } else if (session?.error === "RefreshTokenError") {
      signingOut.current = true
      signOut()
    }
  }, [session])

  return children
}

const Provider = ( { children, session } ) => {
  return (
    <SessionProvider session={session}>
      <SessionGuard>
        {children}
      </SessionGuard>
    </SessionProvider>
  )
}

export default Provider
