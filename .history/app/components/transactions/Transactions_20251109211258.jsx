import React from 'react'
import { useState } from 'react';
import Image from '@node_modules/next/image';
import styles from './transactions.module.css'

const Transactions = () => {

    const [transactionsNumber, setTransactionsNumber] = useState(0);

    if ( transactionsNumber <= 0 ) {
        return(
            <div className={styles.mainContainer}>
                <section className={styles.titleContainer}>
                        <div>
                            <h1>Transactions</h1>
                            <p>Track and manage your financial activity • Press N to add</p>
                        </div>
                        <div>
                            <button>Add Transaction</button>
                            <button>Export</button>
                        </div>
                </section>
                <section className={styles.emptyStats}>
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
                <section className={styles.emptyTransMessage}>
                    <section className=''>
                        <div>
                            <Image 
                                src="/assets/icons/trendingUpBig.svg"
                                width={140}
                                height={140}
                                alt='trending up'
                            />
                            <p>No transactions yet</p>
                            <p>Start tracking your financial journey by adding your first transaction. 
                            It only takes a few seconds!</p>
                        </div>
                        <button> + Add Your First Transaction</button>
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
