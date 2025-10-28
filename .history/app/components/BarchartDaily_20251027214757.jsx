import React, { useState } from 'react';
import { LineChart,
        CartesianGrid,
        XAxis,
        YAxis,
        Tooltip,
        Legend,
        Line,
        ResponsiveContainer
        } from 'recharts';

const BarchartDaily = (week = [], dailyIncome) => {

    const [ dailyTransaction, setDailyTransaction ] = useState([
        {
            name: week.day,
            income: week.
        }
    ]);
    const [ ]

    data = [
        {
            "name": dailyTransaction.day
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
            <Bar dataKey="Income" fill="#8B4FFF" />
            <Bar dataKey="Expenses" fill="#FF8042" />
        </BarChart>
    </div>
  )
}

export default BarchartDaily
