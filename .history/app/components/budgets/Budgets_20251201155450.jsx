'use client';
import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import styles from './budgets.module.css';
import { GetTransactions } from '@services/TransactionService';
import { useSession } from '@node_modules/next-auth/react';

const Budgets = () => {
    const [bufferPercent, setBufferPercent] = useState(10);
    const [weeklyBudget, setWeeklyBudget] = useState('');
    const [bills, setBills] = useState([
        { id: 1, name: 'Netflix', amount: 15.99, dayOfMonth: 1, status: 'paid' },
        { id: 2, name: 'Internet', amount: 60.00, dayOfMonth: 5, status: 'dueSoon' },
        { id: 3, name: 'Gym', amount: 45.00, dayOfMonth: 15, status: 'paid' }
    ]);
    const [showModal, setShowModal] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const { data: session } = useSession();

    useEffect(() => {
        getTransactions();
    },[session]);

    const getTransactions = async () => {
        if(!session.accessToken) return;

        try{
            setIsLoading(true);
            const result = await GetTransactions(session.accessToken);
            if(Array.isArray(result)){
                setTransactions(result);
            } else{
                throw new Error('Invalid data format');
            }
        } catch(error){
            console.error(error);
            setIsError(true);
        } finally{
            setIsLoading(false);
        }
    }

    const weeklyEarnings = useMemo(() => {
        return transactions.reduce((sum, transaction) => {
            transaction.type === 'Income' ? sum + transaction.amount : sum
        }, 0)
    })


    return (
        <div className={styles.budgetPage}>
            {/* Page Header */}
            <div className={styles.pageHeader}>
                <h1>Budget & Bills</h1>
                <p>Manage your weekly safe-to-spend and recurring bills</p>
            </div>

            {/* Two Column Layout */}
            <div className={styles.twoColumnLayout}>
                {/* Left Column */}
                <div className={styles.leftColumn}>
                    {/* Safe to Spend Breakdown Card */}
                    <div className={styles.safeToSpendCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.headerIconCircle}>
                                <Image src='/assets/icons/walletIcon.svg' width={24} height={24} alt='safe to spend' />
                            </div>
                            <h2>Safe to Spend This Week</h2>
                        </div>

                        <div className={styles.breakdownList}>
                            <div className={`${styles.breakdownItem} ${styles.income}`}>
                                <div className={styles.breakdownIconCircle}>
                                    <Image src='/assets/icons/dollarIcon.svg' width={20} height={20} alt='income' />
                                </div>
                                <div className={styles.breakdownContent}>
                                    <p className={styles.breakdownLabel}>This Week's Income</p>
                                    <p className={styles.breakdownSubtext}>Dec 9-15</p>
                                </div>
                                <p className={styles.breakdownAmount}>${weeklyEarnings()}</p>
                            </div>

                            <div className={`${styles.breakdownItem} ${styles.spending}`}>
                                <div className={styles.breakdownIconCircle}>
                                    <Image src='/assets/icons/receiptIcon.svg' width={20} height={20} alt='spending' />
                                </div>
                                <div className={styles.breakdownContent}>
                                    <p className={styles.breakdownLabel}>This Week's Spending</p>
                                    <p className={styles.breakdownSubtext}>Dec 9-15</p>
                                </div>
                                <p className={styles.breakdownAmount}>${}</p>
                            </div>

                            <div className={`${styles.breakdownItem} ${styles.bills}`}>
                                <div className={styles.breakdownIconCircle}>
                                    <Image src='/assets/icons/clipboardIcon.svg' width={20} height={20} alt='bills' />
                                </div>
                                <div className={styles.breakdownContent}>
                                    <p className={styles.breakdownLabel}>Upcoming Bills</p>
                                    <p className={styles.breakdownSubtext}>Due this week</p>
                                </div>
                                <p className={styles.breakdownAmount}>${}</p>
                            </div>

                            <div className={`${styles.breakdownItem} ${styles.buffer}`}>
                                <div className={styles.breakdownIconCircle}>
                                    <Image src='/assets/icons/walletIcon.svg' width={20} height={20} alt='buffer' />
                                </div>
                                <div className={styles.breakdownContent}>
                                    <p className={styles.breakdownLabel}>Safety Buffer ({bufferPercent}%)</p>
                                    <p className={styles.breakdownSubtext}>Reserved</p>
                                </div>
                                <p className={styles.breakdownAmount}>${}</p>
                            </div>
                        </div>

                        <div className={styles.breakdownDivider}></div>

                        <div className={styles.safeToSpendResult}>
                            <div className={styles.resultLabel}>
                                <p>Safe to Spend</p>
                                <p className={styles.resultFormula}>(Income - Spending - Bills - Buffer)</p>
                            </div>
                            <h3 className={`${styles.resultAmount}`}>
                                ${}
                            </h3>
                        </div>
                    </div>

                    {/* Budget Settings Card */}
                    <div className={styles.budgetSettingsCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.headerIconCircle}>
                                <Image src='/assets/icons/settingsIcon.svg' width={24} height={24} alt='settings' />
                            </div>
                            <h2>Budget Settings</h2>
                        </div>

                        <div className={styles.settingsForm}>
                            <div className={styles.settingGroup}>
                                <label className={styles.settingLabel}>
                                    Safety Buffer Percentage
                                    <span className={styles.settingHint}>Portion of income to set aside for unexpected expenses</span>
                                </label>
                                <div className={styles.sliderContainer}>
                                    <input
                                        type="range"
                                        min="0"
                                        max="30"
                                        step="5"
                                        value={bufferPercent}
                                        onChange={(e) => setBufferPercent(Number(e.target.value))}
                                        className={styles.slider}
                                    />
                                    <div className={styles.sliderValue}>
                                        <span className={styles.sliderPercentage}>{bufferPercent}%</span>
                                        <span className={styles.sliderDollarAmount}>${}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.settingGroup}>
                                <label className={styles.settingLabel}>
                                    Weekly Budget Goal (Optional)
                                    <span className={styles.settingHint}>Target spending limit per week</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={weeklyBudget}
                                    onChange={(e) => setWeeklyBudget(e.target.value)}
                                    className={styles.budgetInput}
                                    placeholder="e.g., 500.00"
                                />
                            </div>

                            <button className={styles.saveButton}>
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className={styles.rightColumn}>

                    {/* Recurring Bills Manager Card */}
                    <div className={styles.recurringBillsCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.headerIconCircle}>
                                <Image src='/assets/icons/calendarIcon.svg' width={24} height={24} alt='recurring bills' />
                            </div>
                            <h2>Recurring Bills</h2>
                        </div>

                        <button className={styles.addBillButton} onClick={() => setShowModal(true)}>
                            <span>+</span>
                            Add Recurring Bill
                        </button>

                        <h3 className={styles.billSectionHeader}>All Recurring Bills:</h3>

                        <div className={styles.billsList}>
                            {bills.map(bill => (
                                <div key={bill.id} className={styles.billItem}>
                                    <div className={styles.billIconCircle}>
                                        <Image src='/assets/icons/creditCardIcon.svg' width={20} height={20} alt='bill' />
                                    </div>
                                    <div className={styles.billInfo}>
                                        <p className={styles.billName}>
                                            {bill.name}
                                            {bill.status && (
                                                <span className={`${styles.billStatusBadge} ${styles[bill.status]}`}>
                                                    {bill.status === 'dueSoon' ? 'Due Soon' : bill.status === 'paid' ? 'Paid' : 'Overdue'}
                                                </span>
                                            )}
                                        </p>
                                        <p className={styles.billMeta}>Every</p>
                                    </div>
                                    <p className={styles.billAmount}>${bill.amount.toFixed(2)}</p>
                                    <div className={styles.billActions}>
                                        <button className={styles.editButton}>
                                            <Image src='/assets/icons/editIcon.svg' width={16} height={16} alt='edit' />
                                        </button>
                                        <button className={styles.deleteButton} onClick={() => handleDeleteBill(bill.id)}>
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bills Total */}
                        <div className={styles.billsTotal}>
                            <span className={styles.billsTotalLabel}>Total Monthly Bills</span>
                            <span className={styles.billsTotalAmount}>${}</span>
                        </div>
                    </div>

                    {/* Quick Stats Card */}
                    <div className={styles.statsCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.headerIconCircle}>
                                <Image src='/assets/icons/trendingUpBlue.svg' width={24} height={24} alt='stats' />
                            </div>
                            <h2>Quick Insights</h2>
                        </div>

                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>% of Income Available</span>
                            <span className={styles.statValue}>
                                {}%
                            </span>
                        </div>

                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Bills Coverage</span>
                            <span className={styles.statValue}>
                                {}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Budgets;
