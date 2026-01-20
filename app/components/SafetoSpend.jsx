import React, { useMemo } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import styles from './dashboard/dashboardPreview.module.css';


const SafetoSpend = ({ preview = false, content = [], recurringBills = [] }) => {

    const getWeekRange = () => {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - daysFromMonday);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        return { weekStart, weekEnd };
    };

    const calculateSafeToSpend = useMemo(() => {
        if (preview) {
            return { amount: 1350, percentage: 72, hasTransactions: true };
        }

        const { weekStart, weekEnd } = getWeekRange();

        // Filter transactions for current week
        const weekTransactions = content.filter((transaction) => {
            const [year, month, day] = transaction.date.split('-').map(Number);
            const transactionDate = new Date(year, month - 1, day);
            return transactionDate >= weekStart && transactionDate <= weekEnd;
        });

        if (weekTransactions.length === 0) {
            return { amount: 0, percentage: 0, hasTransactions: false };
        }

        // Calculate weekly income and expenses
        const weeklyIncome = weekTransactions.reduce((sum, t) =>
            t.type === "Income" ? sum + t.amount : sum, 0
        );

        const weeklyExpenses = weekTransactions.reduce((sum, t) =>
            t.type === "Expense" ? sum + t.amount : sum, 0
        );

        // Calculate upcoming bills for this week
        const upcomingBills = recurringBills.reduce((sum, bill) => {
            if (!bill.dueDate) {
                return sum;
            }
            const [year, month, day] = bill.dueDate.split('-').map(Number);
            const billDate = new Date(year, month - 1, day);
            if (billDate >= weekStart && billDate <= weekEnd) {
                return sum + bill.amount;
            }
            return sum;
        }, 0);

        // Safe to spend = Income - Expenses - Upcoming bills
        const safeAmount = weeklyIncome - weeklyExpenses - upcomingBills;

        // Calculate percentage (based on income available)
        const percentage = weeklyIncome > 0
            ? Math.min(Math.max((safeAmount / weeklyIncome) * 100, 0), 100)
            : 0;

        return {
            amount: Math.max(safeAmount, 0),
            percentage: Math.round(percentage),
            hasTransactions: true,
            weeklyIncome,
            weeklyExpenses,
            upcomingBills
        };
    }, [content, recurringBills, preview]);

    if (!preview && !calculateSafeToSpend.hasTransactions) {
        return (
            <div className={styles.safeToSpendProgressBar}>
                <div className='fullWidth'>
                    <h3 className={styles.safetoSpendTitle}>Safe to Spend</h3>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 20px',
                    gap: '12px',
                    flex: 1
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #e4d8fc 0%, #F5F3FF 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '4px'
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B4FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" x2="12" y1="2" y2="22"/>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                    </div>
                    <p style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        textAlign: 'center',
                        maxWidth: '220px',
                        lineHeight: '1.5',
                        margin: 0
                    }}>
                        Start adding transactions to track your weekly spending budget
                    </p>
                </div>
            </div>
        );
    }

  return (
    <div className={styles.safeToSpendProgressBar}>
        <div className='fullWidth'>
            <h3 className={styles.safetoSpendTitle}>Safe to Spend</h3>
        </div>
        <div className={styles.progressBar}>
            <CircularProgressbar
                value={calculateSafeToSpend.percentage}
                text={`${calculateSafeToSpend.percentage}%`}
                styles={buildStyles({
                    textColor: "#333",
                    textSize: "16px",
                    pathColor: "#00D4FF",
                    trailColor: "#eee",
                })}
            />
        </div>
        <div className={styles.safeToSpendData}>
            <h2 className={styles.amountTitle}>${calculateSafeToSpend.amount.toFixed(2)}</h2>
            <p className='smallText'>Safe to Spend This Week</p>
            {!preview && calculateSafeToSpend.upcomingBills > 0 && (
                <p style={{color: "#FF8042", textAlign: "center", fontSize: "12px"}}>
                    ${calculateSafeToSpend.upcomingBills.toFixed(2)} in bills due this week
                </p>
            )}
            {!preview && calculateSafeToSpend.percentage >= 50 ? (
                <p style={{color: "#00D4FF", textAlign: "center"}}>You're tracking well!</p>
            ) : !preview && (
                <p style={{color: "#FF8042", textAlign: "center"}}>Consider reducing expenses</p>
            )}
        </div>
    </div>
  );
}

export default SafetoSpend
