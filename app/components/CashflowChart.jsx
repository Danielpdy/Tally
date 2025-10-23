import React from 'react';
import { LineChart, 
        CartesianGrid, 
        XAxis,
        YAxis,
        Tooltip,
        Legend,
        Line 
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
    <div>
        <LineChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Earnings" stroke="#8884d8" />
            <Line type="monotone" dataKey="Spendings" stroke="#82ca9d" />
        </LineChart>
    </div>
  )
}

export default cashflowChart