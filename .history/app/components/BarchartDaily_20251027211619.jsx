import React from 'react'

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
  <Bar dataKey="pv" fill="#8884d8" />
  <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
    </div>
  )
}

export default BarchartDaily
