"use client";
import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SpendingChart from '../SpendingChart';
import CashflowChart from '../CashflowChartExample';
import SafetoSpend from '../SafetoSpend';
import { GetTransactions } from '@services/TransactionService';
import { GetBillsDueThisWeek, GetRecurringBills } from '@services/RecurringBillsService';
import { GetPaidBills } from '@services/BillPaymentService';
import { useSession } from '@node_modules/next-auth/react';


const Dashboard = () => {
    const [cashFlowPeriod, setCashFlowPeriod] = useState('7days');
    const [earnings, setEarnings] = useState(0);
    const [spendings, setSpendings] = useState(0);
    const [transactionsData, setTransactionsData] = useState([]);
    const [billsDueThisWeek, setBillsDueThisWeek] = useState([]);
    const [paidBills, setPaidBills] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.accessToken) {
            fetchTransactions();
            fetchRecurringBills();
            fetchPaidBills();
        }
    }, [session?.accessToken])

    const fetchTransactions = async () => {
        const data = await GetTransactions(session.accessToken);
        setTransactionsData(data);
    }

    const fetchBillsDueThisWeek = async () => {
        const billsDueThisWeek = await GetBillsDueThisWeek(session.accessToken);
        setBillsDueThisWeek()
    }

    const financialGoals = [
        { name: 'Emergency Fund', current: 8500, target: 10000, percentage: 85, due: 'Dec 2025', emoji: '💪' },
        { name: 'Vacation Fund', current: 3600, target: 5000, percentage: 72, due: 'Jul 2025', emoji: '✈️' },
        { name: 'New Car', current: 12000, target: 25000, percentage: 48, due: 'Dec 2026', emoji: '🚗' },
        { name: 'Home Deposit', current: 45000, target: 100000, percentage: 45, due: 'Dec 2027', emoji: '🏠' }
    ];

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

        const totalSpendings = transactionsData.filter(transaction => {
            const [year, month, day] = transaction.date.split('-').map(Number);
            const transactionDate = new Date(year, month - 1, day);
            return transactionDate >= startDate && transactionDate <= endDate;
        })
        .reduce(
            (sum, transaction) => transaction.type === "Expense" ? sum + transaction.amount : sum,
            0
        )
        setSpendings(totalSpendings);

        return totalEarnings - totalSpendings;
    }, [transactionsData]);
  

    const debts = [
        { name: 'Credit Card', paid: 500, remaining: 200, total: 700 },
        { name: 'Car Loan', paid: 4000, remaining: 3500, total: 7500 },
        { name: 'Student Loan', paid: 5000, remaining: 10000, total: 15000 }
    ];

    const insights = [
        { icon: '📈', text: 'You spent 14% more on dining this month.', type: 'warning' },
        { icon: '⭕', text: 'Your rent is 38% of income—try keeping it under 30%.', type: 'info' },
        { icon: '🎯', text: 'You\'re on track to hit your savings goal early 🎯', type: 'success' },
        { icon: '✨', text: 'Great job! You\'ve saved $450 more than last month.', type: 'success' }
    ];

    const achievements = [
        { icon: '🏆', title: '3 Months Under Budget', description: 'Stayed within budget for 3 consecutive months', active: true },
        { icon: '🔥', title: '7 Day Streak', description: 'Tracked expenses every day for a week', active: true },
        { icon: '🎯', title: 'First Goal Complete', description: 'Completed your first savings goal', active: true },
        { icon: '💰', title: 'Savings Master', description: 'Saved over $5,000 in total', active: false }
    ];

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.dashboardPage}>
                {/* Header */}
                <div className={styles.pageHeader}>
                    <div>
                        <h1>Dashboard</h1>
                        <p>Your complete financial overview</p>
                    </div>
                </div>

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
                        <SpendingChart preview={false} content={transactionsData} recurringBills={recurringBills} paidBills={paidBills}/>

                        {/* Cash Flow Timeline */}
                        <CashflowChart preview={false} content={transactionsData} />
                        

                        {/* Debt Payoff Visualizer */}
                        <div className={styles.card}>
                            <div className={styles.cardHeaderRow}>
                                <div>
                                    <h3 className={styles.cardTitle}>Debt Payoff Visualizer</h3>
                                    <p className={styles.debtSubtitle}>Estimated Debt-Free Date: <span className={styles.debtDate}>March 2027</span></p>
                                </div>
                                <div className={styles.debtToggle}>
                                    <button className={`${styles.debtToggleBtn} ${styles.active}`}>Snowball</button>
                                    <button className={styles.debtToggleBtn}>Avalanche</button>
                                </div>
                            </div>
                            <div className={styles.debtBars}>
                                {debts.map((debt, idx) => (
                                    <div key={idx} className={styles.debtItem}>
                                        <span className={styles.debtLabel}>{debt.name}</span>
                                        <div className={styles.debtBar}>
                                            <div className={styles.debtPaid} style={{ width: `${(debt.paid / debt.total) * 100}%` }}></div>
                                            <div className={styles.debtRemaining} style={{ width: `${(debt.remaining / debt.total) * 100}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                                <div className={styles.debtLegend}>
                                    <div className={styles.debtLegendItem}>
                                        <div className={styles.debtLegendColor} style={{ backgroundColor: '#8B5CF6' }}></div>
                                        <span>Paid So Far</span>
                                    </div>
                                    <div className={styles.debtLegendItem}>
                                        <div className={styles.debtLegendColor} style={{ backgroundColor: '#FF8042' }}></div>
                                        <span>Remaining Balance</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.rightColumn}>
                        {/* Safe to Spend */}
                        <SafetoSpend preview={false} content={transactionsData} recurringBills={[]} />

                        {/* Financial Goals */}
                        <div className={styles.card}>
                            <div className={styles.cardHeaderRow}>
                                <h3 className={styles.cardTitle}>Financial Goals</h3>
                                <button className={styles.addGoalBtn}>+ Add Goal</button>
                            </div>
                            <div className={styles.goalsGrid}>
                                {financialGoals.map((goal, idx) => (
                                    <div key={idx} className={styles.goalCard}>
                                        <div className={styles.goalCircle}>
                                            <CircularProgressbar
                                                value={goal.percentage}
                                                text={`${goal.percentage}%`}
                                                styles={buildStyles({
                                                    pathColor: '#8B5CF6',
                                                    textColor: '#8B5CF6',
                                                    trailColor: '#E9D5FF',
                                                    textSize: '24px',
                                                    fontWeight: 'bold'
                                                })}
                                            />
                                        </div>
                                        <h4 className={styles.goalName}>{goal.name}</h4>
                                        <p className={styles.goalAmount}>${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</p>
                                        <p className={styles.goalDue}>Due {goal.due}</p>
                                        <p className={styles.goalEncouragement}>Keep going! {goal.emoji}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Insights */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>AI Insights & Alerts</h3>
                            <div className={styles.insightsList}>
                                {insights.map((insight, idx) => (
                                    <div key={idx} className={styles.insightItem}>
                                        <span className={styles.insightIcon}>{insight.icon}</span>
                                        <p className={styles.insightText}>{insight.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Achievements & Streaks */}
                <div className={styles.achievementsSection}>
                    <h3 className={styles.sectionTitle}>Achievements & Streaks</h3>
                    <div className={styles.achievementsGrid}>
                        {achievements.map((achievement, idx) => (
                            <div key={idx} className={`${styles.achievementCard} ${!achievement.active ? styles.locked : ''}`}>
                                <div className={styles.achievementIcon}>{achievement.icon}</div>
                                <h4 className={styles.achievementTitle}>{achievement.title}</h4>
                                <p className={styles.achievementDesc}>{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.dashboardFooter}>
                    <p>© 2025 Tally – Your Balance in Focus</p>
                    <div className={styles.footerLinks}>
                        <Link href="#">Privacy Policy</Link>
                        <span>•</span>
                        <Link href="#">Support</Link>
                        <span>•</span>
                        <span>v1.0.0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
