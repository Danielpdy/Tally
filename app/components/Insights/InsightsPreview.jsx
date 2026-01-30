"use client"

import React, { useState } from 'react';
import styles from './insightsPreview.module.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useRouter } from 'next/navigation';

const InsightsPreview = () => {
    const [hoveredSection, setHoveredSection] = useState(null);
    const router = useRouter();

    // Hardcoded sample data
    const healthScore = 78;
    const healthStatus = { text: 'Very Good Health', color: '#8B5CF6' };

    const savingsRate = { rate: 18, change: 2.4, isPositive: true };

    const upcomingBills = [
        { name: 'Electric Bill', amount: 145, dueIn: 2 },
        { name: 'Netflix', amount: 15.99, dueIn: 5 }
    ];

    const formattedGoals = [
        { name: 'Emergency Fund', current: 8000, target: 10000, percentage: 80 },
        { name: 'New Laptop', current: 900, target: 2000, percentage: 45 },
        { name: 'Vacation', current: 360, target: 3000, percentage: 12 }
    ];

    const handleGetStarted = () => {
        router.push("/LoginSignup");
    };

    const LockOverlay = ({ message }) => (
        <div className={styles.lockOverlay}>
            <div className={styles.lockContent}>
                <div className={styles.lockIconLarge}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                </div>
                <p className={styles.lockMessage}>{message}</p>
                <button onClick={handleGetStarted} className={styles.getStartedButton}>Get Started</button>
            </div>
        </div>
    );

    return (
        <div className={styles.pageWrapper}>
        <div className={styles.insightsPage}>
            {/* Health Score Card */}
            <div
                className={styles.lockedSection}
                onMouseEnter={() => setHoveredSection('health')}
                onMouseLeave={() => setHoveredSection(null)}
            >
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
                            Great job! Your financial habits are consistent. You've maintained a positive
                            cash flow for the last 3 months. Keep reducing unnecessary subscriptions
                            to reach the "Excellent" tier.
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
                {hoveredSection === 'health' && <LockOverlay message="Sign in to see your health score" />}
            </div>

            {/* Three Cards Row */}
            <div className={styles.cardsRow}>
                {/* Cash Flow Insights Card */}
                <div
                    className={styles.lockedSection}
                    onMouseEnter={() => setHoveredSection('cashflow')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
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
                            <span className={styles.dateBadge}>This Month</span>
                        </div>
                        <div className={styles.insightsList}>
                            <div className={styles.insightItem}>
                                <span className={styles.insightBullet} style={{ backgroundColor: '#10B981' }} />
                                <p className={styles.insightText}>
                                    You're earning <strong style={{ color: '#10B981' }}>$1,100 more</strong> than you spend — positive cash flow!
                                </p>
                            </div>
                            <div className={styles.insightItem}>
                                <span className={styles.insightBullet} style={{ backgroundColor: '#10B981' }} />
                                <p className={styles.insightText}>
                                    Your income is <strong style={{ color: '#10B981' }}>8% higher</strong> than last month.
                                </p>
                            </div>
                            <div className={styles.insightItem}>
                                <span className={styles.insightBullet} style={{ backgroundColor: '#FB923C' }} />
                                <p className={styles.insightText}>
                                    Expenses increased by <strong style={{ color: '#FB923C' }}>$240</strong> compared to October.
                                </p>
                            </div>
                        </div>
                        <p className={styles.insightSummary}>
                            Keep this pace and you'll save <span className={styles.highlightAmount}>$13,200</span> this year.
                        </p>
                    </div>
                    {hoveredSection === 'cashflow' && <LockOverlay message="Sign in to track cash flow" />}
                </div>

                {/* Bill Alerts Card */}
                <div
                    className={styles.lockedSection}
                    onMouseEnter={() => setHoveredSection('bills')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
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
                            <span className={styles.countBadge} style={{ backgroundColor: '#EF4444' }}>2</span>
                        </div>
                        <div className={styles.billsList}>
                            {upcomingBills.map((bill, idx) => (
                                <div key={idx} className={styles.billItem}>
                                    <div className={styles.billInfo}>
                                        <span className={styles.billDot} style={{ backgroundColor: bill.dueIn <= 2 ? '#EF4444' : '#FB923C' }} />
                                        <div>
                                            <span className={styles.billName}>{bill.name}</span>
                                            <span className={styles.billDue} style={{ color: bill.dueIn <= 2 ? '#EF4444' : '#FB923C' }}>
                                                {bill.dueIn <= 2 ? 'Overdue' : 'Due this week'}
                                            </span>
                                        </div>
                                    </div>
                                    <span className={styles.billAmount}>${bill.amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <button className={styles.linkBtn} disabled>View your recurring bills</button>
                    </div>
                    {hoveredSection === 'bills' && <LockOverlay message="Sign in to manage bills" />}
                </div>

                {/* Savings Rate Card */}
                <div
                    className={styles.lockedSection}
                    onMouseEnter={() => setHoveredSection('savings')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
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
                            <span className={styles.savingsRate}>{savingsRate.rate}%</span>
                            <span className={styles.savingsChange} style={{
                                backgroundColor: '#D1FAE5',
                                color: '#10B981'
                            }}>
                                ↗ +{savingsRate.change}% vs last month
                            </span>
                        </div>
                        <p className={styles.targetText}>Target rate: 20%. You are on track.</p>
                    </div>
                    {hoveredSection === 'savings' && <LockOverlay message="Sign in to track savings" />}
                </div>
            </div>

            {/* Two Cards Row */}
            <div className={styles.cardsRowTwo}>
                {/* Goal Progress Card */}
                <div
                    className={styles.lockedSection}
                    onMouseEnter={() => setHoveredSection('goals')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
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
                            {formattedGoals.map((goal, idx) => (
                                <div key={idx} className={styles.goalItem}>
                                    <div className={styles.goalHeader}>
                                        <span className={styles.goalName}>{goal.name}</span>
                                        <span className={styles.goalPercentage} style={{
                                            color: '#38BDF8'
                                        }}>{goal.percentage}%</span>
                                    </div>
                                    <div className={styles.goalProgressBar}>
                                        <div
                                            className={styles.goalProgressFill}
                                            style={{
                                                width: `${goal.percentage}%`,
                                                backgroundColor: '#38BDF8'
                                            }}
                                        />
                                    </div>
                                    <span className={styles.goalAmount}>
                                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button className={styles.linkBtn} disabled>View your Financial Goals</button>
                    </div>
                    {hoveredSection === 'goals' && <LockOverlay message="Sign in to track goals" />}
                </div>

                {/* Monthly Summary Card */}
                <div
                    className={styles.lockedSection}
                    onMouseEnter={() => setHoveredSection('summary')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
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
                            <span className={styles.monthlyBadge}>December</span>
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
                                        You earned <strong style={{ color: '#10B981' }}>$4,850</strong> this month from 4 income sources
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
                                        You spent <strong style={{ color: '#FB923C' }}>$3,720</strong> across 47 transactions this month
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
                                        You kept <strong style={{ color: '#1a0b2e' }}>$1,130</strong> — that's 23% of your income saved
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
                                        <strong style={{ color: '#EC4899' }}>2 bills</strong> due this week totaling <strong style={{ color: '#EC4899' }}>$160.99</strong>
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
                                        <strong style={{ color: '#8B5CF6' }}>Positive</strong> — you're earning <strong style={{ color: '#10B981' }}>$1,130 more</strong> than you spend
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.trendFooter}>
                            <span className={styles.avgSpend}>
                                You're saving $38 per day on average
                            </span>
                            <button className={styles.linkBtn} disabled>
                                View all transactions →
                            </button>
                        </div>
                    </div>
                    {hoveredSection === 'summary' && <LockOverlay message="Sign in to view your summary" />}
                </div>
            </div>
        </div>
        </div>
    );
};

export default InsightsPreview;
