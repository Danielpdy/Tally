/**
 * Health Score Service
 * Calculates financial health score based on user's financial data
 *
 * Score breakdown:
 * - Base score: 50 points
 * - Savings rate: up to 30 points
 * - Bills status: up to 15 points
 * - Goal progress: up to 5 points
 *
 * Total possible: 100 points
 */

/**
 * Calculate the financial health score
 * @param {Object} params - The parameters for calculation
 * @param {number} params.savingsRate - Current month's savings rate (percentage)
 * @param {number} params.overdueBillsCount - Number of overdue bills
 * @param {Array} params.financialGoals - Array of financial goals with currentAmount and targetAmount
 * @returns {number} Health score between 0-100
 */
export const calculateHealthScore = ({ savingsRate = 0, overdueBillsCount = 0, financialGoals = [] }) => {
    let score = 50; // Base score

    // Savings rate contribution (up to 30 points)
    if (savingsRate >= 20) score += 30;
    else if (savingsRate >= 10) score += 20;
    else if (savingsRate > 0) score += 10;
    else if (savingsRate < 0) score -= 10;

    // Bills status (up to 15 points)
    if (overdueBillsCount === 0) score += 15;
    else score -= Math.min(overdueBillsCount * 5, 15);

    // Goal progress (up to 5 points)
    if (financialGoals.length > 0) {
        const avgGoalProgress = financialGoals.reduce((sum, goal) => {
            const progress = goal.targetAmount > 0
                ? (goal.currentAmount / goal.targetAmount) * 100
                : 0;
            return sum + progress;
        }, 0) / financialGoals.length;

        if (avgGoalProgress >= 50) score += 5;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
};

/**
 * Get health status based on score
 * @param {number} score - The health score (0-100)
 * @returns {Object} Status object with text and color
 */
export const getHealthStatus = (score) => {
    if (score >= 80) return { text: 'Excellent Health', color: '#10B981' };
    if (score >= 65) return { text: 'Very Good Health', color: '#8B5CF6' };
    if (score >= 50) return { text: 'Good Health', color: '#38BDF8' };
    if (score >= 35) return { text: 'Needs Attention', color: '#FB923C' };
    return { text: 'Critical', color: '#EF4444' };
};

/**
 * Calculate monthly statistics from transactions
 * @param {Array} transactions - Array of transaction objects
 * @param {number} month - Month (0-11)
 * @param {number} year - Year
 * @returns {Object} Monthly statistics
 */
export const calculateMonthlyStats = (transactions, month, year) => {
    const monthTransactions = transactions.filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === month && date.getFullYear() === year;
    });

    const income = monthTransactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
        .filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const savings = income - expenses;
    const savingsRate = income > 0 ? ((savings / income) * 100) : 0;
    const transactionCount = monthTransactions.filter(t => t.type === 'Expense').length;
    const incomeSourceCount = monthTransactions.filter(t => t.type === 'Income').length;

    return {
        income,
        expenses,
        savings,
        savingsRate,
        transactionCount,
        incomeSourceCount
    };
};

/**
 * Generate a dynamic health description based on financial data
 * @param {Object} params - The parameters
 * @param {number} params.savings - Current month savings
 * @param {number} params.overdueBillsCount - Number of overdue bills
 * @param {number} params.savingsChange - Change in savings rate from last month
 * @returns {string} Dynamic description
 */
export const generateHealthDescription = ({ savings = 0, overdueBillsCount = 0, savingsChange = 0 }) => {
    const points = [];

    if (savings > 0) {
        points.push(`You saved $${savings.toFixed(0)} this month`);
    } else if (savings < 0) {
        points.push(`You overspent by $${Math.abs(savings).toFixed(0)} this month`);
    }

    if (overdueBillsCount > 0) {
        points.push(`${overdueBillsCount} bill${overdueBillsCount > 1 ? 's' : ''} overdue`);
    }

    if (savingsChange > 0) {
        points.push(`savings rate improved by ${savingsChange.toFixed(1)}%`);
    }

    return points.length > 0
        ? points.join('. ') + '.'
        : 'Keep tracking your finances to build your insights.';
};
