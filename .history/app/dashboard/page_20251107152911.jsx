import React from 'react';
import { useSession } from 'next-auth/react';
import DashboardPreview from '@app/components/dashboard/DashboardPrevi';

const page = () => {
    const { data: session, status } = useSession();

    if (!session) return <
  return (
    <div>Nigga</div>
  )
}

export default page
