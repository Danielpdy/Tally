import React from 'react';
import { useSession } from 'next-auth/react';

const page = () => {
    const { data: session, status } = useSession();

    if (!session) return
  return (
    <div>Nigga</div>
  )
}

export default page
