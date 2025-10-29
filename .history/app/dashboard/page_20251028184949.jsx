import { cookies } from "next/headers";
import React from 'react';
import D ashboardClient from "./DashboardClient";

const page = () => {

    const cookieStore = cookies();
    const session = cookieStore.get("session");
    const isLoggedIn = Boolean(session);

  return <DashboardClient isLoggedIn={isLoggedIn} />
}

export default page

