"use client"

import React from 'react';
import { useEffect, useState } from 'react';
import styles from '../dashboard/dashboard.module.css';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const SpendingChart = () => {

    const [data, setData] = useState([
        {category: "Food 🍔", total: 25},
        { category: "Rent 🏠", total: 35 },
        { category: "Transport 🚗", total: 20 },
        { category: "Entertainment 🎬", total: 15 },
        { category: "Other 🌸", total: 5 },
    ]);

const COLORS = ["#FF8042", "#8A2BE2", "#00C49F", "#00CFFF", "#A9A9A9"];

  return (
    <div className={styles.chartCard}>
        <h3 className={styles.spendingChartTitle}>Where Your Money Went</h3>

        <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="total"
                        nameKey="category"
                        cx="50%"
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
                    <Legend content={renderLegend} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default SpendingChart
