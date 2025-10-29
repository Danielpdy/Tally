import { cookies } from "next/headers";
import React from 'react';
import dashboardClient from "./dashboardClient";

const page = () => {

    const cookieStore = cookies();
    const session = cookieStore.get("session");
    const isloggedin = Boolean(session);

  return <dashboardClient isl oggedin={isLoggedIn} />
}

export default page

