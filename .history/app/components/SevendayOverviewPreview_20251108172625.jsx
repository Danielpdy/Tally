import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import React from 'react'

const SevendayOverviewPreview = ({ isAnimationActive = true }) => {
    const data = [
  {
    name: 'Monday',
    Income: 4000,
    Expenses: 2400,
  },
  {
    name: 'Tuesday',
    Income: 0,
    Expenses: 1398,
  },
  {
    name: 'Wednesday',
    Income: 20,
    Expenses: 9800,
  },
  {
    name: 'Thursday',
    Income: 0,
    Expenses: 3908,
  },
  {
    name: 'Friday',
    Income: 0,
    Expenses: 4800,
  },
  {
    name: 'Saturday',
    Income: 2390,
    Expenses: 3800,
  },
  {
    name: 'Sunday',
    Income: 3490,
    Expenses: 4300,
  },
];

  return (
   <BarChart style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }} responsive data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip />
    <Legend />
    <Bar dataKey="Income" fill="#38BDF8" isAnimationActive={isAnimationActive} />
    <Bar dataKey="Expenses" fill="#FF8042" isAnimationActive={isAnimationActive} />
  </BarChart>
  )
}

export default SevendayOverviewPreview
