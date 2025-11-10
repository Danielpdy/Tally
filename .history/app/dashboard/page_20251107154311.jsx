"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import DashboardPreview from '@app/components/dashboard/DashboardPreview';

const page = () => {
    const { data: session, status } = useSession();

    if (!session) return<DashboardPreview />
  return (
    <div>Nigga</div>
  )
}

export default page
