import { cookies } from "next/headers";
import React from 'react';
import dashboardClient from "./dashboardClient";

const dashboardServer = () => {

    const cookieStore = cookies();
    const session = cookieStore.get("session");
    const isLoggedIn = Boolean(session);

  return <dashboardClient isLoggedIn={isLoggedIn/>}
}

export default dashboardServer

