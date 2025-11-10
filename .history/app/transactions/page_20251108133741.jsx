import React from 'react';

const page = () => {

  const cookieStore = cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return (
 
    )
  }
}

export default page
