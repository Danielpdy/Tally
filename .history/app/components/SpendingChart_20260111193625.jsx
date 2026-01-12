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

const SpendingChart = () => {
    const [isPreview, setIsPreview] = useState(true);
    cons

    if (preview){

    }


    const COLORS = ["#FF8042", "#8A2BE2", "#00C49F", "#00CFFF", "#A9A9A9", "#7DD87D"];

  return (
    <div className={styles.chartCard}>
        <h3 className={styles.spendingChartTitle}>Where Your Money Went</h3>

        <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                        data={data}
                        dataKey="total"
                        nameKey="category"
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
        </div>
    </div>
  )
}

export default SpendingChart
