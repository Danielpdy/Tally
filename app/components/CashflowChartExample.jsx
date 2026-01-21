import React, { useMemo, useState } from 'react';
import styles from './dashboard/dashboardPreview.module.css';

import { LineChart,
        CartesianGrid,
        XAxis,
        YAxis,
        Tooltip,
        Legend,
        Line,
        ResponsiveContainer
        } from 'recharts';

const cashflowChart = ({ preview, content, recurringBills = [], paidBillIds = [] }) => {

    const isPreview = preview;
    const [earnings, setEarnings] = useState(0);
    const [spendings, setSpendings] = useState(0);
    const transactions = {
        name: "",
        Spendings: "",
        Earnings: "",
        Balance: ""
    };
    const previewData = [
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

    const getWeekRanges = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const weeks = [];
        let weekStart = new Date(firstDayOfMonth);
        let weekNumber = 1;

        while (weekStart <= lastDayOfMonth) {
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);

            const actualWeekEnd = weekEnd > lastDayOfMonth ? new Date(lastDayOfMonth) : weekEnd;

            weeks.push({
                name: `Week ${weekNumber}`,
                start: new Date(weekStart),
                end: new Date(actualWeekEnd)
            });

            weekStart.setDate(weekStart.getDate() + 7);
            weekNumber++;
        }

        return weeks;
    }

    const getWeeklyData = (transactions) => {
        if (!transactions || !Array.isArray(transactions)) {
            return [];
        }

        const weekRanges = getWeekRanges();

        return weekRanges.map(week => {
            let earnings = 0;
            let spendings = 0;

            transactions.forEach(transaction => {
                const [year, month, day] = transaction.date.split('-').map(Number);
                const transactionDate = new Date(year, month - 1, day);

                if (transactionDate >= week.start && transactionDate <= week.end) {
                    if (transaction.type === "Income") {
                        earnings += transaction.amount;
                    } else if (transaction.type === "Expense") {
                        spendings += transaction.amount;
                    }
                }
            });

            if (Array.isArray(recurringBills)) {
                recurringBills.forEach(bill => {
                    if (paidBillIds.includes(bill.id)) {
                        return;
                    }

                    const billDayOfMonth = bill.dayOfMonth;
                    const now = new Date();
                    const year = now.getFullYear();
                    const month = now.getMonth();

                    const billDate = new Date(year, month, billDayOfMonth);

                    if (billDate >= week.start && billDate <= week.end) {
                        spendings += bill.amount;
                    }
                });
            }

            const balance = earnings - spendings;

            return {
                name: week.name,
                Spendings: spendings,
                Earnings: earnings,
                Balance: balance
            };
        });
    }

    const weeklyData = useMemo(() => {
        return isPreview ? [] : getWeeklyData(content);
    }, [content, preview, recurringBills, paidBillIds]);

    const data = isPreview ? previewData : weeklyData;

    const monthlyBalance = useMemo(() => {
        if (!content || !Array.isArray(content)) {
            return 0;
        }

        const spendings = content.reduce((sum, transaction) => {
            return transaction.type === "Expense" ? transaction.amount + sum : sum;
        }, 0);
        setSpendings(spendings);

        const earnings = content.reduce((sum, transaction) => {
          return transaction.type === "Income" ? transaction.amount + sum : sum;
        }, 0);
        setEarnings(earnings);

        return earnings - spendings;
    }, [content]);

  return (
    <div className={styles.cashFlowChartDash}>
        <div className={styles.chartHeader}>
            <h3 className={styles.cashFlowTitle}>Cash Flow Timeline</h3>
            <span className={styles.monthlyBadge}>Monthly</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
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