import React from 'react';
import  { cookies } from "next/headers";

const page = () => {

  
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

export default page
