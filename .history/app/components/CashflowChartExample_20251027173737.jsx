import React from 'react';
import styles from '../dashboard/dashboard.module.css';

import { LineChart,
        CartesianGrid,
        XAxis,
        YAxis,
        Tooltip,
        Legend,
        Line,
        ResponsiveContainer
        } from 'recharts';

const cashflowChart = () => {

    const data = [
        {
            name: "Week One",
            Spendings: 3034,
            Earnings: 2342,
            Balance: 4000
        },
        {
            name: "Week Two",
            Spendings: 2344,
            Earnings: 4342,
            Balance: 6000
        },
        {
            name: "Week Three",
            Spendings: 3034,
            Earnings: 2242,
            Balance: 4300
        },
        {
            name: "Week Four",
            Spendings: 3534,
            Earnings: 4342,
            Balance: 1250
        }
    ];

  return (
    <div className={styles.cashFlowChartDash}>
        <h3 className={styles.cashFlowTitle}>Cash Flow Timeline</h3>
        <ResponsiveContainer width="100%" height="100">
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Earnings" stroke="#8A2BE2" strokeWidth={4} />
                <Line type="monotone" dataKey="Spendings" stroke="#FF8042" strokeWidth={4} />
                <Line type="monotone" dataKey="Balance" stroke="#00D4FF" strokeWidth={4} />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default cashflowChart