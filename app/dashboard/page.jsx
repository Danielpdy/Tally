"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import DashboardPreview from '@app/components/dashboard/DashboardPreview';
import Dashboard from '@app/components/dashboard/Dashboard';

const page = () => {
    const { data: session } = useSession();

    if (!session) return <DashboardPreview />

    return <Dashboard />
}

export default page
