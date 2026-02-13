"use client"

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';


const page = () => {
    const { data: session, status } = useSession();
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (status === "loading"){
            setIsTransitioning(true);
        } else if (status === "authenticated"){
            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setIsTransitioning(false);
        }
    }, [status]);

    if (status === "loading" || isTransitioning) return <DashboardSkeleton />

    if (!session) return <DashboardPreview />

    return <Home />
}

export default page
