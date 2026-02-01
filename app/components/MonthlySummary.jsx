"use client"

import React from 'react';
import styles from './Insights/insightsPreview.module.css';

const MonthlySummary = ({
    preview = false,
    monthlyData,
    billsOverdue = [],
    billsDueThisWeek = [],
    onViewTransactions,
    hasTransactions = true
}) => {
    // Hardcoded preview data
    const previewData = {
        current: {
            income: 4200,
            expenses: 2850,
            savings: 1350,
            savingsRate: 32.1,
            transactionCount: 24,
            incomeSourceCount: 2
        },
        previous: {
            income: 3800,
            expenses: 2900,
            savings: 900,
            savingsRate: 23.7,
            transactionCount: 28,
            incomeSourceCount: 2
        },
        savingsChange: 8.4,
        incomeChange: 10.5,
        expensesChange: -1.7,
        currentMonthName: new Date().toLocaleString('default', { month: 'long' }),
        lastMonthName: new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long' })
    };

    const previewBillsDueThisWeek = [
        { id: 1, amount: 150 },
        { id: 2, amount: 45 }
    ];

    // Use preview data if in preview mode, otherwise use actual data
    const data = preview ? previewData : monthlyData;
    const { current, previous, savingsChange, incomeChange, expensesChange, currentMonthName, lastMonthName } = data;
    const displayBillsOverdue = preview ? [] : billsOverdue;
    const displayBillsDueThisWeek = preview ? previewBillsDueThisWeek : billsDueThisWeek;

    // Empty state when no transactions
    if (!hasTransactions) {
        return (
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
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '60px 20px',
                    gap: '12px',
                    minHeight: '300px'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #e4d8fc 0%, #F5F3FF 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '4px'
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                        </svg>
                    </div>
                    <h4 style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#1a0b2e',
                        margin: 0
                    }}>No Data Yet</h4>
                    <p style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        textAlign: 'center',
                        maxWidth: '320px',
                        lineHeight: '1.5',
                        margin: 0
                    }}>
                        Start adding transactions to see your monthly income, expenses, and detailed financial summary
                    </p>
                </div>
            </div>
        );
    }

    return (
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
                <span className={styles.monthlyBadge}>{currentMonthName}</span>
            </div>

            <>
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
                                You earned <strong style={{ color: '#10B981' }}>${current.income.toLocaleString()}</strong> this month from {current.incomeSourceCount} income source{current.incomeSourceCount !== 1 ? 's' : ''}
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
                                You spent <strong style={{ color: '#FB923C' }}>${current.expenses.toLocaleString()}</strong> across {current.transactionCount} transaction{current.transactionCount !== 1 ? 's' : ''} this month
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
                                {current.savings >= 0 ? (
                                    <>You kept <strong style={{ color: '#1a0b2e' }}>${current.savings.toLocaleString()}</strong> — that's {current.savingsRate.toFixed(0)}% of your income saved</>
                                ) : (
                                    <>You overspent by <strong style={{ color: '#EF4444' }}>${Math.abs(current.savings).toLocaleString()}</strong> this month</>
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
                                {displayBillsOverdue.length > 0 ? (
                                    <><strong style={{ color: '#EC4899' }}>{displayBillsOverdue.length} bill{displayBillsOverdue.length !== 1 ? 's' : ''}</strong> overdue — pay now to avoid fees</>
                                ) : displayBillsDueThisWeek.length > 0 ? (
                                    <><strong style={{ color: '#EC4899' }}>{displayBillsDueThisWeek.length} bill{displayBillsDueThisWeek.length !== 1 ? 's' : ''}</strong> due this week totaling <strong style={{ color: '#EC4899' }}>${displayBillsDueThisWeek.reduce((sum, b) => sum + (b.amount || 0), 0).toFixed(2)}</strong></>
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
                                {current.savings >= 0 ? (
                                    <><strong style={{ color: '#8B5CF6' }}>Positive</strong> — you're earning <strong style={{ color: '#10B981' }}>${current.savings.toLocaleString()} more</strong> than you spend</>
                                ) : (
                                    <><strong style={{ color: '#EF4444' }}>Negative</strong> — you're spending <strong style={{ color: '#EF4444' }}>${Math.abs(current.savings).toLocaleString()} more</strong> than you earn</>
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.trendFooter}>
                    <span className={styles.avgSpend}>
                        {current.savings >= 0
                            ? `You're saving $${(current.savings / 30).toFixed(0)} per day on average`
                            : `You're overspending by $${(Math.abs(current.savings) / 30).toFixed(0)} per day`}
                    </span>
                    {onViewTransactions && (
                        <button className={styles.linkBtn} onClick={onViewTransactions}>
                            View all transactions →
                        </button>
                    )}
                </div>
            </>
        </div>
    );
};

export default MonthlySummary;
