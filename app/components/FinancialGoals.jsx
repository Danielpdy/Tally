"use client"

import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './dashboard/dashboard.module.css';

const FinancialGoals = ({ preview = false, goals = [] }) => {
    const isPreview = preview;

    const dataPreview = [
        { name: 'Emergency Fund', current: 8500, target: 10000, percentage: 85, due: 'Dec 2025', emoji: '💪' },
        { name: 'Vacation Fund', current: 3600, target: 5000, percentage: 72, due: 'Jul 2025', emoji: '✈️' },
        { name: 'New Car', current: 12000, target: 25000, percentage: 48, due: 'Dec 2026', emoji: '🚗' },
        { name: 'Home Deposit', current: 45000, target: 100000, percentage: 45, due: 'Dec 2027', emoji: '🏠' }
    ];

    const displayData = isPreview ? dataPreview : goals;

    if (!isPreview && displayData.length === 0) {
        return (
            <div className={styles.card}>
                <div className={styles.cardHeaderRow}>
                    <h3 className={styles.cardTitle}>Financial Goals</h3>
                    <button className={styles.addGoalBtn}>+ Add Goal</button>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 20px',
                    gap: '12px'
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B4FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2"/>
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
                        lineHeight: 1.5,
                        margin: 0
                    }}>
                        Set your first financial goal and start tracking your progress toward <span style={{color: '#8B4FFF', fontWeight: 600}}>financial freedom</span>!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardHeaderRow}>
                <h3 className={styles.cardTitle}>Financial Goals</h3>
                {!isPreview && <button className={styles.addGoalBtn}>+ Add Goal</button>}
            </div>
            <div className={styles.goalsGrid}>
                {displayData.map((goal, idx) => (
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
                        <p className={styles.goalAmount}>
                            ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                        </p>
                        <p className={styles.goalDue}>Due {goal.due}</p>
                        <p className={styles.goalEncouragement}>Keep going! {goal.emoji}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FinancialGoals;
