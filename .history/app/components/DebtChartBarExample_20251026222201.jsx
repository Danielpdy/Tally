import React from 'react';
<<<<<<< HEAD
import styles from '../dashboard/dashboard.module.css';
=======
>>>>>>> 122e5a2c7a9a5af1c33ce2aeca8034ac260885c2
import { BarChart,
        CartesianGrid,
        XAxis,
        YAxis,
        Tooltip,
        Legend,
        Bar } from 'recharts';

const DebtChartBarExample = () => {

    const data = [
        {
            "name": "Credit Card",
            "Paid So Far": "500",
            "Remaining": "2500"

        },
        {
            "name": "Card Loan",
            "Paid So Far": "3500",
            "Remaining": "8000"
        }
    ]

  return (
<<<<<<< HEAD
    <div className={styles.debtPayoffChartBox}>
        <h3 className={styles.debtPayoffTitle}>Debt Payoff Visualizer</h3>
        <div className='smallerText flex'>
            <p style={{color: "#8B4FFF", fontWeight: "500"}}>Estimated Debt-Free Date:</p>
            <p style={{fontWeight: "500"}}>March 2027</p>
        </div>
        <BarChart
            style={{ width: '100%', maxWidth: '700px', minHeight: "400px", aspectRatio: 1.618 }}
=======
    <div>
        <BarChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
>>>>>>> 122e5a2c7a9a5af1c33ce2aeca8034ac260885c2
            responsive data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Paid So Far" fill="#8A2BE2" />
            <Bar dataKey="Remaining" fill="#FF8042" />
        </BarChart>
    </div>
  )
}

export default DebtChartBarExample
