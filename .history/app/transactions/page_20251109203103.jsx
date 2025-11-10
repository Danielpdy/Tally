"use client"

import React from 'react';
import { useSession } from '@node_modules/next-auth/react';
import TransactionsPreview from '@app/components/transactions/TransactionsPreview';
import Transactions from '@app/components/transactions/Transactions';

const page = () => {

  const { data: session, status } = useSession();
  if (!session) return <TransactionsPreview />

  return <Transactions />
} 
export default page
