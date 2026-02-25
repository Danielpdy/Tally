"use client"

import React, { useState, useEffect, useMemo } from 'react';
import styles from './insights.module.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { GetTransactions } from '@services/TransactionService';
import { GetBillsDueThisWeek, GetBillsOverdueThisWeek, GetRecurringBills } from '@services/RecurringBillsService';
import { GetFinancialGoals } from '@services/FinantialGoalService';
import { GetPaidBills } from '@services/BillPaymentService';
import { calculateHealthScore, getHealthStatus, generateHealthDescription } from '@services/HealthScoreService';
import { useMonthlyData } from '@hooks/useMonthlyData';
import MonthlySummary from '../MonthlySummary';

const Insights = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [transactions, setTransactions] = useState([]);
    const [billsDueThisWeek, setBillsDueThisWeek] = useState([]);
    const [billsOverdue, setBillsOverdue] = useState([]);
    const [billsPaidIds, setBillsPaidIds] = useState([]);
    const [recurringBills, setRecurringBills] = useState([]);
    const [financialGoals, setFinancialGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (session?.accessToken) {
            fetchAllData();
        }
    }, [session?.accessToken]);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [transactionsData, billsDue, billsOverdueData, bills, goals, paidBillsData] = await Promise.all([
                GetTransactions(session.accessToken),
                GetBillsDueThisWeek(session.accessToken),
                GetBillsOverdueThisWeek(session.accessToken),
                GetRecurringBills(session.accessToken),
                GetFinancialGoals(session.accessToken),
                GetPaidBills(session.accessToken)
            ]);

            // Extract paid bill IDs
            const paidIds = paidBillsData?.payments?.map(p => p.recurringBillId) || [];
            setBillsPaidIds(paidIds);

            setTransactions(Array.isArray(transactionsData) ? transactionsData : []);

            // Filter out paid bills from due this week
            const dueBills = (billsDue?.upcomingBills || []).filter(bill => !paidIds.includes(bill.id));
            setBillsDueThisWeek(dueBills);

            // Extract IDs from objects and filter out paid bills from overdue
            const overdueIds = (billsOverdueData?.overdueBills?.map(bill => typeof bill === 'object' ? bill.id : bill) || [])
                .filter(id => !paidIds.includes(id));
            setBillsOverdue(overdueIds);

            setRecurringBills(Array.isArray(bills) ? bills : []);
            setFinancialGoals(Array.isArray(goals) ? goals : []);
        } catch (error) {
            console.error('Error fetching insights data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Use the custom hook for monthly data calculation
    const monthlyData = useMonthlyData(transactions, {
        dueThisWeek: billsDueThisWeek,
        overdue: billsOverdue,
        paid: billsPaidIds,
        allBills: recurringBills,
    });

    const { current, previous, savingsChange, incomeChange, expensesChange, currentMonthName, lastMonthName } = monthlyData;


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
                                    pathColor: '#8B5CF6',
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
                        {transactions.length === 0 ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '40px 20px',
                                gap: '12px',
                                minHeight: '200px'
                            }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'linear-gradient(135deg, #e4d8fc 0%, #F5F3FF 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                    </svg>
                                </div>
                                <p style={{
                                    fontSize: '14px',
                                    color: '#6b7280',
                                    textAlign: 'center',
                                    maxWidth: '250px',
                                    lineHeight: '1.5',
                                    margin: 0
                                }}>
                                    Add your first transaction to start tracking your monthly cash flow and income trends
                                </p>
                            </div>
                        ) : (
                        <>
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
                        </>
                        )}
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
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '40px 20px',
                                    gap: '12px',
                                    minHeight: '180px'
                                }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        background: 'linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                            <polyline points="22 4 12 14.01 9 11.01"/>
                                        </svg>
                                    </div>
                                    <h4 style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: '#10B981',
                                        margin: 0
                                    }}>All Clear!</h4>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#6b7280',
                                        textAlign: 'center',
                                        maxWidth: '250px',
                                        lineHeight: '1.5',
                                        margin: 0
                                    }}>
                                        No upcoming or overdue bills this week. You're all caught up!
                                    </p>
                                </div>
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
                        {transactions.length === 0 ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '40px 20px',
                                gap: '12px',
                                minHeight: '200px'
                            }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'linear-gradient(135deg, #e4d8fc 0%, #F5F3FF 100%)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/>
                                        <path d="M16 10h.01"/>
                                        <path d="M2 8v1a2 2 0 0 0 2 2h1"/>
                                    </svg>
                                </div>
                                <p style={{
                                    fontSize: '14px',
                                    color: '#6b7280',
                                    textAlign: 'center',
                                    maxWidth: '250px',
                                    lineHeight: '1.5',
                                    margin: 0
                                }}>
                                    Track income and expenses to calculate your monthly savings rate
                                </p>
                            </div>
                        ) : (
                            <>
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
                            </>
                        )}
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
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '40px 20px',
                                    gap: '12px',
                                    minHeight: '180px'
                                }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        background: 'linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"/>
                                            <path d="M12 16v-4"/>
                                            <path d="M12 8h.01"/>
                                        </svg>
                                    </div>
                                    <h4 style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: '#1a0b2e',
                                        margin: 0
                                    }}>No Goals Yet</h4>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#6b7280',
                                        textAlign: 'center',
                                        maxWidth: '280px',
                                        lineHeight: '1.5',
                                        margin: 0
                                    }}>
                                        Set your first financial goal and start tracking your progress toward your dreams!
                                    </p>
                                </div>
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

                    {/* Monthly Summary Card - Now using reusable component */}
                    <MonthlySummary
                        preview={false}
                        monthlyData={monthlyData}
                        billsOverdue={billsOverdue}
                        billsDueThisWeek={billsDueThisWeek}
                        onViewTransactions={() => router.push('/Transactions')}
                        hasTransactions={transactions.length > 0}
                    />
                </div>
            </div>
        </div>
    );
};

export default Insights;
