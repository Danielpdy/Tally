"use client"

import Insights from '@app/components/Insights/Insights';
import InsightsPreview from '@app/components/Insights/InsightsPreview';
import InsightsSkeleton from '@app/components/Insights/InsightsSkeleton';
import { useSession } from '@node_modules/next-auth/react'
import React, { useState, useEffect } from 'react'

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

  if (status === "loading" || isTransitioning) return <InsightsSkeleton />

  if (!session) return <InsightsPreview />

  return <Insights />
}

export default page
