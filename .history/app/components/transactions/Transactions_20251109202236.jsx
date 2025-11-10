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
                            <p>Track and manage your financial activity • Press N to add</p>
                        </div>
                        <div>
                            <button>Add Transaction</button>
                            <button>Export</button>
                        </div>
                    </section>

                    <section>
                        <div>
                            <p>Income: </p>
                            <span>$0.00</span>
                        </div>
                         <div>
                            <p>Expenses: </p>
                            <span>$0.00</span>
                        </div>
                         <div>
                            <p>Net: </p>
                            <span>$0.00</span>
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
