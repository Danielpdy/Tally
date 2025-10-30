import { cookies } from "next/headers";
import React from 'react';
import DashboardClient from "./DashboardClient";

export default async function Page() {

  const cookieStore = await cookies();     
  const sessionCookie = cookieStore.get('session');   
  const isLoggedIn = Boolean(sessionCookie?.value);

  return <DashboardClient isLoggedIn={isLoggedIn} />;
}


