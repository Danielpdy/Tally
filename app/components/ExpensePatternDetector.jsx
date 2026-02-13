"use client"

import React, { useMemo } from 'react';
import styles from './Insights/insightsPreview.module.css';
import dashboardStyles from './dashboard/dashboardPreview.module.css';

const ExpensePatternDetector = ({ transactions = [], preview = false }) => {

    const previewData = {
        topMerchants: [
            { merchant: 'Starbucks', count: 12, monthlyTotal: 60, yearlyProjection: 720, category: 'Dining' },
            { merchant: 'Amazon', count: 8, monthlyTotal: 240, yearlyProjection: 2880, category: 'Shopping' },
            { merchant: 'Uber', count: 15, monthlyTotal: 180, yearlyProjection: 2160, category: 'Transportation' }
        ],
        dayOfWeekPattern: [
            { day: 'Monday', spending: 45, percentage: 12 },
            { day: 'Tuesday', spending: 52, percentage: 14 },
            { day: 'Wednesday', spending: 38, percentage: 10 },
            { day: 'Thursday', spending: 48, percentage: 13 },
            { day: 'Friday', spending: 95, percentage: 25 },
            { day: 'Saturday', spending: 68, percentage: 18 },
            { day: 'Sunday', spending: 32, percentage: 8 }
        ],
    };

    
    const topMerchants = useMemo(() => {
        if (preview) return previewData.topMerchants;
        if (!transactions || transactions.length === 0) return [];

        // Filter to current month only
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        const expenses = transactions.filter(t => {
            if (t.type !== 'Expense') return false;
            const [year, month, day] = t.date.split('-').map(Number);
            const transactionDate = new Date(year, month - 1, day);
            return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
        });

        const merchantMap = {};
        expenses.forEach(transaction => {
            const merchant = transaction.description || 'Unknown';
            if (!merchantMap[merchant]) {
                merchantMap[merchant] = {
                    merchant,
                    count: 0,
                    total: 0,
                    category: transaction.category || 'Other'
                };
            }
            merchantMap[merchant].count++;
            merchantMap[merchant].total += transaction.amount;
        });

        const merchantArray = Object.values(merchantMap)
            .filter(m => m.count >= 2)
            .map(m => ({
                ...m,
                monthlyTotal: m.total, // Total for this month
                yearlyProjection: m.total * 12 // Project this month's spending for the year
            }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);

        return merchantArray;
    }, [transactions, preview]);

    const dayOfWeekPattern = useMemo(() => {
        if (preview) return previewData.dayOfWeekPattern;
        if (!transactions || transactions.length === 0) return [];

        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayTotals = [0, 0, 0, 0, 0, 0, 0];

        // Filter to current month only
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        const expenses = transactions.filter(t => {
            if (t.type !== 'Expense') return false;
            const [year, month, day] = t.date.split('-').map(Number);
            const transactionDate = new Date(year, month - 1, day);
            return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
        });

        expenses.forEach(transaction => {
            const [year, month, day] = transaction.date.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            const dayOfWeek = date.getDay();
            dayTotals[dayOfWeek] += transaction.amount;
        });

        const totalSpending = dayTotals.reduce((sum, amount) => sum + amount, 0);

        return dayNames.map((day, idx) => ({
            day,
            spending: dayTotals[idx],
            percentage: totalSpending > 0 ? Math.round((dayTotals[idx] / totalSpending) * 100) : 0
        })).filter(d => d.spending > 0);
    }, [transactions, preview]);

    const highestSpendingDay = useMemo(() => {
        if (dayOfWeekPattern.length === 0) return null;
        return dayOfWeekPattern.reduce((max, day) =>
            day.spending > max.spending ? day : max
        , dayOfWeekPattern[0]);
    }, [dayOfWeekPattern]);

    const currentMonthName = useMemo(() => {
        return new Date().toLocaleString('default', { month: 'long' });
    }, []);

    const hasData = transactions.length > 0 || preview;
    const hasEnoughData = topMerchants.length > 0 || dayOfWeekPattern.length > 0;

    if (!hasData) {
        return (
            <div className={styles.insightCardLarge}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardTitleRow}>
                        <h3 className={dashboardStyles.spendingChartTitle}>Expense Pattern Detector</h3>
                    </div>
                    <span className={styles.monthlyBadge}>{currentMonthName}</span>
                </div>
                <div className={dashboardStyles.emptyStateContainer}>
                    <div className={dashboardStyles.emptyStateIcon}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B4FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </div>
                    <h4 className={dashboardStyles.emptyStateTitle}>No Patterns Yet</h4>
                    <p className={dashboardStyles.emptyStateMessage}>
                        Start adding expense transactions to discover your <span className={dashboardStyles.emptyStateHighlight}>spending patterns</span> and recurring habits.
                    </p>
                </div>
            </div>
        );
    }

    if (!preview && !hasEnoughData) {
        return (
            <div className={styles.insightCardLarge}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardTitleRow}>
                        <h3 className={dashboardStyles.spendingChartTitle}>Expense Pattern Detector</h3>
                    </div>
                    <span className={styles.monthlyBadge}>{currentMonthName}</span>
                </div>
                <div className={dashboardStyles.emptyStateContainer}>
                    <div className={dashboardStyles.emptyStateIcon}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B4FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
                            <path d="M18 17V9"/>
                            <path d="M13 17V5"/>
                            <path d="M8 17v-3"/>
                        </svg>
                    </div>
                    <h4 className={dashboardStyles.emptyStateTitle}>Almost There!</h4>
                    <p className={dashboardStyles.emptyStateMessage}>
                        You're off to a great start! Keep logging your expenses and we'll uncover your <span className={dashboardStyles.emptyStateHighlight}>spending patterns</span> in no time.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.insightCardLarge}>
            <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow}>
                    <h3 className={dashboardStyles.spendingChartTitle}>Expense Pattern Detector</h3>
                </div>
                <span className={styles.monthlyBadge}>{currentMonthName}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Top Repeating Merchants */}
                {topMerchants.length > 0 && (
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '16px'
                        }}>
                            <div style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: '#F59E0B'
                            }} />
                            <h4 style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#1a0b2e',
                                margin: 0
                            }}>
                                Your Most Frequent Expenses
                            </h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {topMerchants.map((merchant, idx) => (
                                <div key={idx} style={{
                                    padding: '12px 16px',
                                    backgroundColor: '#FAFAFA',
                                    borderRadius: '8px',
                                    border: '1px solid #f0f0f0'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                color: '#1a0b2e',
                                                marginBottom: '4px'
                                            }}>
                                                {merchant.merchant}
                                            </div>
                                            <div style={{
                                                fontSize: '12px',
                                                color: '#6b7280'
                                            }}>
                                                {merchant.count} transaction{merchant.count !== 1 ? 's' : ''} this month • {merchant.category}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{
                                                fontSize: '16px',
                                                fontWeight: 700,
                                                color: '#F59E0B'
                                            }}>
                                                ${merchant.monthlyTotal.toFixed(0)}
                                            </div>
                                            <div style={{
                                                fontSize: '11px',
                                                color: '#94a3b8'
                                            }}>
                                                ${merchant.yearlyProjection.toLocaleString()}/year
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Day of Week Spending Pattern */}
                {dayOfWeekPattern.length > 0 && highestSpendingDay && (
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '16px'
                        }}>
                            <div style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: '#8B5CF6'
                            }} />
                            <h4 style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#1a0b2e',
                                margin: 0
                            }}>
                                When You Spend Most
                            </h4>
                        </div>
                        <div style={{
                            padding: '16px',
                            backgroundColor: '#FAFAFA',
                            borderRadius: '8px',
                            border: '1px solid #f0f0f0'
                        }}>
                            <div style={{ marginBottom: '16px' }}>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>
                                    You spend <strong style={{ color: '#8B5CF6' }}>{highestSpendingDay.percentage}% more</strong> on{' '}
                                    <strong style={{ color: '#1a0b2e' }}>{highestSpendingDay.day}s</strong> — that's your highest spending day
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {dayOfWeekPattern.map((day, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            color: '#64748b',
                                            width: '70px',
                                            flexShrink: 0
                                        }}>
                                            {day.day}
                                        </span>
                                        <div style={{
                                            flex: 1,
                                            height: '24px',
                                            backgroundColor: '#E9D5FF',
                                            borderRadius: '4px',
                                            overflow: 'hidden',
                                            position: 'relative'
                                        }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${day.percentage}%`,
                                                backgroundColor: day.day === highestSpendingDay.day ? '#8B5CF6' : '#A78BFA',
                                                transition: 'width 0.3s ease'
                                            }} />
                                        </div>
                                        <span style={{
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            color: '#1a0b2e',
                                            width: '60px',
                                            textAlign: 'right',
                                            flexShrink: 0
                                        }}>
                                            ${day.spending.toFixed(0)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ExpensePatternDetector;
