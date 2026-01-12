"use client"

import React from 'react';
import { useEffect, useState } from 'react';
import styles from './dashboard/dashboardPreview.module.css';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const SpendingChart = ({ preview, content = []}) => {

    const [isPreview, setIsPreview] = useState(preview);
    
    const previewData = [
            { type: "Income", amount: 25},
            { type: "Expense", amount: 35 },
            { type: "Transfer", amount: 20 },
            { type: "Loan", amount: 15 },
            { type: "Savings", amount: 5 },
            { type: "Goal", amount: 5}
    ];

    const data = isPreview ? previewData : content;


    const COLORS = ["#FF8042", "#8A2BE2", "#00C49F", "#00CFFF", "#A9A9A9", "#7DD87D"];

  return (
    <div className={styles.chartCard}>
        <h3 className={styles.spendingChartTitle}>Where Your Money Went</h3>

        <div className={styles.chartWrap}>
            {!isPreview && content.length === 0 (
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
                        {data.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
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
            ) }
        </div>
    </div>
  )
}

export default SpendingChart
