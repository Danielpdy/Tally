"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import Budgets from '@app/components/budgets/Budgets';
import BudgetsPreview from '@app/components/budgets/BudgetsPreview';
import BudgetSkeleton from '@app/components/budgets/BudgetSkeleton';

const page = () => {
    const { data: session, status } = useSession();

    if (status === "loading") return <BudgetSkeleton />

    if (!session) return <BudgetsPreview />

    return <Budgets />
}

export default page
