import { cookies } from "next/headers";
import React from 'react';
import dashboard from "./page";

const dashboardServer = () => {

    const cookieStore = cookies();
    const session = cookieStore.get("session");
    const isLoggedIn = Boolean(session);

  return 
}

export default dashboardServer

