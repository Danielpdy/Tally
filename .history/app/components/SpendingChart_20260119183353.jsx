"use client"

import React, { useMemo, useState } from 'react';
import styles from './dashboard/dashboardPreview.module.css';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { GetBillsDueThisWeek } from '@services/RecurringBillsService';
import { type } from 'os';

const SpendingChart = ({ preview, content = [], recurringBillsDueThisWeek = [], recurringBillsOverdueThisWeek = []}) => {

    const isPreview = preview;

    const previewData = [
            { type: "Income", amount: 25},
            { type: "Expense", amount: 35 },
            { type: "Transfer", amount: 20 },
            { type: "Loan", amount: 15 },
            { type: "Savings", amount: 5 },
            { type: "Goal", amount: 5}
    ];

    
    const getWeekRange = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();

      const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - daysFromMonday);
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      return { weekStart, weekEnd };
    };

    const currentWeekData = useMemo(() => {
      const { weekStart, weekEnd } = getWeekRange();

      const weekTransactions = content.filter((transaction) => {
        const [year, month, day] = transaction.date.split('-').map(Number);
        const transactionDate = new Date(year, month - 1, day);
        return transactionDate >= weekStart && transactionDate <= weekEnd;
      });

      // Convert unpaid bills to transaction format
      const dueBillTransactions = useMemo(() => {
      recurringBillsDueThisWeek.map((bill) => ({
        type: "Expense",
        amount: bill.amount,
        description: bill.name,
        date: bill.dueDate,
        category: "recurring bill due"
      }));
      }, []);
      weekTransactions.push(dueBillTransactions);

      const overdueBillTransactions = recurringBillsOverdueThisWeek.map((bill) => ({
        type: "Expense",
        amount: bill.amount,
        description: bill.name,
        date: bill.dueDate,
        category: "recurring bill overdue"
      }))
      weekTransactions.push(overdueBillTransactions);

      return [...weekTransactions];

    }, [content, recurringBillsDueThisWeek, recurringBillsOverdueThisWeek]);

    const groupedData = isPreview
      ? previewData
      : currentWeekData.reduce((acc, transaction) => {
          const existingType = acc.find(
            (item) => item.type === transaction.type
          );
          if (existingType) {
            existingType.amount += transaction.amount;
          } else {
            acc.push({ type: transaction.type, amount: transaction.amount });
          }
          return acc;
        }, []);

    const data = groupedData;

    const TYPE_COLORS = {
        "Income": "#00CFFF",
        "Expense": "#FF8042",
        "Transfer": "#8A2BE2",
        "Loan": "#00C49F",
        "Savings": "#7DD87D",
        "Goal": "#FFD700"
    };

    const getColorForType = (type) => {
        return TYPE_COLORS[type] || "#A9A9A9";
    };

  return (
    <div className={styles.chartCard}>
        <h3 className={styles.spendingChartTitle}>Where Your Money Went</h3>

        <div className={styles.chartWrap}>
            {!isPreview && content.length === 0 ? (
                <div className={styles.emptyStateContainer}>
                    <div className={styles.emptyStateIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B4FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
                            <path d="M18 17V9"/>
                            <path d="M13 17V5"/>
                            <path d="M8 17v-3"/>
                        </svg>
                    </div>
                    <h4 className={styles.emptyStateTitle}>No Transactions Yet</h4>
                    <p className={styles.emptyStateMessage}>
                        Start tracking your finances by adding your first transaction.
                        Watch your <span className={styles.emptyStateHighlight}>money flow</span> come to life!
                    </p>
                </div>
            ) : !isPreview && currentWeekData.length === 0 ? (
                <div className={styles.emptyStateContainer}>
                    <div className={styles.emptyStateIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B4FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 2v4"/>
                            <path d="M16 2v4"/>
                            <rect width="18" height="18" x="3" y="4" rx="2"/>
                            <path d="M3 10h18"/>
                        </svg>
                    </div>
                    <h4 className={styles.emptyStateTitle}>No Transactions This Week</h4>
                    <p className={styles.emptyStateMessage}>
                        You haven't made any transactions this week yet. Add one to see your <span className={styles.emptyStateHighlight}>weekly spending</span> breakdown here!
                    </p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="type"
                        cx="35%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={5}
                    >
                        {data.map((entry, i) => (
                            <Cell key={i} fill={getColorForType(entry.type)} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        iconType="circle"
                    />
                </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    </div>
  )
}

export default SpendingChart
