import { cookies } from "next/headers";
import React from 'react'

const dashboardServer = () => {

    const cookieStore = cookies();
    const session = cookieStore.get("session");
    const isLogged

  return (
    <div>
      
    </div>
  )
}

export default dashboardServer

