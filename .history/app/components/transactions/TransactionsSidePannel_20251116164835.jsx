import React, { useState, useRef, useEffect } from 'react';
import { useClickOutside } from './hooks/useClickOutside';
import { useDropdown } from './hooks/useDropdown';
import Image from 'next/image';
import styles from './transactions.module.css';


const TransactionsSidePannel = ({ isOpen, onClose, onSubmit }) => {
    const [stepNumber, setStepNumber] = useState(1);
    const sidePanelRef = useRef(null);

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

    const [formData, setFormData] = useState({
        type: "",
        category: "",
        date: "",
        description: "",
        account: "",
        amount: "",
        status: "",
        notes: ""
    });
    

    const categoryDropdown = useDropdown(() => setFormData(prev => ({ ...prev, category: "" })));
    const accountDropdown = useDropdown(() => setFormData(prev => ({ ...prev, account: "" })));
    const statusDropdown = useDropdown(() => setFormData(prev => ({ ...prev, status: "" })));

    useClickOutside(sidePanelRef, onClose)

    const handleClose = () => {
        setFormData({
        type: "",
        category: "",
        date: "",
        description: "",
        account: "",
        amount: "",
        status: "",
        notes: ""
        });
        setTimeout(() => {
            setCurrentStep(steps.SELECT_CATEGORY)
            setStepNumber(1);
        }, 1000);
        onClose();
    };

    const updateField = (field, value) => {
        setFormData(prev => ({...prev, [field]: value }))
    }

    const handleSelectType = (type) => {
        updateField('type', type);
        setCurrentStep(steps.SELECT_CATEGORY);
        setStepNumber(2);
    };

    const handleConfirm = () => {
        onSubmit(formData);
        handleClose();
    };


     return(
            <>
            {isOpen && <div className={styles.overlay}></div>}
            <aside ref={sidePanelRef} className={`${styles.aside} ${isOpen ? styles.visible : ""}`}>
                <div className={styles.asideHeader}>
                    <div className={styles.asideHeaderText}>
                        <h3>Add Transaction</h3>
                        <p>Step {stepNumber} of 4 • Press ESC to close</p>
                    </div>
                    <button
                        className={styles.closeButton}
                        onClick={handleClose}
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
                            onClick={() => handleSelectType("Income")}
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
                            onClick={() => handleSelectType("Expense")}
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
                            onClick={() => handleSelectType("Transfer")}
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
                            onClick={() => handleSelectType("Loan")}
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
                            onClick={() => handleSelectType("Savings")}
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
                            onClick={() => handleSelectType("Goal")}
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
                                                    updateField('category', category)
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
                                value={formData.date}
                                onChange={(e) => updateField('date', e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="Description" className={styles.formLabel}>Description <span className={styles.required}>*</span></label>
                            <input type="text" className={styles.formInput}
                                value={formData.description} placeholder='e.g., Weekly groceries'
                                onChange={(e) => setAddDescription('descripction', e.target.value)}
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
                                    {formData.account === "" ? 'Choose an account' : formData.account}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6"/>
                                    </svg>
                                </button>
                                {accountDropdown.isOpen && (
                                <div className={styles.dropdownMenu}>
                                    {accounts.map((account, index) => (
                                        <div key={index}
                                            className={styles.dropdownItem}
                                            onClick={() => {
                                                updateField('account', account);
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
                                value={formData.amount} placeholder='0.00'
                                onChange={(e) => updateField('amount', e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="Notes" className={styles.formLabel}>Notes (Optional)</label>
                            <textarea className={styles.formTextarea} placeholder='Add any additional notes...'
                                value={formData.notes}
                                onChange={(e) => updateField('notes', e.target.value)}
                            ></textarea>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="Status" className={styles.formLabel}>Status <span className={styles.required}>*</span></label>
                            <div className={styles.dropdownWrapper}>
                                <button
                                    ref={statusDropdown.dropdownRef}
                                    className={`${styles.dropdownButton} ${statusDropdown.isOpen ? styles.open : ""}`}
                                    onClick={statusDropdown.toggle}
                                >
                                    {formData.status === "" ? 'Transaction status' : formData.status}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6"/>
                                    </svg>
                                </button>
                                {statusDropdown.isOpen && (
                                <div className={styles.dropdownMenu}>
                                    {statuses.map((selected, index) => (
                                        <div key={index}
                                            className={styles.dropdownItem}
                                            onClick={() => {
                                                updateField('status', selected);
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
                                disabled={!formData.account || !formData.amount || !formData.description || !formData.status || !formData.date}
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
                                <span className={styles.reviewValue}>{formData.type}</span>
                            </div>
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Category</span>
                                <span className={styles.reviewValue}>{formData.category}</span>
                            </div>
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Date</span>
                                <span className={styles.reviewValue}>{formData.date}</span>
                            </div>
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Description</span>
                                <span className={styles.reviewValue}>{formData.description}</span>
                            </div>
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Account</span>
                                <span className={styles.reviewValue}>{formData.account}</span>
                            </div>
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Amount</span>
                                <span className={styles.reviewAmountValue}>${formData.amount}</span>
                            </div>
                            {formData.notes && formData.notes.trim() !== "" && (
                                <div className={styles.reviewRowNotes}>
                                    <span className={styles.reviewLabel}>Notes</span>
                                    <span className={styles.reviewValue}>{formData.notes}</span>
                                </div>
                            )}
                            <div className={styles.reviewRow}>
                                <span className={styles.reviewLabel}>Status</span>
                                <span className={styles.reviewValue}>{formData.status}</span>
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
     )
                    
                    
}

export default TransactionsSidePannel
