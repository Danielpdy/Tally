"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import Insights from '@app/components/Insights/Insights';
import InsightsPreview from '@app/components/Insights/InsightsPreview';
import InsightsSkeleton from '@app/components/Insights/InsightsSkeleton';

const page = () => {
    const { data: session, status } = useSession();

    if (status === "loading") return <InsightsSkeleton />

    if (!session) return <InsightsPreview />

    return <Insights />
}

export default page
