import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import React from 'react'

const SevendayOverview = ({ isAnimationActive = true, data }) => {

   if (!data || data.length === 0) {
    return <div>Loading data...</div>
  }

  const transformedData = data?.map(item => ({
    name: item.name,
    Earnings: item.Earnings,
    Spendings: item.Spendings,
  })) || [];

  return (
   <BarChart style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }} responsive data={transformedData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip />
    <Legend />
    <Bar dataKey="Earnings" fill="#38BDF8" isAnimationActive={isAnimationActive} />
    <Bar dataKey="Spendings" fill="#FF8042" isAnimationActive={isAnimationActive} />
  </BarChart>
  )
}

export default SevendayOverview