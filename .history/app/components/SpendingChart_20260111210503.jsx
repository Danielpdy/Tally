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
            {!isPreview && content.length === 0 ? (
            
            ) : (
                
            )}
        </div>
    </div>
  )
}

export default SpendingChart
