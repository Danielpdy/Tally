import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Image from '@node_modules/next/image';
import styles from './transactions.module.css'

const Transactions = () => {

    const [transactionsNumber, setTransactionsNumber] = useState(0);
    const [sidePannelToogle, setSidePannelToggle] = useState(false);
    const [typeTransaction, setTypeTransaction] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [addCategory, setAddCategory] = useState(null);
    const [addAccount, setAddAccount] = useState(null);
    const sidePannelRef = useRef(null);
    const dropdownMenu = useRef(null);

    const SELECT_TYPE = 'SELECT_TYPE';
    const SELECT_CATEGORY = 'SELECT_CATEGORY';
    const TRANSACTIONS_DETAILS = 'TRANSACTIONS_DETAILS';
    const REVIEW_AND_CONFIRM = 'REVIEW_AND_CONFIRM';

    const categories = ["Salary", "Freelance", "Investment", "Business", "Gift", "Other"];
    const accounts = ["Cash", "Checking", "Savings", "Credit Card"];
    const status = ["Clear", "Pending"];

    const steps = {
        SELECT_TYPE,
        SELECT_CATEGORY,
        TRANSACTIONS_DETAILS,
        REVIEW_AND_CONFIRM
    };


    const [currentStepPannel, setCurrentStepPannel] = useState(steps.SELECT_TYPE);

    useEffect( () => {
        function handler (e){
            if (!sidePannelRef.current.contains(e.target)){
                closePannelBtn();
            }
        }

        document.addEventListener("click", handler);

        return () => {
            document.removeEventListener("click", handler)
        }
    });

    useEffect( () => {

        if (!isOpen) return;

        function handlerDropdown (e) {
            if (!dropdownMenu.current.contains(e.target)){
                handleToggleDropdown();
                setAddAccount(null);
                setAddCategory(null);
            }
        }

        document.addEventListener("click", handlerDropdown);

        return () => {
            document.removeEventListener("click", handlerDropdown);
        }
    
    })

    const closePannelBtn = () => {
        setSidePannelToggle(false);
        setAddCategory(null);

        setTimeout(function () {
            setCurrentStepPannel(steps.SELECT_TYPE);
        }, 1000);
    }

    const nextStepPannel = ( currentStep, type ) => {
        setTypeTransaction(type);
        setCurrentStepPannel(currentStep);
    }

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleDropdowns = (isOpen, setIsOpen) => {
        toggle:() => setIsOpen(!isOpen),
        close:() => setIsOpen(false),
        open: () => setIsOpen()


    }

    const handleCloseDropdown = () => {
        setIsOpen(false);
    }

    if ( transactionsNumber <= 0 ) {
        return(
            <>
            {sidePannelToogle && <div className={styles.overlay}></div>}
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
                        onClick={() => closePannelBtn()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"/>
                            <path d="m6 6 12 12"/>
                        </svg>
                    </button>
                </div>

                <div className={`${styles.asideContent} ${currentStepPannel === steps.SELECT_TYPE ? "" : styles.hidden }`}>
                    
                    <h4>What type of transaction are you recording?</h4>
                    <p>Select the category that best describes this transaction.</p>

                    <div className={styles.transactionGrid}>
                        <div
                            className={`${styles.transactionCard} ${styles.income}`}
                            onClick={() => nextStepPannel(steps.SELECT_CATEGORY, "Income")}
                        >
                            <div className={styles.transactionIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m22 7-8.5 8.5-5-5L1 18"/>
                                    <path d="M16 7h6v6"/>
                                </svg>
                            </div>
                            <span>Income</span>
                        </div>

                        <div
                            className={`${styles.transactionCard} ${styles.expense}`}
                            onClick={() => nextStepPannel(steps.SELECT_CATEGORY, "Expense")}
                        >
                            <div className={styles.transactionIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m22 17-8.5-8.5-5 5L1 6"/>
                                    <path d="M16 17h6v-6"/>
                                </svg>
                            </div>
                            <span>Expense</span>
                        </div>

                        <div
                            className={`${styles.transactionCard} ${styles.transfer}`}
                            onClick={() => nextStepPannel(steps.SELECT_CATEGORY, "Transfer")}
                        >
                            <div className={styles.transactionIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m17 11-5-5-5 5"/>
                                    <path d="M12 18V6"/>
                                    <path d="m7 13 5 5 5-5"/>
                                </svg>
                            </div>
                            <span>Transfer</span>
                        </div>

                        <div
                            className={`${styles.transactionCard} ${styles.loan}`}
                            onClick={() => nextStepPannel(steps.SELECT_CATEGORY, "Loan")}
                        >
                            <div className={styles.transactionIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                            </div>
                            <span>Loan</span>
                        </div>

                        <div
                            className={`${styles.transactionCard} ${styles.savings}`}
                            onClick={() => nextStepPannel(steps.SELECT_CATEGORY, "Savings")}
                        >
                            <div className={styles.transactionIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/>
                                </svg>
                            </div>
                            <span>Savings</span>
                        </div>

                        <div
                            className={`${styles.transactionCard} ${styles.goal}`}
                            onClick={() => nextStepPannel(steps.SELECT_CATEGORY, "Goals")}
                        >
                            <div className={styles.transactionIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <circle cx="12" cy="12" r="6"/>
                                    <circle cx="12" cy="12" r="2"/>
                                </svg>
                            </div>
                            <span>Goal</span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.asideContent} ${currentStepPannel === steps.SELECT_CATEGORY ? "" : styles.hidden}`}>
                    <div className={styles.selectCategoryContainer}>
                        <h4>Select Category</h4>
                        <p>Choose the specific category for this income.</p>
                        <div className={styles.categoryFormGroup}>
                            <label htmlFor="Category" className={styles.categoryLabel}>
                                Category
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 16v-4"/>
                                    <path d="M12 8h.01"/>
                                </svg>
                            </label>
                            <div className={styles.dropdownWrapper}>
                                <button
                                    ref={dropdownMenu}
                                    className={`${styles.dropdownButton} ${isOpen ? styles.open : ""}`}
                                    onClick={handleToggleDropdown}
                                >
                                    {addCategory === null ? "Choose a category" : addCategory}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6"/>
                                    </svg>
                                </button>
                                {isOpen && (
                                    <div className={styles.dropdownMenu}>
                                        {categories.map((category, index) => (
                                            <div
                                                key={index}
                                                className={styles.dropdownItem}
                                                onClick={() => {
                                                    setAddCategory(category);
                                                    handleCloseDropdown();
                                                }}
                                            >
                                                {category}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.buttonGroup}>
                            <button
                                className={styles.backButton}
                                onClick={() => setCurrentStepPannel(steps.SELECT_TYPE)}
                            >Back</button>
                            <button
                                className={styles.nextButton}
                                disabled = {addCategory === null ? true : false}
                                onClick={() => setCurrentStepPannel(steps.TRANSACTIONS_DETAILS)}
                            >
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"/>
                                    <path d="m12 5 7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`${styles.asideContent} ${currentStepPannel === steps.TRANSACTIONS_DETAILS ? "" : styles.hidden}`}>
                    <div>
                        <p>Transacions Details</p>
                        <p>Fill in the details of your transaction.</p>
                    </div>

                    <div>
                        <label htmlFor="Date">Date</label>
                        <input type="date" placeholder={Date.now()}/>
                    </div>

                    <div>
                        <label htmlFor="Description">Description</label>
                        <input type="text" placeholder='e.g Weekly groceries'/>
                    </div>

                    <div>
                        <label htmlFor="Account">Account</label>
                        <div>
                            <button
                                onClick={handleToggleDropdown}
                            >
                                {addAccount === null ? 'Choose an account' : addAccount}
                            </button>
                            {isOpen && (
                            <div>
                                {accounts.map((account, index) => (
                                    <div key={index}
                                        onClick={() => {
                                            setAddAccount(account);
                                            handleCloseDropdown();
                                        }}
                                    >
                                        {account}
                                    </div>
                                ))}
                            </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="Amount">Amount</label>
                        <input type="number" placeholder='0.00'/>
                    </div>

                    <div>
                        <label htmlFor="Notes">Notes (Optional)</label>
                        <input type="text" placeholder='Add any aditional notes...'/>
                    </div>

                    <div>
                        <label htmlFor="Account">Status</label>
                        <div>
                            <button
                                onClick={handleToggleDropdown}
                            >
                                {addAccount === null ? 'Choose an account' : addAccount}
                            </button>
                            {isOpen && (
                            <div>
                                {status.map((selected, index) => (
                                    <div key={index}
                                        onClick={() => {
                                            setAddAccount(account);
                                            handleCloseDropdown();
                                        }}
                                    >
                                        {selected}
                                    </div>
                                ))}
                            </div>
                            )}
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
