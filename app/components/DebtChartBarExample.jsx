import React from 'react';
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
    <div>
        <BarChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
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
