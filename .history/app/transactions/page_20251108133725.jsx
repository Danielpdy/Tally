import React from 'react';

const page = () => {

  const cookieStore = cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return (
      <div>
        <section>
          <section>
              <div>
                  <div>
                      <h1>Transactions</h1>
                      <p>Track and manage your financial activity • Press N to add</p>
                  </div>
                  <button>+ Add Transaction</button>
                  <button>Export</button>
              </div>
          </section>

          <section>
              
          </section>
        </section>
      </div>
    )
  }

  return(
    <div>
      
    </div>
  )
}

export default page
