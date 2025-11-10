import React from 'react'
import { useState } from 'react';

const Transactions = () => {

    const [transactionsNumber, setTransactionsNumber] = useState();

    if ( transactionsNumber <= 0 ) {
        return(
            <div>
                <section>
                    <section>
                        <div>
                            <h1>Transactions</h1>
                            <p>Track and manage your finan</p>
                        </div>
                    </section>
                </section>
            </div>
        )
    }

  return (
    <div>
      
    </div>
  )
}

export default Transactions
