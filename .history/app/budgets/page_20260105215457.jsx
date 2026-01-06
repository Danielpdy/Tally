import React from 'react'
import Budgets from '@app/components/budgets/Budgets'
import { useSession } from '@node_modules/next-auth/react'

const page = () => {
  const { data: session } = useSession();

  if
}

export default page
