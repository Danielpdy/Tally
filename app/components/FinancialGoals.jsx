"use client"

import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AddFinancialGoal, GetFinancialGoals, DeleteFinantialGoal, UpdateFinancialGoal } from '@services/FinantialGoalService';
import { useSession } from '@node_modules/next-auth/react';
import AddGoalModal from './AddGoalModal';
import UpdateGoalModal from './UpdateGoalModal';
import styles from './dashboard/dashboard.module.css';

const FinancialGoals = ({ preview = false, goals = [] }) => {
    const isPreview = preview;
    const { data: session } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [financialGoals, setFinancialGoals] = useState(goals);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isPreview && session?.accessToken) {
            fetchGoals();
        }
    }, [session?.accessToken, isPreview]);

    const fetchGoals = async () => {
        try {
            const data = await GetFinancialGoals(session.accessToken);
            setFinancialGoals(data || []);
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
    };

    const handleAddGoal = async (goalData) => {
        try {
            setIsLoading(true);
            await AddFinancialGoal(goalData, session.accessToken);
            await fetchGoals();
        } catch (error) {
            console.error('Error adding goal:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateGoal = async (goalId, goalData) => {
        try {
            setIsLoading(true);
            await UpdateFinancialGoal(goalId, goalData, session.accessToken);
            await fetchGoals();
        } catch (error) {
            console.error('Error updating goal:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteGoal = async (goalId) => {
        try {
            setIsLoading(true);
            await DeleteFinantialGoal(goalId, session.accessToken);
            await fetchGoals();
        } catch (error) {
            console.error('Error deleting goal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const openUpdateModal = (goal) => {
        setSelectedGoal(goal);
        setIsUpdateModalOpen(true);
    };

    const dataPreview = [
        { name: 'Emergency Fund', current: 8500, target: 10000, percentage: 85, due: 'Dec 2025', emoji: '💪' },
        { name: 'Vacation Fund', current: 3600, target: 5000, percentage: 72, due: 'Jul 2025', emoji: '✈️' },
        { name: 'New Car', current: 12000, target: 25000, percentage: 48, due: 'Dec 2026', emoji: '🚗' },
        { name: 'Home Deposit', current: 45000, target: 100000, percentage: 45, due: 'Dec 2027', emoji: '🏠' }
    ];

    // Format goals from API to match display format
    const formatGoals = (apiGoals) => {
        return apiGoals.map(goal => {
            const percentage = goal.targetAmount > 0
                ? Math.round((goal.currentAmount / goal.targetAmount) * 100)
                : 0;

            const dueDate = new Date(goal.dueDate);
            const formattedDue = dueDate.toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            });

            return {
                id: goal.id,
                name: goal.name,
                current: goal.currentAmount,
                target: goal.targetAmount,
                percentage: percentage,
                due: formattedDue,
                dueDate: goal.dueDate,
                emoji: getGoalEmoji(goal.name)
            };
        });
    };

    // Get emoji based on goal name
    const getGoalEmoji = (goalName) => {
        const name = goalName.toLowerCase();
        if (name.includes('emergency') || name.includes('fund')) return '💪';
        if (name.includes('vacation') || name.includes('travel')) return '✈️';
        if (name.includes('car') || name.includes('vehicle')) return '🚗';
        if (name.includes('home') || name.includes('house')) return '🏠';
        if (name.includes('wedding')) return '💒';
        if (name.includes('education') || name.includes('school')) return '🎓';
        return '🎯';
    };

    const displayData = isPreview ? dataPreview : formatGoals(financialGoals);

    if (!isPreview && displayData.length === 0) {
        return (
            <>
                <div className={styles.card}>
                    <div className={styles.cardHeaderRow}>
                        <h3 className={styles.cardTitle}>Financial Goals</h3>
                        <button className={styles.addGoalBtn} onClick={() => setIsModalOpen(true)}>+ Add Goal</button>
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

                <AddGoalModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddGoal}
                />
            </>
        );
    }

    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardHeaderRow}>
                    <h3 className={styles.cardTitle}>Financial Goals</h3>
                    {!isPreview && <button className={styles.addGoalBtn} onClick={() => setIsModalOpen(true)}>+ Add Goal</button>}
                </div>
                <div className={styles.goalsGrid}>
                    {displayData.map((goal, idx) => (
                        <div key={goal.id || idx} className={styles.goalCard}>
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
                            <p className={styles.goalEncouragement}>
                                {goal.percentage >= 100 ? `Congrats! Goal achieved! 🎉` : `Keep going! ${goal.emoji}`}
                            </p>

                            {!isPreview && (
                                <div className={styles.goalActions}>
                                    <button className={styles.goalUpdateBtn} onClick={() => openUpdateModal(goal)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                        Update
                                    </button>
                                    <button className={styles.goalDeleteBtn} onClick={() => handleDeleteGoal(goal.id)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"/>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                            <line x1="10" y1="11" x2="10" y2="17"/>
                                            <line x1="14" y1="11" x2="14" y2="17"/>
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {!isPreview && (
                <>
                    <AddGoalModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleAddGoal}
                    />
                    <UpdateGoalModal
                        isOpen={isUpdateModalOpen}
                        onClose={() => setIsUpdateModalOpen(false)}
                        onSubmit={handleUpdateGoal}
                        goalData={selectedGoal}
                    />
                </>
            )}
        </>
    );
};

export default FinancialGoals;
