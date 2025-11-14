import React, { use } from 'react'
import { useState, useEffect, useRef } from 'react';
import Image from '@node_modules/next/image';
import styles from './transactions.module.css'

const Transactions = () => {

    const [transactionsNumber, setTransactionsNumber] = useState(0);
    const [sidePannelToogle, setSidePannelToggle] = useState(false);
    const [typeTransaction, setTypeTransaction] = useState();
    //const [isOpen, setIsOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [addType, setAddType] = useState();
    const [addDate, setAddDate] = useState();
    const [addCategory, setAddCategory] = useState(null);
    const [addDescription, setAddDescription] = useState(null);
    const [addAmount, setAddAmount] = useState(null);
    const [addAccount, setAddAccount] = useState(null);
    const [addStatus, setAddStatus] = useState(null);
    const [stepNumber, setStepNumber] = useState(1);
    const sidePannelRef = useRef(null);
    const dropdownMenuCategory = useRef(null);
    const dropdownMenuAccount = useRef(null);
    const dropdownMenuStatus = useRef(null);

    const SELECT_TYPE = 'SELECT_TYPE';
    const SELECT_CATEGORY = 'SELECT_CATEGORY';
    const TRANSACTIONS_DETAILS = 'TRANSACTIONS_DETAILS';
    const REVIEW_AND_CONFIRM = 'REVIEW_AND_CONFIRM';

    const categories = ["Salary", "Freelance", "Investment", "Business", "Gift", "Other"];
    const accounts = ["Cash", "Checking", "Savings", "Credit Card"];
    const status = ["Clear", "Pending"];
    const transactionReviewed = [{
        Type: addType,
        Category: addCategory,
        Date: addDate,
        Description: addDescription,
        Account: addAccount,
        Amount: addAmount,
        Status: addStatus
    }]

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

        if (!isCategoryOpen) return;

        function handlerDropdown (e) {
            if (!dropdownMenuCategory.current.contains(e.target)){
                categoryDropdown.close();
                setAddCategory(null);
            }
        }

        document.addEventListener("click", handlerDropdown);

        return () => {
            document.removeEventListener("click", handlerDropdown);
        }
    
    })

    useEffect( () => {
        if (!isAccountOpen) return;

        function handlerDropdown (e) {
            if (!dropdownMenuAccount.current.contains(e.target)) {
                accountDropdown.close();
                setAddAccount(null);
            }
        }

        document.addEventListener("click", handlerDropdown);

        return () => {
            document.removeEventListener("click", handlerDropdown);
        }
    })

    useEffect(() => {
        if (!isStatusOpen) return;

        function handlerDropdown(e) {
            if (!dropdownMenuStatus.current.contains(e.target)){
                statusDropdown.close();
                setAddStatus(null);
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
            setStepNumber(1);
        }, 1000);
    }

    const nextStepPannel = ( currentStep, type ) => {
        setTypeTransaction(type);
        setCurrentStepPannel(currentStep);
    }

    /*const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    }*/

    const handleDropdowns = (isOpen, setIsOpen) => ({
        toggle: () => setIsOpen(!isOpen),
        close: () => setIsOpen(false),
        open: () => setIsOpen(true)
    });

    const categoryDropdown = handleDropdowns(isCategoryOpen, setIsCategoryOpen);
    const accountDropdown = handleDropdowns(isAccountOpen, setIsAccountOpen);
    const statusDropdown = handleDropdowns(isStatusOpen, setIsStatusOpen);

    /*const handleCloseDropdown = () => {
        setIsOpen(false);
    }*/

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
                                    alt='plus'
                                />
                                Add Transaction</button>
                            <button>
                                <Image 
                                    src='/assets/icons/export.svg'
                                    width={20}
                                    height={20}
                                    alt='export'
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
                                alt='plus'
                            />
                            Add Your First Transaction</button>
                    </section>
                </section>
            </div>

            <aside ref={sidePannelRef} className={`${styles.aside} ${sidePannelToogle ? styles.visible : ""}`}>
                <div className={styles.asideHeader}>
                    <div className={styles.asideHeaderText}>
                        <h3>Add Transaction</h3>
                        <p>Step {stepNumber} of 4 • Press ESC to close</p>
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
                            onClick={() => {
                                nextStepPannel(steps.SELECT_CATEGORY, "Income");
                                setStepNumber(2);
                            }}
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
                            onClick={() => {
                                nextStepPannel(steps.SELECT_CATEGORY, "Expense");
                                setStepNumber(2);
                            }}
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
                            onClick={() => {
                                nextStepPannel(steps.SELECT_CATEGORY, "Transfer");
                                setStepNumber(2);
                            }}
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
                            onClick={() => {
                                nextStepPannel(steps.SELECT_CATEGORY, "Loan");
                                setStepNumber(2);
                            }}
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
                            onClick={() => {
                                nextStepPannel(steps.SELECT_CATEGORY, "Savings");
                                setStepNumber(2);
                            }}
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
                            onClick={() => {
                                nextStepPannel(steps.SELECT_CATEGORY, "Goals");
                                setStepNumber(2);
                            }}
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
                                    ref={dropdownMenuCategory}
                                    className={`${styles.dropdownButton} ${isCategoryOpen ? styles.open : ""}`}
                                    onClick={categoryDropdown.toggle}
                                >
                                    {addCategory === null ? "Choose a category" : addCategory}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6"/>
                                    </svg>
                                </button>
                                {isCategoryOpen && (
                                    <div className={styles.dropdownMenu}>
                                        {categories.map((category, index) => (
                                            <div
                                                key={index}
                                                className={styles.dropdownItem}
                                                onClick={() => {
                                                    setAddCategory(category);
                                                    categoryDropdown.close();
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
                                onClick={() => {
                                    setCurrentStepPannel(steps.SELECT_TYPE);
                                    setStepNumber(1);
                                }}
                            >Back</button>
                            <button
                                className={styles.nextButton}
                                disabled = {addCategory === null ? true : false}
                                onClick={() => {
                                    setCurrentStepPannel(steps.TRANSACTIONS_DETAILS);
                                    setStepNumber(3);
                                }}
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
                    <div className={styles.transactionDetailsContainer}>
                        <h4>Transaction Details</h4>
                        <p>Fill in the details of your transaction.</p>

                        <div className={styles.formGroup}>
                            <label htmlFor="Date" className={styles.formLabel}>Date <span className={styles.required}>*</span></label>
                            <input type="date" className={styles.formInput}
                            
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="Description" className={styles.formLabel}>Description <span className={styles.required}>*</span></label>
                            <input type="text" className={styles.formInput}
                                value={addDescription} placeholder='e.g., Weekly groceries'
                                onChange={(e) => setAddDescription(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="Account" className={styles.formLabel}>Account <span className={styles.required}>*</span></label>
                            <div className={styles.dropdownWrapper}>
                                <button
                                    ref={dropdownMenuAccount}
                                    className={`${styles.dropdownButton} ${isAccountOpen ? styles.open : ""}`}
                                    onClick={accountDropdown.toggle}
                                >
                                    {addAccount === null ? 'Choose an account' : addAccount}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6"/>
                                    </svg>
                                </button>
                                {isAccountOpen && (
                                <div className={styles.dropdownMenu}>
                                    {accounts.map((account, index) => (
                                        <div key={index}
                                            className={styles.dropdownItem}
                                            onClick={() => {
                                                setAddAccount(account);
                                                accountDropdown.close();
                                            }}
                                        >
                                            {account}
                                        </div>
                                    ))}
                                </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="Amount" className={styles.formLabel}>Amount <span className={styles.required}>*</span></label>
                            <input type="number" className={styles.formInput}
                                value={addAmount} placeholder='0.00'
                                onChange={(e) => setAddAmount(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="Notes" className={styles.formLabel}>Notes (Optional)</label>
                            <textarea className={styles.formTextarea} placeholder='Add any additional notes...'></textarea>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="Status" className={styles.formLabel}>Status <span className={styles.required}>*</span></label>
                            <div className={styles.dropdownWrapper}>
                                <button
                                    ref={dropdownMenuStatus}
                                    className={`${styles.dropdownButton} ${isStatusOpen ? styles.open : ""}`}
                                    onClick={statusDropdown.toggle}
                                >
                                    {addStatus === null ? 'Transaction status' : addStatus}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6"/>
                                    </svg>
                                </button>
                                {isStatusOpen && (
                                <div className={styles.dropdownMenu}>
                                    {status.map((selected, index) => (
                                        <div key={index}
                                            className={styles.dropdownItem}
                                            onClick={() => {
                                                setAddStatus(selected);
                                                statusDropdown.close();
                                            }}
                                        >
                                            {selected}
                                        </div>
                                    ))}
                                </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                className={styles.backButtonDetails}
                                onClick={() => {
                                    setCurrentStepPannel(steps.SELECT_CATEGORY);
                                    setStepNumber(2);
                                }}
                            >Back</button>
                            <button
                                className={styles.reviewButton}
                                disabled={!addAccount || !addAmount || !addDescription || !addStatus}
                                onClick={() => {
                                    setCurrentStepPannel(steps.REVIEW_AND_CONFIRM);
                                    setStepNumber(4);
                                }}
                            >
                                Review
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"/>
                                    <path d="m12 5 7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`${styles.asideContent} ${currentStepPannel === steps.REVIEW_AND_CONFIRM ? "" : styles.hidden}`}>
                    <div>
                        <h4>Review & Confirm</h4>
                        <p>Please review your transactions before confirming</p>
                    </div>
                    <div>

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
