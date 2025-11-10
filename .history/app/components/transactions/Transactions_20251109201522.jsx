import React from 'react'
import { useState } from 'react';

const Transactions = () => {

    const [transactionsNumber, setTransactionsNumber] = useState();

    if ( transactionsNumber <= 0 ) {
        return(
            <div>
                sec
            </div>
        )
    }

  return (
    <div>
      
    </div>
  )
}

export default Transactions
