"use client";
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './dashboard.module.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SpendingChart from '../SpendingChart';


const Dashboard = () => {
    const [cashFlowPeriod, setCashFlowPeriod] = useState('7days');

    const [totalBalance, setTotalBalance] = useState(0);
    const [monthlyEarnings, setMonthlyEarnings] = useState(0);
    const [monthlySpendings, setMonthlySpendings] = useState(0);

    

    const fetchSpendingChartData = () => {
        const data = await
    }

    const financialGoals = [
        { name: 'Emergency Fund', current: 8500, target: 10000, percentage: 85, due: 'Dec 2025', emoji: '💪' },
        { name: 'Vacation Fund', current: 3600, target: 5000, percentage: 72, due: 'Jul 2025', emoji: '✈️' },
        { name: 'New Car', current: 12000, target: 25000, percentage: 48, due: 'Dec 2026', emoji: '🚗' },
        { name: 'Home Deposit', current: 45000, target: 100000, percentage: 45, due: 'Dec 2027', emoji: '🏠' }
    ];

    

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
                        <h2 className={styles.statAmount}>${totalBalance}</h2>
                        <p className={styles.statSubtext}>Updated just now</p>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statLabel}>Monthly Flow</span>
                        </div>
                        <div className={styles.flowItems}>
                            <div className={styles.flowItem}>
                                <span className={styles.flowIcon}>↗</span>
                                <span className={styles.flowAmount}>${monthlyEarnings}</span>
                                <span className={styles.flowLabel}>Income</span>
                            </div>
                            <div className={styles.flowItem}>
                                <span className={styles.flowIcon} style={{ color: '#FF8042' }}>↙</span>
                                <span className={styles.flowAmount} style={{ color: '#FF8042' }}>${monthlySpendings}</span>
                                <span className={styles.flowLabel}>Expenses</span>
                            </div>
                        </div>
                        <p className={styles.monthlyChange}>+${} this month</p>
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
                        <SpendingChart />

                        {/* Cash Flow Timeline */}
                        <div className={styles.card}>
                            <div className={styles.cardHeaderRow}>
                                <h3 className={styles.cardTitle}>Cash Flow Timeline</h3>
                                <div className={styles.toggleButtons}>
                                    <button
                                        className={`${styles.toggleBtn} ${cashFlowPeriod === '7days' ? styles.active : ''}`}
                                        onClick={() => setCashFlowPeriod('7days')}
                                    >
                                        7 Days
                                    </button>
                                    <button
                                        className={`${styles.toggleBtn} ${cashFlowPeriod === '30days' ? styles.active : ''}`}
                                        onClick={() => setCashFlowPeriod('30days')}
                                    >
                                        30 Days
                                    </button>
                                </div>
                            </div>
                            <div className={styles.chartPlaceholder}>
                                <svg viewBox="0 0 800 200" className={styles.lineChart}>
                                    {/* Grid lines */}
                                    <line x1="0" y1="180" x2="800" y2="180" stroke="#E5E7EB" strokeWidth="1" />
                                    <line x1="0" y1="135" x2="800" y2="135" stroke="#E5E7EB" strokeWidth="1" />
                                    <line x1="0" y1="90" x2="800" y2="90" stroke="#E5E7EB" strokeWidth="1" />
                                    <line x1="0" y1="45" x2="800" y2="45" stroke="#E5E7EB" strokeWidth="1" />

                                    {/* Income line (blue) */}
                                    <path d="M 0 180 L 114 170 L 228 100 L 342 20 L 456 15 L 570 80 L 684 160 L 800 175"
                                          fill="none" stroke="#38BDF8" strokeWidth="3" />
                                    <path d="M 0 180 L 114 170 L 228 100 L 342 20 L 456 15 L 570 80 L 684 160 L 800 175 L 800 200 L 0 200 Z"
                                          fill="url(#blueGradient)" opacity="0.2" />

                                    {/* Expenses line (red) */}
                                    <path d="M 0 185 L 114 183 L 228 182 L 342 180 L 456 178 L 570 181 L 684 183 L 800 185"
                                          fill="none" stroke="#FF8042" strokeWidth="2" strokeDasharray="5,5" />

                                    <defs>
                                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className={styles.chartLabels}>
                                    <span>Mon</span>
                                    <span>Tue</span>
                                    <span>Wed</span>
                                    <span>Thu</span>
                                    <span>Fri</span>
                                    <span>Sat</span>
                                    <span>Sun</span>
                                </div>
                            </div>
                        </div>

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
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Safe to Spend</h3>
                            <div className={styles.safeToSpendCircle}>
                                <div className={styles.circularProgressWrapper}>
                                    <CircularProgressbar
                                        value={65}
                                        text={"test"}
                                        styles={buildStyles({
                                            pathColor: '#38BDF8',
                                            textColor: '#1F2937',
                                            trailColor: '#E5E7EB',
                                            textSize: '16px'
                                        })}
                                    />
                                </div>
                            </div>
                            <p className={styles.safeToSpendLabel}>Remaining Budget This Month</p>
                            <p className={styles.safeToSpendSubtext}>{}</p>
                        </div>

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
