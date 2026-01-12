"use client"

import React, { useEffect, useState } from 'react'
import Budgets from '@app/components/budgets/Budgets'
import { useSession } from '@node_modules/next-auth/react'
import BudgetsPreview from '@app/components/budgets/BudgetsPreview';
import BudgetSkeleton from '@app/components/budgets/BudgetSkeleton';

const page = () => {
  const { data: session, status } = useSession();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (status === "loading"){
      setIsTransitioning(true);
    } else if (status === "authenticated"){
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 300);
      return () => clearTimeout(timer);
    } else{
      setIsTransitioning(false);
    }
  }, [status])

  if (status === "loading" || isTransitioning) return <BudgetSkeleton />
  
  if (!session) return <BudgetsPreview />

  return <Budgets />
  
}

export default page
