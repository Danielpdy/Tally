"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import Homepage from '@app/components/homepage/Homepage'
import HomepageSkeleton from '@app/components/homepage/HomepageSkeleton'

const page = () => {
    const { status } = useSession();

    if (status === "loading") return <HomepageSkeleton />

    return <Homepage />
}

export default page
