"use client";
import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import SpendingChart from '../SpendingChart';
import CashflowChart from '../CashflowChartExample';
import SafetoSpend from '../SafetoSpend';
import FinancialGoals from '../FinancialGoals';
import { GetTransactions } from '@services/TransactionService';
import { GetBillsDueThisWeek, GetBillsOverdueThisWeek, GetRecurringBills } from '@services/RecurringBillsService';
import { GetPaidBills } from '@services/BillPaymentService';
import { GetFinancialGoals } from '@services/FinantialGoalService';
import { useSession } from '@node_modules/next-auth/react';
import { useMonthlyData } from '@hooks/useMonthlyData';
import MonthlySummary from '../MonthlySummary';
import ExpensePatternDetector from '../ExpensePatternDetector';


const Dashboard = () => {
    const router = useRouter();
    const [earnings, setEarnings] = useState(0);
    const [spendings, setSpendings] = useState(0);
    const [transactionsData, setTransactionsData] = useState([]);
    const [billsDueThisWeek, setBillsDueThisWeek] = useState([]);
    const [billsOverdueThisWeek, setBillsOverdueThisWeek] = useState([]);
    const [billsPaidThisWeek, setBillsPaidThisWeek] = useState([]);
    const [allRecurringBills, setAllRecurringBills] = useState([]);
    const [financialGoals, setFinancialGoals] = useState([]);
    const { data: session } = useSession();

    // Calculate monthly data using the custom hook
    const monthlyData = useMonthlyData(transactionsData);

    useEffect(() => {
        if (session?.accessToken) {
            fetchTransactions();
            fetchBillsDueThisWeek();
            fetchBillsOverdueThisWeek();
            fetchBillsPaid();
            fetchAllRecurringBills();
            fetchFinancialGoals();
        }
    }, [session?.accessToken])

    const fetchTransactions = async () => {
        const data = await GetTransactions(session.accessToken);
        setTransactionsData(data);
    };

    const fetchBillsDueThisWeek = async () => {
        const data = await GetBillsDueThisWeek(session.accessToken);
        setBillsDueThisWeek(data?.upcomingBills || []);
    };

    const fetchBillsOverdueThisWeek = async () => {
        const data = await GetBillsOverdueThisWeek(session.accessToken);
        setBillsOverdueThisWeek(data?.overdueBills || []);
    }

    const fetchBillsPaid = async () => {
        const data = await GetPaidBills(session.accessToken);
        const paidBillIds = data.payments?.map(payment => payment.recurringBillId) || [];
        setBillsPaidThisWeek(paidBillIds);
    }

    const fetchAllRecurringBills = async () => {
        const data = await GetRecurringBills(session.accessToken);
        setAllRecurringBills(data || []);
    }

    const fetchFinancialGoals = async () => {
        const data = await GetFinancialGoals(session.accessToken);
        setFinancialGoals(data || []);
    }

    // Filter out paid bills from due and overdue bills
    const unpaidBillsDue = useMemo(() => {
        return billsDueThisWeek.filter(bill => !billsPaidThisWeek.includes(bill.id));
    }, [billsDueThisWeek, billsPaidThisWeek]);

    const unpaidBillsOverdue = useMemo(() => {
        // billsOverdueThisWeek may contain IDs or objects - handle both cases
        const overdueIds = billsOverdueThisWeek.map(bill => typeof bill === 'object' ? bill.id : bill);
        // Filter out paid bills and map IDs back to full bill objects
        return overdueIds
            .filter(id => !billsPaidThisWeek.includes(id))
            .map(id => allRecurringBills.find(bill => bill.id === id))
            .filter(Boolean);
    }, [billsOverdueThisWeek, billsPaidThisWeek, allRecurringBills]);

    const calulateBalance = useMemo(() => {
        const result = [...transactionsData];
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        const endDate = now;

        const totalEarnings = result.filter(transaction => {
            const [year, month, day] = transaction.date.split('-').map(Number);
            const transactionDate = new Date(year, month - 1, day);
            return transactionDate >= startDate && transactionDate <= endDate;
        })
        .reduce(
            (sum, transaction) => transaction.type === "Income" ? sum + transaction.amount : sum,
            0
        );
        setEarnings(totalEarnings);

        const transactionSpendings = transactionsData.filter(transaction => {
            const [year, month, day] = transaction.date.split('-').map(Number);
            const transactionDate = new Date(year, month - 1, day);
            return transactionDate >= startDate && transactionDate <= endDate;
        })
        .reduce(
            (sum, transaction) => transaction.type === "Expense" ? sum + transaction.amount : sum,
            0
        );

        const unpaidBillsThisMonth = allRecurringBills
            .filter(bill => !billsPaidThisWeek.includes(bill.id))
            .reduce((sum, bill) => sum + bill.amount, 0);

        const totalSpendings = transactionSpendings + unpaidBillsThisMonth;
        setSpendings(totalSpendings);

        return totalEarnings - totalSpendings;
    }, [transactionsData, allRecurringBills, billsPaidThisWeek]);
  

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.dashboardPage}>
                {/* Top Stats Row */}
                <div className={styles.topStatsRow}>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statLabel}>Total Balance</span>
                            <div className={styles.statDot}></div>
                        </div>
                        <h2 className={styles.statAmount}>${calulateBalance}</h2>
                        <p className={styles.statSubtext}>Updated just now</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statLabel}>Monthly Flow</span>
                        </div>
                        <div className={styles.flowItems}>
                            <div className={styles.flowItem}>
                                <span className={styles.flowIcon}>↗</span>
                                <span className={styles.flowAmount}>${earnings}</span>
                                <span className={styles.flowLabel}>Income</span>
                            </div>
                            <div className={styles.flowItem}>
                                <span className={styles.flowIcon} style={{ color: '#FF8042' }}>↙</span>
                                <span className={styles.flowAmount} style={{ color: '#FF8042' }}>${spendings}</span>
                                <span className={styles.flowLabel}>Expenses</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statLabel}>Vacation Fund</span>
                        </div>
                        <div className={styles.goalProgress}>
                            <span className={styles.goalPercentage}>72%</span>
                            <div className={styles.progressBarHorizontal}>
                                <div className={styles.progressFillHorizontal} style={{ width: '72%' }}></div>
                            </div>
                        </div>
                        <p className={styles.goalAmount}>$3,600 / $5,000</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className={styles.mainGrid}>
                    {/* Left Column */}
                    <div className={styles.leftColumn}>
                        {/* Where Your Money Went */}
                        <SpendingChart preview={false} content={transactionsData} recurringBillsDueThisWeek={unpaidBillsDue} recurringBillsOverdueThisWeek={unpaidBillsOverdue}/>

                        {/* Cash Flow Timeline */}
                        <CashflowChart preview={false} content={transactionsData} recurringBills={allRecurringBills} paidBillIds={billsPaidThisWeek} />
                        

                        {/* Expense Pattern Detector */}
                        <ExpensePatternDetector transactions={transactionsData} preview={false} />
                    </div>

                    {/* Right Column */}
                    <div className={styles.rightColumn}>
                        {/* Safe to Spend */}
                        <SafetoSpend preview={false} content={transactionsData} recurringBillsDueThisWeek={unpaidBillsDue} recurringBillsOverdueThisWeek={unpaidBillsOverdue} />

                        {/* Financial Goals */}
                        <FinancialGoals preview={false} goals={financialGoals} />

                        {/* Monthly Summary */}
                        <MonthlySummary
                            preview={false}
                            monthlyData={monthlyData}
                            billsOverdue={unpaidBillsOverdue}
                            billsDueThisWeek={unpaidBillsDue}
                            onViewTransactions={() => router.push('/Transactions')}
                            hasTransactions={transactionsData.length > 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
