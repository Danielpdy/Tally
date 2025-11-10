import React from 'react'
import { useState } from 'react';

const Transactions = () => {

    const [transactionsNumber, setTransactionsNumber] = useState();

    if ( transactionsNumber <= 0 ) {
        return(
            <div>
                <section>
                    <section>
                        <h1>Transactions</h1>
                        
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
