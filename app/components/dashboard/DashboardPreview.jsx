"use client"

import React, { useState } from 'react';
import SpendingChart from '@app/components/SpendingChart';
import SafetoSpend from '@app/components/SafetoSpend';
import styles from './dashboard.module.css';
import previewStyles from './dashboardPreview.module.css';
import CashflowChart from '@app/components/CashflowChartExample';
import FinancialGoals from '@app/components/FinancialGoals';
import MonthlySummary from '@app/components/MonthlySummary';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DashboardPreview = () => {
    const [hoveredSection, setHoveredSection] = useState(null);
    const router = useRouter();

    // Hardcoded data
    const balance = 24322;
    const earnings = 5240;
    const spendings = 3890;

    const debts = [
        { name: 'Credit Card', paid: 500, remaining: 200, total: 700 },
        { name: 'Car Loan', paid: 4000, remaining: 3500, total: 7500 },
        { name: 'Student Loan', paid: 5000, remaining: 10000, total: 15000 }
    ];

    const achievements = [
        { icon: '🏆', title: '3 Months Under Budget', description: 'Stayed within budget for 3 consecutive months', active: true },
        { icon: '🔥', title: '7 Day Streak', description: 'Tracked expenses every day for a week', active: true },
        { icon: '🎯', title: 'First Goal Complete', description: 'Completed your first savings goal', active: true },
        { icon: '💰', title: 'Savings Master', description: 'Saved over $5,000 in total', active: false }
    ];

    const handleGetStarted = () => {
        router.push("/LoginSignup");
    };

    const LockOverlay = ({ message }) => (
        <div className={previewStyles.lockOverlay}>
            <div className={previewStyles.lockContent}>
                <div className={previewStyles.lockIconLarge}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                </div>
                <p className={previewStyles.lockMessage}>{message}</p>
                <button onClick={handleGetStarted} className={previewStyles.getStartedButton}>Get Started</button>
            </div>
        </div>
    );

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.dashboardPage}>
                {/* Top Stats Row */}
                <div
                    className={previewStyles.lockedSection}
                    onMouseEnter={() => setHoveredSection('stats')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
                    <div className={styles.topStatsRow}>
                        <div className={styles.statCard}>
                            <div className={styles.statHeader}>
                                <span className={styles.statLabel}>Total Balance</span>
                                <div className={styles.statDot}></div>
                            </div>
                            <h2 className={styles.statAmount}>${balance.toLocaleString()}</h2>
                            <p className={styles.statSubtext}>Updated just now</p>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statHeader}>
                                <span className={styles.statLabel}>Monthly Flow</span>
                            </div>
                            <div className={styles.flowItems}>
                                <div className={styles.flowItem}>
                                    <span className={styles.flowIcon}>↗</span>
                                    <span className={styles.flowAmount}>${earnings.toLocaleString()}</span>
                                    <span className={styles.flowLabel}>Income</span>
                                </div>
                                <div className={styles.flowItem}>
                                    <span className={styles.flowIcon} style={{ color: '#FF8042' }}>↙</span>
                                    <span className={styles.flowAmount} style={{ color: '#FF8042' }}>${spendings.toLocaleString()}</span>
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
                    {hoveredSection === 'stats' && <LockOverlay message="Sign in to see your balance" />}
                </div>

                {/* Main Content Grid */}
                <div className={styles.mainGrid}>
                    {/* Left Column */}
                    <div className={styles.leftColumn}>
                        {/* Where Your Money Went */}
                        <div
                            className={previewStyles.lockedSection}
                            onMouseEnter={() => setHoveredSection('spending')}
                            onMouseLeave={() => setHoveredSection(null)}
                        >
                            <SpendingChart preview={true} content={[]} recurringBillsDueThisWeek={[]} recurringBillsOverdueThisWeek={[]}/>
                            {hoveredSection === 'spending' && <LockOverlay message="Sign in to track spending" />}
                        </div>

                        {/* Cash Flow Timeline */}
                        <div
                            className={previewStyles.lockedSection}
                            onMouseEnter={() => setHoveredSection('cashflow')}
                            onMouseLeave={() => setHoveredSection(null)}
                        >
                            <CashflowChart preview={true} content={[]} recurringBills={[]} paidBillIds={[]} />
                            {hoveredSection === 'cashflow' && <LockOverlay message="Sign in to view cash flow" />}
                        </div>

                        {/* Debt Payoff Visualizer */}
                        <div
                            className={previewStyles.lockedSection}
                            onMouseEnter={() => setHoveredSection('debt')}
                            onMouseLeave={() => setHoveredSection(null)}
                        >
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
                            {hoveredSection === 'debt' && <LockOverlay message="Sign in to track debt" />}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.rightColumn}>
                        {/* Safe to Spend */}
                        <div
                            className={previewStyles.lockedSection}
                            onMouseEnter={() => setHoveredSection('safe')}
                            onMouseLeave={() => setHoveredSection(null)}
                        >
                            <SafetoSpend preview={true} content={[]} recurringBillsDueThisWeek={[]} recurringBillsOverdueThisWeek={[]} />
                            {hoveredSection === 'safe' && <LockOverlay message="Sign in to see safe to spend" />}
                        </div>

                        {/* Financial Goals */}
                        <div
                            className={previewStyles.lockedSection}
                            onMouseEnter={() => setHoveredSection('goals')}
                            onMouseLeave={() => setHoveredSection(null)}
                        >
                            <FinancialGoals preview={true} goals={[]} />
                            {hoveredSection === 'goals' && <LockOverlay message="Sign in to track goals" />}
                        </div>

                        {/* Monthly Summary */}
                        <div
                            className={previewStyles.lockedSection}
                            onMouseEnter={() => setHoveredSection('insights')}
                            onMouseLeave={() => setHoveredSection(null)}
                        >
                            <MonthlySummary preview={true} />
                            {hoveredSection === 'insights' && <LockOverlay message="Sign in to view your monthly summary" />}
                        </div>
                    </div>
                </div>

                {/* Achievements & Streaks */}
                <div
                    className={previewStyles.lockedSection}
                    onMouseEnter={() => setHoveredSection('achievements')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
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
                    {hoveredSection === 'achievements' && <LockOverlay message="Sign in to earn achievements" />}
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

export default DashboardPreview;
