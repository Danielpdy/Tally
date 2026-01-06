import React from 'react'
import Budgets from '@app/components/budgets/Budgets'
import { useSession } from '@node_modules/next-auth/react'
import BudgetsPreview from '@app/components/budgets/BudgetsPreview';

const page = () => {
  const { data: session } = useSession();

  if (!session) return <BudgetsPreview />
  return (
    <Budgets />
  )
}

export default page
