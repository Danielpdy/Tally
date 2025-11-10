import React from 'react'
import { useState } from 'react';

const Transactions = () => {

    const [transactionsNumber, setTransactionsNumber] = useState();

    if ( transactionsNumber <= 0 ) {
        return(
            <div>
                s
            </div>
        )
    }

  return (
    <div>
      
    </div>
  )
}

export default Transactions
