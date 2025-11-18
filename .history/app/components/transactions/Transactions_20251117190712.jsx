import React, { use } from 'react'
import { useState, useEffect, useRef } from 'react';
import Image from '@node_modules/next/image';

import styles from './transactionsPreview.module.css'
import { useClickOutside } from './hooks/useClickOutside';
import TransactionsEmptyState from './TransactionsEmptyState';
import TransactionsSidePannel from './TransactionsSidePannel';
import Link from '@node_modules/next/link';
import SevendayOverviewPreview from '../SevendayOverviewPreview';

const Transactions = () => {


    const [transactions, setTransactions] = useState(0);
    const [sidePanelOpen, setSidePanelOpen] = useState(false);
    const [globalIncome, setGlobalIncome] = useState();
    const sidePanelRef = useRef(null);

    const handleAddTransaction = (newTransaction) => {

        console.log("New transaction:", newTransaction);
        setTransactions(prev => [...prev, { ...newTransaction, id: Date.now() }]);
        setSidePanelOpen(false);
    };

    const handleClose = () => {
        setSidePanelOpen(false);
    };

    const filters = [
    { name: 'Income', icon: '/assets/icons/incomeIcon.svg', count: 1 },
    { name: 'Expense', icon: '/assets/icons/expenseIcon.svg' },
    { name: 'Transfer', icon: '/assets/icons/transferIcon.svg' },
    { name: 'Loan', icon: '/assets/icons/loanIcon.svg' },
    { name: 'Savings', icon: '/assets/icons/savingsIcon.svg' },
    { name: 'Goal', icon: '/assets/icons/goalIcon.svg' }
  ]

    return (
        <>
            {transactions.length === 0 ? (
                <TransactionsEmptyState onAddClick={() => setSidePanelOpen(true)} />
            ) : (
                <div>
                    <section>
                        <div>
                            <h2>Transactions</h2>
                            <p>Track and manage your financial activity • Press <kbd>N</kbd> to add</p>
                        </div>
                        <div>
                            <button>Add Transaction</button>
                            <button>Export</button>
                        </div>
                    </section>
                    <section>
                        <div>
                            <p>Income: </p>
                            <span>${globalIncome}</span>
                        </div>
                        <div>
                            <p></p>
                        </div>
                    </section>
                </div>
            )}

            <TransactionsSidePannel
                isOpen={sidePanelOpen}
                onClose={() => setSidePanelOpen(false)}
                onSubmit={handleAddTransaction}
            />
        </>
    );

    /*const [transactionsNumber, setTransactionsNumber] = useState(0);
    const [sidePannelToogle, setSidePannelToggle] = useState(false);
    const [typeTransaction, setTypeTransaction] = useState();
    //const [isOpen, setIsOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [addType, setAddType] = useState("");
    const [addDate, setAddDate] = useState("");
    const [addCategory, setAddCategory] = useState("");
    const [addDescription, setAddDescription] = useState("");
    const [addAmount, setAddAmount] = useState("");
    const [addAccount, setAddAccount] = useState("");
    const [addStatus, setAddStatus] = useState("");
    const [addNotes, setAddNotes] = useState("");
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

    const transaction = {
        Type: addType,
        Category: addCategory,
        Date: addDate,
        Description: addDescription,
        Account: addAccount,
        Amount: addAmount,
        Status: addStatus
    }

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
                setAddCategory("");
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
                setAddStatus("");
            }
        }

        document.addEventListener("click", handlerDropdown);

        return () => {
            document.removeEventListener("click", handlerDropdown);
        }
    })

    const closePannelBtn = () => {
        setSidePannelToggle(false);
        setAddAccount("");
        setAddAmount("");
        setAddCategory("");
        setAddDate("");
        setAddDescription("");
        setAddStatus("");
        setAddType("");
        setAddNotes("");

        setTimeout(function () {
            setCurrentStepPannel(steps.SELECT_TYPE);
            setStepNumber(1);
        }, 1000);
    }

    const nextStepPannel = ( currentStep, type ) => {
        setTypeTransaction(type);
        setCurrentStepPannel(currentStep);
    }*/

    /*const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    }*/

    /*const handleDropdowns = (isOpen, setIsOpen) => ({
        toggle: () => setIsOpen(!isOpen),
        close: () => setIsOpen(false),
        open: () => setIsOpen(true)
    });

    const categoryDropdown = handleDropdowns(isCategoryOpen, setIsCategoryOpen);
    const accountDropdown = handleDropdowns(isAccountOpen, setIsAccountOpen);
    const statusDropdown = handleDropdowns(isStatusOpen, setIsStatusOpen);
    */

    /*const handleCloseDropdown = () => {
        setIsOpen(false);
    }*/

    /*if ( transactionsNumber <= 0 ) {
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
            </div>*/

           /* return(
            <>
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
                                setAddType("Income");
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
                                setAddType("Expense");
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
                                setAddType("Transfer");
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
                                setAddType("Loan");
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
                                setAddType("Savings");
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
                                setAddType("Goal");
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
                                    {addCategory === "" ? "Choose a category" : addCategory}
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
                                disabled = {addCategory === "" ? true : false}
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
                                value={addDate}
                                onChange={(e) => setAddDate(e.target.value)}
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
                                    {addAccount === "" ? 'Choose an account' : addAccount}
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
                            <textarea className={styles.formTextarea} placeholder='Add any additional notes...'
                                value={addNotes}
                                onChange={(e) => setAddNotes(e.target.value)}
                            ></textarea>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="Status" className={styles.formLabel}>Status <span className={styles.required}>*</span></label>
                            <div className={styles.dropdownWrapper}>
                                <button
                                    ref={dropdownMenuStatus}
                                    className={`${styles.dropdownButton} ${isStatusOpen ? styles.open : ""}`}
                                    onClick={statusDropdown.toggle}
                                >
                                    {addStatus === "" ? 'Transaction status' : addStatus}
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
                                disabled={!addAccount || !addAmount || !addDescription || !addStatus || !addDate}
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
                    <div className={styles.reviewContainer}>
                        <h4>Review & Confirm</h4>
                        <p>Please review your transaction before confirming.</p>

                        <div className={styles.reviewDetailsBox}>
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Type</span>
                                <span className={styles.reviewValue}>{addType}</span>
                            </div>
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Category</span>
                                <span className={styles.reviewValue}>{addCategory}</span>
                            </div>
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Date</span>
                                <span className={styles.reviewValue}>{addDate}</span>
                            </div>
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Description</span>
                                <span className={styles.reviewValue}>{addDescription}</span>
                            </div>
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Account</span>
                                <span className={styles.reviewValue}>{addAccount}</span>
                            </div>
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Amount</span>
                                <span className={styles.reviewAmountValue}>${addAmount}</span>
                            </div>
                            {addNotes && addNotes.trim() !== "" && (
                                <div className={styles.reviewRowNotes}>
                                    <span className={styles.reviewLabel}>Notes</span>
                                    <span className={styles.reviewValue}>{addNotes}</span>
                                </div>
                            )}
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Status</span>
                                <span className={styles.reviewValue}>{addStatus}</span>
                            </div>
                        </div>

                        <div className={styles.reviewButtonGroup}>
                            <button
                                className={styles.editButton}
                                onClick={() => {
                                    setStepNumber(3);
                                    setCurrentStepPannel(steps.TRANSACTIONS_DETAILS);
                                }}
                            >
                                Edit
                            </button>
                            <button className={styles.confirmButton}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
            </>
        ) */
    
}

export default Transactions
