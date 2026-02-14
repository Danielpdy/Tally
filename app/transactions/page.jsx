"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import TransactionsPreview from '@app/components/transactions/TransactionsPreview';
import Transactions from '@app/components/transactions/Transactions';
import TransactionsSkeleton from '@app/components/transactions/TransactionsSkeleton';

const page = () => {
    const { data: session, status } = useSession();

    if (status === "loading") return <TransactionsSkeleton />

    if (!session) return <TransactionsPreview />

    return <Transactions />
}

export default page
