import React from 'react';
import { useSession } from '@node_modules/next-auth/react';
import TransactionsPreview from '@app/components/transactions/TransactionsPreview';

const page = () => {

  const { data: session, status } = useSession();
  if (!session) return <TransactionsPreview />

  return <p>Nigga still in dev stage. Be patien</p>
} 
export default page
