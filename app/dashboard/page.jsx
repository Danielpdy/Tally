"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import DashboardPreview from '@app/components/dashboard/DashboardPreview';
import Dashboard from '@app/components/dashboard/Dashboard';
import DashboardSkeleton from '@app/components/dashboard/DashboardSkeleton';

const page = () => {
    const { data: session, status } = useSession();

    if (status === "loading") return <DashboardSkeleton />

    if (!session) return <DashboardPreview />

    return <Dashboard />
}

export default page
