import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Image from '@node_modules/next/image';
import styles from './transactions.module.css'

const Transactions = () => {

    const [transactionsNumber, setTransactionsNumber] = useState(0);
    const [sidePannelToogle, setSidePannelToggle] = useState(false);
    const [typeTransaction, setTypeTransaction] = useState();
    const [currentStepPannel, setCurrentStepPannel] = useState();
    const sidePannelRef = useRef(null);

    useEffect( () => {
        function handler (e){
            if (!sidePannelRef.current.contains(e.target)){
               setSidePannelToggle(false);
            }
        }

        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("click", handler)
        }
    })

    const nextStepPannel = ( currentStep, type ) => {
        setTypeTransaction(type);
    }

    if ( transactionsNumber <= 0 ) {
        return(
            <>
            {sidePannelToogle && <div className={styles.overlay} onClick={() => setSidePannelToggle(false)}></div>}
            <div className={styles.mainContainer}>
                <section className={styles.titleContainer}>
                        <div>
                            <h1>Transactions</h1>
                            <p>Track and manage your financial activity • Press <kbd>N</kbd> to add</p>
                        </div>
                        <div>
                            <button
                             onClick={() => setSidePannelToggle(true)}
                            >
                                <Image 
                                    src='/assets/icons/plusWhite.svg'
                                    width={20}
                                    height={20}
                                />
                                Add Transaction</button>
                            <button>
                                <Image 
                                    src='/assets/icons/export.svg'
                                    width={20}
                                    height={20}
                                />
                                Export
                            </button>
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
                    <section className={styles.emptyMessage}>
                        <div className={styles.messageEmpty}>
                            <Image
                                src="/assets/icons/trendingUpBig.svg"
                                width={140}
                                height={140}
                                alt='trending up'
                            />
                            <h2>No transactions yet</h2>
                            <p>Start tracking your financial journey by adding your first transaction.
                            It only takes a few seconds!</p>
                        </div>
                        <button
                            onClick={() => setSidePannelToggle(true)}
                        >
                            <Image 
                                src='/assets/icons/plusWhite.svg'
                                width={20}
                                height={20}
                            />
                            Add Your First Transaction</button>
                    </section>
                </section>
            </div>

            <aside ref={sidePannelRef} className={`${styles.aside} ${sidePannelToogle ? styles.visible : ""}`}>
                <div className={styles.asideHeader}>
                    <div className={styles.asideHeaderText}>
                        <h3>Add Transaction</h3>
                        <p>Step 1 of 4 • Press ESC to close</p>
                    </div>
                    <button
                        className={styles.closeButton}
                        onClick={() => setSidePannelToggle(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"/>
                            <path d="m6 6 12 12"/>
                        </svg>
                    </button>
                </div>

                <div className={`${styles.asideContent} ${currentStepPannel = ? }`}>
                    {}
                    <h4>What type of transaction are you recording?</h4>
                    <p>Select the category that best describes this transaction.</p>

                    <div className={styles.transactionGrid}>
                        <div className={`${styles.transactionCard} ${styles.income}`}>
                            <div className={styles.transactionIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m22 7-8.5 8.5-5-5L1 18"/>
                                    <path d="M16 7h6v6"/>
                                </svg>
                            </div>
                            <span
                                onClick={() => setTypeTransaction("Income")}
                            >Income</span>
                        </div>

                        <div className={`${styles.transactionCard} ${styles.expense}`}>
                            <div className={styles.transactionIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m22 17-8.5-8.5-5 5L1 6"/>
                                    <path d="M16 17h6v-6"/>
                                </svg>
                            </div>
                            <span
                                onClick={() => setTypeTransaction("Expense")}
                            >Expense</span>
                        </div>

                        <div className={`${styles.transactionCard} ${styles.transfer}`}>
                            <div className={styles.transactionIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m17 11-5-5-5 5"/>
                                    <path d="M12 18V6"/>
                                    <path d="m7 13 5 5 5-5"/>
                                </svg>
                            </div>
                            <span
                                onClick={() => setTypeTransaction("Transfer")}
                            >Transfer</span>
                        </div>

                        <div className={`${styles.transactionCard} ${styles.loan}`}>
                            <div className={styles.transactionIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                            </div>
                            <span
                                onClick={() => setTypeTransaction("Loan")}
                            >Loan</span>
                        </div>

                        <div className={`${styles.transactionCard} ${styles.savings}`}>
                            <div className={styles.transactionIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/>
                                </svg>
                            </div>
                            <span
                                onClick={() => setTypeTransaction("Savings")}
                            >Savings</span>
                        </div>

                        <div className={`${styles.transactionCard} ${styles.goal}`}>
                            <div className={styles.transactionIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <circle cx="12" cy="12" r="6"/>
                                    <circle cx="12" cy="12" r="2"/>
                                </svg>
                            </div>
                            <span
                                onClick={() => setTypeTransaction("Goal")}
                            >Goal</span>
                        </div>
                    </div>
                </div>
            </aside>
            </>
        )
    }

  return (
    <div>
      
    </div>
  )
}

export default Transactions
