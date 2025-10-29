import { cookies } from "next/headers";
import React from 'react'

const dashboardServer = () => {

    const cookieStore = cookies();
    const session = cookieStore.get

  return (
    <div>
      
    </div>
  )
}

export default dashboardServer

