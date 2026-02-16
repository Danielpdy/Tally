"use client"

import React, { useEffect } from 'react'
import { SessionProvider, useSession, signOut } from 'next-auth/react'

function SessionGuard({ children }) {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === "RefreshTokenError") {
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
