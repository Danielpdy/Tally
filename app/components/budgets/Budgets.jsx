'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './budgets.module.css';

const Budgets = () => {
    const [bufferPercent, setBufferPercent] = useState(15);
    const [weeklyBudget, setWeeklyBudget] = useState('');
    const [bills, setBills] = useState([
        { id: 1, name: 'Netflix', amount: 15.99, dayOfMonth: 1 },
        { id: 2, name: 'Internet', amount: 60.00, dayOfMonth: 5 },
        { id: 3, name: 'Gym', amount: 45.00, dayOfMonth: 15 }
    ]);
    const [showModal, setShowModal] = useState(false);

    // Hardcoded safe to spend data for now
    const safeToSpendData = {
        thisWeekIncome: 1245.00,
        thisWeekSpending: 320.00,
        upcomingBills: 76.00,
        safetyBuffer: 187.00,
        safeToSpend: 662.00
    };

    const handleSaveSettings = () => {
        console.log('Saving settings:', { bufferPercent, weeklyBudget });
        // TODO: Call API to save settings
    };

    const handleDeleteBill = (id) => {
        setBills(bills.filter(bill => bill.id !== id));
    };

    const getDaySuffix = (day) => {
        if (day >= 11 && day <= 13) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return (
        <div className={styles.budgetPage}>
            {/* Page Header */}
            <div className={styles.pageHeader}>
                <h1>Budget & Bills</h1>
                <p>Manage your weekly safe-to-spend and recurring bills</p>
            </div>

            {/* Safe to Spend Breakdown Card */}
            <div className={styles.safeToSpendCard}>
                <div className={styles.cardHeader}>
                    <div className={styles.headerIconCircle}>
                        <Image src='/assets/icons/walletIcon.svg' width={24} height={24} alt='safe to spend' />
                    </div>
                    <h2>Safe to Spend This Week</h2>
                </div>

                <div className={styles.breakdownList}>
                    <div className={styles.breakdownItem}>
                        <div className={styles.breakdownIconCircle}>
                            <Image src='/assets/icons/dollarIcon.svg' width={20} height={20} alt='income' />
                        </div>
                        <div className={styles.breakdownContent}>
                            <p className={styles.breakdownLabel}>This Week's Income</p>
                            <p className={styles.breakdownSubtext}>Dec 9-15</p>
                        </div>
                        <p className={styles.breakdownAmount}>${safeToSpendData.thisWeekIncome.toFixed(2)}</p>
                    </div>

                    <div className={styles.breakdownItem}>
                        <div className={styles.breakdownIconCircle}>
                            <Image src='/assets/icons/receiptIcon.svg' width={20} height={20} alt='spending' />
                        </div>
                        <div className={styles.breakdownContent}>
                            <p className={styles.breakdownLabel}>This Week's Spending</p>
                            <p className={styles.breakdownSubtext}>Dec 9-15</p>
                        </div>
                        <p className={styles.breakdownAmount}>${safeToSpendData.thisWeekSpending.toFixed(2)}</p>
                    </div>

                    <div className={styles.breakdownItem}>
                        <div className={styles.breakdownIconCircle}>
                            <Image src='/assets/icons/clipboardIcon.svg' width={20} height={20} alt='bills' />
                        </div>
                        <div className={styles.breakdownContent}>
                            <p className={styles.breakdownLabel}>Upcoming Bills</p>
                            <p className={styles.breakdownSubtext}>Due this week</p>
                        </div>
                        <p className={styles.breakdownAmount}>${safeToSpendData.upcomingBills.toFixed(2)}</p>
                    </div>

                    <div className={styles.breakdownItem}>
                        <div className={styles.breakdownIconCircle}>
                            <Image src='/assets/icons/walletIcon.svg' width={20} height={20} alt='buffer' />
                        </div>
                        <div className={styles.breakdownContent}>
                            <p className={styles.breakdownLabel}>Safety Buffer ({bufferPercent}%)</p>
                            <p className={styles.breakdownSubtext}>Reserved</p>
                        </div>
                        <p className={styles.breakdownAmount}>${safeToSpendData.safetyBuffer.toFixed(2)}</p>
                    </div>
                </div>

                <div className={styles.breakdownDivider}></div>

                <div className={styles.safeToSpendResult}>
                    <div className={styles.resultLabel}>
                        <p>Safe to Spend</p>
                        <p className={styles.resultFormula}>(Income - Spending - Bills - Buffer)</p>
                    </div>
                    <h3 className={styles.resultAmount} style={{ color: '#059669' }}>
                        ${safeToSpendData.safeToSpend.toFixed(2)}
                    </h3>
                </div>
            </div>

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
                                <p className={styles.billName}>{bill.name}</p>
                                <p className={styles.billMeta}>Every {bill.dayOfMonth}{getDaySuffix(bill.dayOfMonth)}</p>
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
                                onChange={(e) => setBufferPercent(e.target.value)}
                                className={styles.slider}
                            />
                            <span className={styles.sliderValue}>{bufferPercent}%</span>
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

                    <button className={styles.saveButton} onClick={handleSaveSettings}>
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Budgets;
