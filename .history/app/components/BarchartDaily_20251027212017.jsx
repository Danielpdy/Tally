import React from 'react';
import { LineChart,
        CartesianGrid,
        XAxis,
        YAxis,
        Tooltip,
        Legend,
        Line,
        ResponsiveContainer
        } from 'recharts';

const BarchartDaily = () => {
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
            <Bar dataKey="Income" fill="" />
            <Bar dataKey="Expenses" fill="#82ca9d" />
        </BarChart>
    </div>
  )
}

export default BarchartDaily
