"use client"

import React, { useState, useEffect } from 'react';
import { useSession } from '@node_modules/next-auth/react';
import TransactionsPreview from '@app/components/transactions/TransactionsPreview';
import Transactions from '@app/components/transactions/Transactions';
import TransactionsSkeleton from '@app/components/transactions/TransactionsSkeleton';
import Skeleton from '@app/components/Skeleton';

const page = () => {
  const { data: session, status } = useSession();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      setIsTransitioning(true);
    } else if (status === "authenticated") {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsTransitioning(false);
    }
  }, [status]);

  if (status === "loading" || isTransitioning) {
    return <TransactionsSkeleton />
  }

  if (!session) {
    return <TransactionsPreview />
  }

  return <Transactions />
} 
export default page
