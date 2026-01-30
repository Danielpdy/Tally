"use client"

import React, { useState, useEffect, useMemo } from 'react';
import styles from './insightsPreview.module.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { GetTransactions } from '@services/TransactionService';
import { GetBillsDueThisWeek, GetBillsOverdueThisWeek, GetRecurringBills } from '@services/RecurringBillsService';
import { GetFinancialGoals } from '@services/FinantialGoalService';
import { calculateHealthScore, getHealthStatus, generateHealthDescription } from '@services/HealthScoreService';

const Insights = () => {
    const router = useRouter();
    const { data: session } = useSession();

    // Data states
    const [transactions, setTransactions] = useState([]);
    const [billsDueThisWeek, setBillsDueThisWeek] = useState([]);
    const [billsOverdue, setBillsOverdue] = useState([]);
    const [recurringBills, setRecurringBills] = useState([]);
    const [financialGoals, setFinancialGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch all data
    useEffect(() => {
        if (session?.accessToken) {
            fetchAllData();
        }
    }, [session?.accessToken]);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [transactionsData, billsDue, billsOverdueData, bills, goals] = await Promise.all([
                GetTransactions(session.accessToken),
                GetBillsDueThisWeek(session.accessToken),
                GetBillsOverdueThisWeek(session.accessToken),
                GetRecurringBills(session.accessToken),
                GetFinancialGoals(session.accessToken)
            ]);

            setTransactions(Array.isArray(transactionsData) ? transactionsData : []);
            setBillsDueThisWeek(billsDue?.upcomingBills || []);
            setBillsOverdue(billsOverdueData?.overdueBills || []);
            setRecurringBills(Array.isArray(bills) ? bills : []);
            setFinancialGoals(Array.isArray(goals) ? goals : []);
        } catch (error) {
            console.error('Error fetching insights data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate monthly data
    const monthlyData = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        const filterByMonth = (month, year) => transactions.filter(t => {
            const date = new Date(t.date);
            return date.getMonth() === month && date.getFullYear() === year;
        });

        const calculateMonthStats = (monthTransactions) => {
            const income = monthTransactions
                .filter(t => t.type === 'Income')
                .reduce((sum, t) => sum + t.amount, 0);
            const expenses = monthTransactions
                .filter(t => t.type === 'Expense')
                .reduce((sum, t) => sum + t.amount, 0);
            const savings = income - expenses;
            const savingsRate = income > 0 ? ((savings / income) * 100) : 0;
            const transactionCount = monthTransactions.filter(t => t.type === 'Expense').length;
            const incomeSourceCount = monthTransactions.filter(t => t.type === 'Income').length;
            return { income, expenses, savings, savingsRate, transactionCount, incomeSourceCount };
        };

        const currentMonthTransactions = filterByMonth(currentMonth, currentYear);
        const lastMonthTransactions = filterByMonth(lastMonth, lastMonthYear);

        const current = calculateMonthStats(currentMonthTransactions);
        const previous = calculateMonthStats(lastMonthTransactions);

        const savingsChange = current.savingsRate - previous.savingsRate;
        const incomeChange = previous.income > 0
            ? ((current.income - previous.income) / previous.income * 100)
            : 0;
        const expensesChange = previous.expenses > 0
            ? ((current.expenses - previous.expenses) / previous.expenses * 100)
            : 0;

        return {
            current,
            previous,
            savingsChange,
            incomeChange,
            expensesChange,
            currentMonthName: now.toLocaleString('default', { month: 'long' }),
            lastMonthName: new Date(lastMonthYear, lastMonth).toLocaleString('default', { month: 'long' })
        };
    }, [transactions]);

    // Calculate health score using the service
    const healthScore = useMemo(() => {
        return calculateHealthScore({
            savingsRate: monthlyData.current.savingsRate,
            overdueBillsCount: billsOverdue.length,
            financialGoals: financialGoals
        });
    }, [monthlyData, billsOverdue, financialGoals]);

    const healthStatus = getHealthStatus(healthScore);

    
    const formattedGoals = useMemo(() => {
        return financialGoals.slice(0, 3).map(goal => ({
            id: goal.id,
            name: goal.name,
            current: goal.currentAmount || 0,
            target: goal.targetAmount || 1,
            percentage: Math.round((goal.currentAmount / goal.targetAmount) * 100) || 0
        }));
    }, [financialGoals]);


    const billAlerts = useMemo(() => {
        const overdue = billsOverdue.map(id => {
            const bill = recurringBills.find(b => b.id === id);
            return bill ? { ...bill, status: 'overdue' } : null;
        }).filter(Boolean);

        const dueSoon = billsDueThisWeek.map(bill => ({ ...bill, status: 'due' }));

        return [...overdue, ...dueSoon].slice(0, 4);
    }, [billsOverdue, billsDueThisWeek, recurringBills]);

  
    const healthDescription = useMemo(() => {
        return generateHealthDescription({
            savings: monthlyData.current.savings,
            overdueBillsCount: billsOverdue.length,
            savingsChange: monthlyData.savingsChange
        });
    }, [monthlyData, billsOverdue]);

    if (isLoading) {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.insightsPage}>
                    <div className={styles.healthScoreCard}>
                        <p style={{ textAlign: 'center', width: '100%', color: '#64748b' }}>Loading your financial data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.insightsPage}>
                {/* Health Score Card */}
                <div className={styles.healthScoreCard}>
                    <div className={styles.healthScoreLeft}>
                        <div className={styles.scoreCircle}>
                            <CircularProgressbar
                                value={healthScore}
                                text={healthScore.toString()}
                                styles={buildStyles({
                                    pathColor: healthStatus.color,
                                    textColor: '#1a0b2e',
                                    trailColor: '#E9D5FF',
                                    textSize: '28px',
                                })}
                            />
                            <span className={styles.scoreLabel}>SCORE</span>
                        </div>
                    </div>
                    <div className={styles.healthScoreRight}>
                        <div className={styles.healthTitleRow}>
                            <h2 className={styles.healthTitle}>{healthStatus.text}</h2>
                        </div>
                        <p className={styles.healthDescription}>
                            {healthDescription}
                        </p>
                        <div className={styles.scoreFactors}>
                            <span className={styles.scoreFactorsLabel}>What affects your score:</span>
                            <div className={styles.scoreFactorsTags}>
                                <span className={styles.scoreTag}>Savings rate</span>
                                <span className={styles.scoreTag}>Bills paid on time</span>
                                <span className={styles.scoreTag}>Goal progress</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Three Cards Row */}
                <div className={styles.cardsRow}>
                    {/* Cash Flow Insights Card */}
                    <div className={styles.insightCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleRow}>
                                <span className={styles.cardIcon} style={{ backgroundColor: '#EEF2FF' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                    </svg>
                                </span>
                                <h3 className={styles.cardTitle}>Cash Flow Insights</h3>
                            </div>
                            <span className={styles.dateBadge}>{monthlyData.currentMonthName}</span>
                        </div>
                        <div className={styles.insightsList}>
                            <div className={styles.insightItem}>
                                <span className={styles.insightBullet} style={{ backgroundColor: monthlyData.current.savings >= 0 ? '#10B981' : '#EF4444' }} />
                                <p className={styles.insightText}>
                                    {monthlyData.current.savings >= 0 ? (
                                        <>You're earning <strong style={{ color: '#10B981' }}>${monthlyData.current.savings.toFixed(0)} more</strong> than you spend — positive cash flow!</>
                                    ) : (
                                        <>You're spending <strong style={{ color: '#EF4444' }}>${Math.abs(monthlyData.current.savings).toFixed(0)} more</strong> than you earn — negative cash flow</>
                                    )}
                                </p>
                            </div>
                            <div className={styles.insightItem}>
                                <span className={styles.insightBullet} style={{ backgroundColor: monthlyData.incomeChange >= 0 ? '#10B981' : '#FB923C' }} />
                                <p className={styles.insightText}>
                                    Your income is <strong style={{ color: monthlyData.incomeChange >= 0 ? '#10B981' : '#FB923C' }}>
                                        {Math.abs(monthlyData.incomeChange).toFixed(0)}% {monthlyData.incomeChange >= 0 ? 'higher' : 'lower'}
                                    </strong> than {monthlyData.lastMonthName}.
                                </p>
                            </div>
                            <div className={styles.insightItem}>
                                <span className={styles.insightBullet} style={{ backgroundColor: monthlyData.expensesChange <= 0 ? '#10B981' : '#FB923C' }} />
                                <p className={styles.insightText}>
                                    Expenses {monthlyData.expensesChange >= 0 ? 'increased' : 'decreased'} by <strong style={{ color: monthlyData.expensesChange <= 0 ? '#10B981' : '#FB923C' }}>
                                        ${Math.abs(monthlyData.current.expenses - monthlyData.previous.expenses).toFixed(0)}
                                    </strong> compared to {monthlyData.lastMonthName}.
                                </p>
                            </div>
                        </div>
                        <p className={styles.insightSummary}>
                            {monthlyData.current.savingsRate > 0 ? (
                                <>Keep this pace and you'll save <span className={styles.highlightAmount}>${(monthlyData.current.savings * 12).toLocaleString()}</span> this year.</>
                            ) : (
                                <>Review your expenses to improve your savings rate.</>
                            )}
                        </p>
                    </div>

                    {/* Bill Alerts Card */}
                    <div className={styles.insightCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleRow}>
                                <span className={styles.cardIcon} style={{ backgroundColor: '#EEF2FF' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                                    </svg>
                                </span>
                                <h3 className={styles.cardTitle}>Bill Alerts</h3>
                            </div>
                            {(billsOverdue.length + billsDueThisWeek.length) > 0 && (
                                <span className={styles.countBadge} style={{ backgroundColor: '#EF4444' }}>
                                    {billsOverdue.length + billsDueThisWeek.length}
                                </span>
                            )}
                        </div>
                        <div className={styles.billsList}>
                            {billAlerts.length === 0 ? (
                                <p className={styles.noBills}>No upcoming or overdue bills this week!</p>
                            ) : (
                                billAlerts.map((bill, idx) => (
                                    <div key={idx} className={styles.billItem}>
                                        <div className={styles.billInfo}>
                                            <span className={styles.billDot} style={{ backgroundColor: bill.status === 'overdue' ? '#EF4444' : '#FB923C' }} />
                                            <div>
                                                <span className={styles.billName}>{bill.name}</span>
                                                <span className={styles.billDue} style={{ color: bill.status === 'overdue' ? '#EF4444' : '#FB923C' }}>
                                                    {bill.status === 'overdue' ? 'Overdue' : 'Due this week'}
                                                </span>
                                            </div>
                                        </div>
                                        <span className={styles.billAmount}>${bill.amount?.toFixed(2)}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <button className={styles.linkBtn} onClick={() => router.push('/Budgets')}>View your recurring bills</button>
                    </div>

                    {/* Savings Rate Card */}
                    <div className={styles.insightCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleRow}>
                                <span className={styles.cardIcon} style={{ backgroundColor: '#EEF2FF' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/>
                                        <path d="M16 10h.01"/>
                                        <path d="M2 8v1a2 2 0 0 0 2 2h1"/>
                                    </svg>
                                </span>
                                <h3 className={styles.cardTitle}>Savings Rate</h3>
                            </div>
                            <span className={styles.infoIcon}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 16v-4"/>
                                    <path d="M12 8h.01"/>
                                </svg>
                            </span>
                        </div>
                        <div className={styles.savingsContent}>
                            <span className={styles.savingsRate}>{monthlyData.current.savingsRate.toFixed(0)}%</span>
                            <span className={styles.savingsChange} style={{
                                backgroundColor: monthlyData.savingsChange >= 0 ? '#D1FAE5' : '#FEE2E2',
                                color: monthlyData.savingsChange >= 0 ? '#10B981' : '#EF4444'
                            }}>
                                {monthlyData.savingsChange >= 0 ? '↗' : '↘'} {monthlyData.savingsChange >= 0 ? '+' : ''}{monthlyData.savingsChange.toFixed(1)}% vs {monthlyData.lastMonthName}
                            </span>
                        </div>
                        <p className={styles.targetText}>
                            {monthlyData.current.savingsRate >= 20
                                ? "You've hit the recommended 20% savings rate!"
                                : `Target rate: 20%. ${(20 - monthlyData.current.savingsRate).toFixed(0)}% to go.`}
                        </p>
                    </div>
                </div>

                {/* Two Cards Row */}
                <div className={styles.cardsRowTwo}>
                    {/* Goal Progress Card */}
                    <div className={styles.insightCardSmall}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleRow}>
                                <span className={styles.cardIcon} style={{ backgroundColor: '#EEF2FF' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                                        <line x1="4" y1="22" x2="4" y2="15"/>
                                    </svg>
                                </span>
                                <h3 className={styles.cardTitle}>Goal Progress</h3>
                            </div>
                        </div>
                        <div className={styles.goalsList}>
                            {formattedGoals.length === 0 ? (
                                <p className={styles.noBills}>No financial goals set yet. Create one to start tracking!</p>
                            ) : (
                                formattedGoals.map((goal, idx) => (
                                    <div key={idx} className={styles.goalItem}>
                                        <div className={styles.goalHeader}>
                                            <span className={styles.goalName}>{goal.name}</span>
                                            <span className={styles.goalPercentage} style={{ color: '#38BDF8' }}>
                                                {goal.percentage}%
                                            </span>
                                        </div>
                                        <div className={styles.goalProgressBar}>
                                            <div
                                                className={styles.goalProgressFill}
                                                style={{
                                                    width: `${Math.min(goal.percentage, 100)}%`,
                                                    backgroundColor: '#38BDF8'
                                                }}
                                            />
                                        </div>
                                        <span className={styles.goalAmount}>
                                            ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                        <button className={styles.linkBtn} onClick={() => router.push('/Dashboard')}>View your Financial Goals</button>
                    </div>

                    {/* Monthly Summary Card */}
                    <div className={styles.insightCardLarge}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleRow}>
                                <span className={styles.cardIcon} style={{ backgroundColor: '#EEF2FF' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14 2 14 8 20 8"/>
                                        <line x1="16" y1="13" x2="8" y2="13"/>
                                        <line x1="16" y1="17" x2="8" y2="17"/>
                                        <polyline points="10 9 9 9 8 9"/>
                                    </svg>
                                </span>
                                <h3 className={styles.cardTitle}>Monthly Summary</h3>
                            </div>
                            <span className={styles.monthlyBadge}>{monthlyData.currentMonthName}</span>
                        </div>

                        <div className={styles.summaryGrid}>
                            {/* Income Summary */}
                            <div className={styles.summaryItem}>
                                <div className={styles.summaryIcon} style={{ backgroundColor: '#D1FAE5' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/>
                                        <path d="M18 12h.01"/>
                                        <path d="M19 22v-6"/>
                                        <path d="m22 19-3-3-3 3"/>
                                        <path d="M6 12h.01"/>
                                        <circle cx="12" cy="12" r="2"/>
                                    </svg>
                                </div>
                                <div className={styles.summaryContent}>
                                    <span className={styles.summaryLabel}>Income</span>
                                    <span className={styles.summaryMessage}>
                                        You earned <strong style={{ color: '#10B981' }}>${monthlyData.current.income.toLocaleString()}</strong> this month from {monthlyData.current.incomeSourceCount} income source{monthlyData.current.incomeSourceCount !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>

                            {/* Expenses Summary */}
                            <div className={styles.summaryItem}>
                                <div className={styles.summaryIcon} style={{ backgroundColor: '#FEF3C7' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/>
                                        <path d="m16 19 3 3 3-3"/>
                                        <path d="M18 12h.01"/>
                                        <path d="M19 16v6"/>
                                        <path d="M6 12h.01"/>
                                        <circle cx="12" cy="12" r="2"/>
                                    </svg>
                                </div>
                                <div className={styles.summaryContent}>
                                    <span className={styles.summaryLabel}>Expenses</span>
                                    <span className={styles.summaryMessage}>
                                        You spent <strong style={{ color: '#FB923C' }}>${monthlyData.current.expenses.toLocaleString()}</strong> across {monthlyData.current.transactionCount} transaction{monthlyData.current.transactionCount !== 1 ? 's' : ''} this month
                                    </span>
                                </div>
                            </div>

                            {/* Net Savings */}
                            <div className={styles.summaryItem}>
                                <div className={styles.summaryIcon} style={{ backgroundColor: '#E8E3F3' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a0b2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/>
                                        <path d="M16 10h.01"/>
                                        <path d="M2 8v1a2 2 0 0 0 2 2h1"/>
                                    </svg>
                                </div>
                                <div className={styles.summaryContent}>
                                    <span className={styles.summaryLabel}>Savings</span>
                                    <span className={styles.summaryMessage}>
                                        {monthlyData.current.savings >= 0 ? (
                                            <>You kept <strong style={{ color: '#1a0b2e' }}>${monthlyData.current.savings.toLocaleString()}</strong> — that's {monthlyData.current.savingsRate.toFixed(0)}% of your income saved</>
                                        ) : (
                                            <>You overspent by <strong style={{ color: '#EF4444' }}>${Math.abs(monthlyData.current.savings).toLocaleString()}</strong> this month</>
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Bills Status */}
                            <div className={styles.summaryItem}>
                                <div className={styles.summaryIcon} style={{ backgroundColor: '#FEE2E2' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M13 16H8"/>
                                        <path d="M14 8H8"/>
                                        <path d="M16 12H8"/>
                                        <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/>
                                    </svg>
                                </div>
                                <div className={styles.summaryContent}>
                                    <span className={styles.summaryLabel}>Bills</span>
                                    <span className={styles.summaryMessage}>
                                        {billsOverdue.length > 0 ? (
                                            <><strong style={{ color: '#EC4899' }}>{billsOverdue.length} bill{billsOverdue.length !== 1 ? 's' : ''}</strong> overdue — pay now to avoid fees</>
                                        ) : billsDueThisWeek.length > 0 ? (
                                            <><strong style={{ color: '#EC4899' }}>{billsDueThisWeek.length} bill{billsDueThisWeek.length !== 1 ? 's' : ''}</strong> due this week totaling <strong style={{ color: '#EC4899' }}>${billsDueThisWeek.reduce((sum, b) => sum + (b.amount || 0), 0).toFixed(2)}</strong></>
                                        ) : (
                                            <>All bills are paid — great job staying on top!</>
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Cash Flow */}
                            <div className={styles.summaryItem}>
                                <div className={styles.summaryIcon} style={{ backgroundColor: '#EEF2FF' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                    </svg>
                                </div>
                                <div className={styles.summaryContent}>
                                    <span className={styles.summaryLabel}>Cash Flow</span>
                                    <span className={styles.summaryMessage}>
                                        {monthlyData.current.savings >= 0 ? (
                                            <><strong style={{ color: '#8B5CF6' }}>Positive</strong> — you're earning <strong style={{ color: '#10B981' }}>${monthlyData.current.savings.toLocaleString()} more</strong> than you spend</>
                                        ) : (
                                            <><strong style={{ color: '#EF4444' }}>Negative</strong> — you're spending <strong style={{ color: '#EF4444' }}>${Math.abs(monthlyData.current.savings).toLocaleString()} more</strong> than you earn</>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.trendFooter}>
                            <span className={styles.avgSpend}>
                                {monthlyData.current.savings >= 0
                                    ? `You're saving $${(monthlyData.current.savings / 30).toFixed(0)} per day on average`
                                    : `You're overspending by $${(Math.abs(monthlyData.current.savings) / 30).toFixed(0)} per day`}
                            </span>
                            <button className={styles.linkBtn} onClick={() => router.push('/Transactions')}>
                                View all transactions →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insights;
