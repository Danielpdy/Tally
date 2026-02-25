import { useMemo } from 'react';

/**
 * Custom hook to calculate monthly financial data
 * @param {Array} transactions - Array of transaction objects
 * @returns {Object} Monthly data including current, previous, and comparison stats
 */
export const useMonthlyData = (transactions = [], billsData = {}) => {
    const { dueThisWeek = [], overdue = [], paid = [], allBills = [] } = billsData;

    return useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        const unpaidDueBills = dueThisWeek
            .filter(bill => !paid.includes(bill.id))
            .reduce((sum, bill) => sum + bill.amount, 0);

        const overdueIds = overdue.map(bill => typeof bill === 'object' ? bill.id : bill);
        const unpaidOverdueBills = overdueIds
            .filter(id => !paid.includes(id))
            .map(id => allBills.find(bill => bill.id === id))
            .filter(Boolean)
            .reduce((sum, bill) => sum + bill.amount, 0);

        const billExpenses = unpaidDueBills + unpaidOverdueBills;

        const filterByMonth = (month, year) => transactions.filter(t => {
            const date = new Date(t.date);
            return date.getMonth() === month && date.getFullYear() === year;
        });

        const calculateMonthStats = (monthTransactions, includeBills = false) => {
            const income = monthTransactions
                .filter(t => t.type === 'Income')
                .reduce((sum, t) => sum + t.amount, 0);
            const transactionExpenses = monthTransactions
                .filter(t => t.type === 'Expense')
                .reduce((sum, t) => sum + t.amount, 0);
            const expenses = transactionExpenses + (includeBills ? billExpenses : 0);
            const savings = income - expenses;
            const savingsRate = income > 0 ? ((savings / income) * 100) : 0;
            const transactionCount = monthTransactions.filter(t => t.type === 'Expense').length;
            const incomeSourceCount = monthTransactions.filter(t => t.type === 'Income').length;
            return { income, expenses, savings, savingsRate, transactionCount, incomeSourceCount };
        };

        const currentMonthTransactions = filterByMonth(currentMonth, currentYear);
        const lastMonthTransactions = filterByMonth(lastMonth, lastMonthYear);

        const current = calculateMonthStats(currentMonthTransactions, true);
        const previous = calculateMonthStats(lastMonthTransactions, false);

        const savingsChange = current.savingsRate - previous.savingsRate;
        const incomeChange = previous.income > 0
            ? ((current.income - previous.income) / previous.income * 100)
            : 0;
        const expensesChange = previous.expenses > 0
            ? ((current.expenses - previous.expenses) / previous.expenses * 100)
            : 0;

        return {
            current,
            previous,
            savingsChange,
            incomeChange,
            expensesChange,
            currentMonthName: now.toLocaleString('default', { month: 'long' }),
            lastMonthName: new Date(lastMonthYear, lastMonth).toLocaleString('default', { month: 'long' })
        };
    }, [transactions]);
};
