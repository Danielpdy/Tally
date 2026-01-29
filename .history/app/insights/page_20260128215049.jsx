"use client"

import Insights from '@app/components/Insights/Insights';
import InsightsPreview from '@app/components/Insights/InsightsPreview';
import { useSession } from '@node_modules/next-auth/react'
import React from 'react'

const page = () => {
  const { data: session } = useSession();

  if (!session) return <InsightsPreview />

  return <Insights />
}

export default page
