import { useSession } from '@node_modules/next-auth/react'
import React from 'react'

const page = () => {
  const { data: session } = useSession();

  if (!session) reut
}

export default page
