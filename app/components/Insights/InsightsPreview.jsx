"use client"

import React, { useState } from 'react';
import styles from './insightsPreview.module.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from "recharts";
import { useRouter } from 'next/navigation';

const InsightsPreview = () => {
    const [hoveredSection, setHoveredSection] = useState(null);
    const router = useRouter();

    // Hardcoded sample data
    const healthScore = 78;
    const healthStatus = { text: 'Very Good Health', tier: 'Top 35%', color: '#8B5CF6' };

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

    const trendData = [
        { month: 'Aug', amount: 2200 },
        { month: 'Sep', amount: 2400 },
        { month: 'Oct', amount: 2100 },
        { month: 'Nov', amount: 2800 },
        { month: 'Dec', amount: 2450 }
    ];

    const avgMonthlySpend = 2450;

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
            {/* Header */}
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Financial Insights</h1>
                <p className={styles.pageSubtitle}>Your monthly financial health overview and alerts.</p>
            </div>

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
                            <span className={styles.tierBadge} style={{ backgroundColor: `${healthStatus.color}20`, color: healthStatus.color }}>
                                {healthStatus.tier}
                            </span>
                        </div>
                        <p className={styles.healthDescription}>
                            Great job! Your financial habits are consistent. You've maintained a positive
                            cash flow for the last 3 months. Keep reducing unnecessary subscriptions
                            to reach the "Excellent" tier.
                        </p>
                        <div className={styles.healthActions}>
                            <button className={styles.primaryBtn} disabled>View Detailed Report</button>
                            <button className={styles.secondaryBtn} disabled>See History</button>
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
                                <span className={styles.insightBullet} style={{ backgroundColor: '#00C49F' }} />
                                <p className={styles.insightText}>
                                    You're earning <strong style={{ color: '#00C49F' }}>$1,100 more</strong> than you spend — positive cash flow!
                                </p>
                            </div>
                            <div className={styles.insightItem}>
                                <span className={styles.insightBullet} style={{ backgroundColor: '#00C49F' }} />
                                <p className={styles.insightText}>
                                    Your income is <strong style={{ color: '#00C49F' }}>8% higher</strong> than last month.
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
                                <span className={styles.cardIcon} style={{ backgroundColor: '#FEF3C7' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                                    </svg>
                                </span>
                                <h3 className={styles.cardTitle}>Bill Alerts</h3>
                            </div>
                            <span className={styles.countBadge}>2</span>
                        </div>
                        <div className={styles.billsList}>
                            {upcomingBills.map((bill, idx) => (
                                <div key={idx} className={styles.billItem}>
                                    <div className={styles.billInfo}>
                                        <span className={styles.billDot} style={{ backgroundColor: bill.dueIn <= 2 ? '#EC4899' : '#FB923C' }} />
                                        <div>
                                            <span className={styles.billName}>{bill.name}</span>
                                            <span className={styles.billDue} style={{ color: bill.dueIn <= 2 ? '#EC4899' : '#FB923C' }}>
                                                Due in {bill.dueIn} days
                                            </span>
                                        </div>
                                    </div>
                                    <span className={styles.billAmount}>${bill.amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <button className={styles.linkBtn} disabled>View all upcoming</button>
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
                                <span className={styles.cardIcon} style={{ backgroundColor: '#D1FAE5' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C49F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/>
                                        <path d="M2 9v1c0 1.1.9 2 2 2h1"/>
                                        <path d="M16 11h.01"/>
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
                                color: '#00C49F'
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
                                <span className={styles.cardIcon} style={{ backgroundColor: '#FEE2E2' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                                        <line x1="4" y1="22" x2="4" y2="15"/>
                                    </svg>
                                </span>
                                <h3 className={styles.cardTitle}>Goal Progress</h3>
                            </div>
                            <button className={styles.addBtn} disabled>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 8v8"/>
                                    <path d="M8 12h8"/>
                                </svg>
                            </button>
                        </div>
                        <div className={styles.goalsList}>
                            {formattedGoals.map((goal, idx) => (
                                <div key={idx} className={styles.goalItem}>
                                    <div className={styles.goalHeader}>
                                        <span className={styles.goalName}>{goal.name}</span>
                                        <span className={styles.goalPercentage} style={{
                                            color: goal.percentage >= 75 ? '#00C49F' : goal.percentage >= 40 ? '#8B5CF6' : '#64748b'
                                        }}>{goal.percentage}%</span>
                                    </div>
                                    <div className={styles.goalProgressBar}>
                                        <div
                                            className={styles.goalProgressFill}
                                            style={{
                                                width: `${goal.percentage}%`,
                                                backgroundColor: goal.percentage >= 75 ? '#00C49F' : '#8B5CF6'
                                            }}
                                        />
                                    </div>
                                    <span className={styles.goalAmount}>
                                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {hoveredSection === 'goals' && <LockOverlay message="Sign in to track goals" />}
                </div>

                {/* Spending Trend Card */}
                <div
                    className={styles.lockedSection}
                    onMouseEnter={() => setHoveredSection('trend')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
                    <div className={styles.insightCardLarge}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleRow}>
                                <span className={styles.cardIcon} style={{ backgroundColor: '#EEF2FF' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 3v18h18"/>
                                        <path d="M18 17V9"/>
                                        <path d="M13 17V5"/>
                                        <path d="M8 17v-3"/>
                                    </svg>
                                </span>
                                <h3 className={styles.cardTitle}>Spending Trend (MoM)</h3>
                            </div>
                            <span className={styles.monthlyBadge}>Monthly</span>
                        </div>
                        <div className={styles.chartContainer}>
                            <ResponsiveContainer width="100%" height={180}>
                                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`$${value.toLocaleString()}`, 'Spending']}
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #E9D5FF',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="#8B5CF6"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorAmount)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className={styles.trendFooter}>
                            <span className={styles.avgSpend}>Average monthly spend: <strong>${avgMonthlySpend.toLocaleString()}</strong></span>
                            <span className={styles.trendChange} style={{ color: '#EC4899' }}>
                                ↗ 12% higher than avg
                            </span>
                        </div>
                    </div>
                    {hoveredSection === 'trend' && <LockOverlay message="Sign in to view trends" />}
                </div>
            </div>
        </div>
        </div>
    );
};

export default InsightsPreview;
