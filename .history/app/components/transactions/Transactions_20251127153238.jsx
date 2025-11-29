import React, { useState, useRef, useEffect, useSyncExternalStore, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './transactionsPreview.module.css';
import { useClickOutside } from './hooks/useClickOutside';
import TransactionsEmptyState from './TransactionsEmptyState';
import TransactionsSidePannel from './TransactionsSidePannel';
import SevendayOverview from '../SevendayOverview';
import { Addtransaction, GetTransactions, TransactionService } from '@services/TransactionService';
import { useSession } from '@node_modules/next-auth/react';
import { GetWeeklySummary } from '@services/AggregationService';
import { global } from 'styled-jsx/css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [sidePanelOpen, setSidePanelOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [weeklyOverview, setWeeklyOverview] = useState();
    const sidePanelRef = useRef(null);
    const [dateFilter, setDateFilter] = useState();
    const { data: session } = useSession();



    useEffect(() => {
        fetchTransactions();
        getChartData();
    },[]);


    const handleAddTransaction = async (newTransaction) => {
        //console.log("New transaction:", newTransaction);
        const tempId = Date.now();
        setTransactions(prev => [...prev, {...newTransaction, id: tempId}]);
        //setSidePanelOpen(false);

        try {
            const data = await Addtransaction(newTransaction, session.accessToken);
            setTransactions(prev => prev.map(t => t.id === tempId ? data : t));
            setIsAdded(true);
        } catch(error) {
            setTransactions(prev => prev.filter(t => t.id !== tempId));
            console.error("Failed to add transaction");
        }

    };

    async function fetchTransactions() {
        const data = await GetTransactions(session.accessToken);
        setTransactions(data);
    }


    const { globalEarnings, globalSpendings, globalNet } = useMemo(() => {
        const income = transactions.reduce((sum, t) => (
            t.type === "Income" ? sum + t.amount : sum
        ), 0);

         const expense = transactions.reduce((sum, t) => (
            t.type === "Expense" ? sum + t.amount : sum
        ), 0);

        const net = income - expense;

        return {
            globalEarnings: income,
            globalSpendings: expense,
            globalNet: net
        }
    }, [transactions]);

    /*function calculateGlobals (data) {
        const totalIncome = data.reduce((sum, t) => (
            t.type === "Income" ? sum + t.amount : sum
        ), 0);

        const totalExpenses = data.reduce((sum, t) => (
            t.type === "Expense" ? sum + t.amount : sum
        ), 0);

        const totalNet = totalIncome - totalExpenses;

        setGlobalIncome(totalIncome);
        setGlobalExpenses(totalExpenses);
        setGlobalNet(totalNet);
    }*/

    /*async function submitTransaction(newTransaction) {
        try {
            const result = await Addtransaction(newTransaction);
            //setIsAdded(true);
            console.log("Transaction added:", result);
        } catch (error) {
            console.error("Failed to add transaction: ",error);
        }

        return result;
        
    }*/

    const filterCount = useMemo(() => {
        return transactions.reduce((sum, transaction) => {
            sum[transaction.type] = (sum[transaction.type] || 0) + 1;
            return sum
        }, {});
    }, [transactions]);

    const filters = [
        { name: 'Income', icon: '/assets/icons/incomeIcon.svg', count: filterCount['Income']},
        { name: 'Expense', icon: '/assets/icons/expenseIcon.svg', count: filterCount['Expense']},
        { name: 'Transfer', icon: '/assets/icons/transferIcon.svg', count: filterCount['Transfer']},
        { name: 'Loan', icon: '/assets/icons/loanIcon.svg', count: filterCount['Loan']},
        { name: 'Savings', icon: '/assets/icons/savingsIcon.svg', count: filterCount['Savings']},
        { name: 'Goal', icon: '/assets/icons/goalIcon.svg', count: filterCount['Goal']}
    ];

    const getChartData = async () => {
        const response = await GetWeeklySummary(session.accessToken);
        setWeeklyOverview(response);
    };

    const filterBySearch = () => {
        if (!searchQuery) return transactions;

        const query = searchQuery.toLowerCase();

        return transactions.filter(t => t.description.toLowerCase().includes(query)
        || t.category.toLowerCase().includes(query));
    }

    const filterByButton = () => {
        //if(setSelectedFilter === null) return transactions;
        return transactions.filter(t => t.type === selectedFilter)
    };

    const filterByDate = (date) => {
        if (!date) return transactions;

        const copy = [...transactions];

        return copy.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            if (d)
        })
    }

    const filteredTransactions = useMemo(() => {
        if (searchQuery) return filterBySearch();

        if (selectedFilter !== null) return filterByButton();

        if (setDateFilter !== null) return filterByDate();
        return transactions;
    }, [transactions, selectedFilter, searchQuery, dateFilter]);

    const clearButtonFilters = () => {
        setSelectedFilter(null);
    };

    const filterButton = useMemo(() => {
        if (!setSelectedFilter) return transactions;
    })
    // Get icon based on transaction type (main category)
    const getCategoryIcon = (type) => {
        const icons = {
            'Income': '/assets/icons/trendingUpBlue.svg',
            'Expense': '/assets/icons/trendingdownIcon.svg',
            'Transfer': '/assets/icons/transferIconColored.svg',
            'Loan': '/assets/icons/loanIconColored.svg',
            'Savings': '/assets/icons/savingsIconColored.svg',
            'Goal': '/assets/icons/goalIconColored.svg'
        };
        return icons[type] || '/assets/icons/trendingUpBlue.svg';
    };

    // Get background color based on transaction type (main category)
    const getCategoryBgColor = (type) => {
        const colors = {
            'Income': '#E0F7FA',
            'Expense': '#FFE8E0',
            'Transfer': '#F3E5F5',
            'Loan': '#E0F2F1',
            'Savings': '#EDE7F6',
            'Goal': '#FFF3E0'
        };
        return colors[type] || '#f0f9ff';
    };

    // Get icon color based on transaction type
    const getCategoryIconColor = (type) => {
        const colors = {
            'Income': '#00BCD4',
            'Expense': '#FF8042',
            'Transfer': '#9333EA',
            'Loan': '#00BCD4',
            'Savings': '#9333EA',
            'Goal': '#F59E0B'
        };
        return colors[type] || '#00BCD4';
    };


    return (
        <>
            {transactions.length === 0 ? (
                <TransactionsEmptyState onAddClick={() => setSidePanelOpen(true)} />
            ) : (
                <div className={styles.transactionsContainer}>
                    <div className={styles.transactionsContent}>
                        {/* Header Section */}
                        <section className={styles.headerSection}>
                            <div>
                                <h2 className={styles.mainTitle}>Transactions</h2>
                                <p className={styles.description}>Track and manage your financial activity • Press <kbd>N</kbd> to add</p>
                            </div>
                            <div className={styles.buttonGroup}>
                                <button
                                    className={styles.getStartedButton}
                                    onClick={() => setSidePanelOpen(true)}
                                >
                                    <Image
                                        src='/assets/icons/plusWhite.svg'
                                        width={20}
                                        height={20}
                                        alt='plus'
                                    />
                                    Add Transaction
                                </button>
                                <button className={styles.viewDemoButton}>
                                    <Image
                                        src='/assets/icons/export.svg'
                                        width={20}
                                        height={20}
                                        alt='export'
                                    />
                                    Export
                                </button>
                            </div>
                        </section>

                        {/* Financial Summary Badges */}
                        <section className={styles.financialSummary}>
                            <div className={styles.summaryBadge}>
                                <p className={styles.summaryLabel}>Earnings:</p>
                                <span className={styles.summaryAmount}>${globalEarnings}</span>
                            </div>
                            <div className={`${styles.summaryBadge} ${styles.expenseBadge}`}>
                                <p className={styles.summaryLabel}>Spendings:</p>
                                <span className={styles.summaryAmount}>${globalSpendings}</span>
                            </div>
                            <div className={`${styles.summaryBadge} ${styles.netBadge}`}>
                                <p className={styles.summaryLabel}>Net:</p>
                                <span className={styles.summaryAmount}>${globalNet}</span>
                            </div>
                        </section>

                        {/* Two Column Layout */}
                        <div className={styles.twoColumnLayout}>
                            {/* Left Column */}
                            <div className={styles.leftColumn}>
                                {/* 7-Day Overview Chart */}
                                <div className={styles.graphCard}>
                                    <div className={styles.graphHeader}>
                                        <Image
                                            src='/assets/icons/trendingUpBlue.svg'
                                            width={20}
                                            height={20}
                                            alt='trending'
                                        />
                                        <h3 className={styles.graphTitle}>7-Day Overview</h3>
                                    </div>
                                    <div className={styles.graphWrapper}>
                                        <SevendayOverview data={weeklyOverview} />
                                    </div>
                                </div>

                                {/* Search Bar */}
                                <div className={styles.searchBar}>
                                    <Image
                                        src='/assets/icons/searchIcon.svg'
                                        width={20}
                                        height={20}
                                        alt='search'
                                    />
                                    <input
                                        type="text"
                                        className={styles.searchInput}
                                        placeholder="Search transactions by description or category..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Filters Section */}
                                <div className={styles.filtersSection}>
                                    <div className={styles.filterHeader}>
                                        <p className={styles.filterLabel}>Quick filters</p>
                                        {selectedFilter && (
                                            <button className={styles.clearFiltersBtn}
                                                onClick={() => clearButtonFilters()}
                                            >
                                                Clear filters
                                            </button>
                                        )}
                                    </div>
                                    <div className={styles.filterButtons}>
                                        {filters.map((filter, index) => (
                                            <button
                                                key={index}
                                                className={`${styles.filterBtn} ${selectedFilter === filter.name ? styles.filterBtnActive : ''}`}
                                                onClick={() => {
                                                    setSelectedFilter(selectedFilter === filter.name ? null : filter.name);
                                                    //setFilterClicked(true);
                                                }}
                                            >
                                                <Image
                                                    src={filter.icon}
                                                    width={16}
                                                    height={16}
                                                    alt={filter.name}
                                                />
                                                {filter.name}
                                                {filter.count && (
                                                    <span className={styles.filterCount}>{filter.count}</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sorting Bar */}
                                <div className={styles.sortingBar}>
                                    <div className={styles.statusDropdownWrapper}>
                                        <button
                                            className={styles.statusDropdown}
                                            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                                        >
                                            <Image
                                                src='/assets/icons/filterIcon.svg'
                                                width={16}
                                                height={16}
                                                alt='filter'
                                            />
                                            All Status
                                            <Image
                                                src='/assets/icons/chevronDown.svg'
                                                width={16}
                                                height={16}
                                                alt='chevron'
                                            />
                                        </button>
                                        {statusDropdownOpen && (
                                            <div className={styles.dropdownMenu}>
                                                <button className={styles.dropdownItem}>All Status</button>
                                                <button className={styles.dropdownItem}>Cleared</button>
                                                <button className={styles.dropdownItem}>Pending</button>
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.sortDropdownWrapper}>
                                        <button
                                            className={styles.sortButton}
                                            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                                        >
                                            Newest First
                                            <Image
                                                src='/assets/icons/chevronDown.svg'
                                                width={16}
                                                height={16}
                                                alt='chevron'
                                            />
                                        </button>
                                        {sortDropdownOpen && (
                                            <div className={styles.dropdownMenu}>
                                                <button className={styles.dropdownItem}
                                                    onClick={() => setDateFilter('newest')}
                                                >Newest First</button>

                                                <button className={styles.dropdownItem}
                                                    onClick={() => setDateFilter('oldest')}
                                                >Oldest First</button>

                                                <button className={styles.dropdownItem}>Highest Amount</button>
                                                <button className={styles.dropdownItem}>Lowest Amount</button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Transactions List */}
                                <div className={styles.transactionsList}>
                                    {filteredTransactions.map((transaction) => (
                                        <div key={transaction.id} className={styles.transactionCard}>
                                            <div className={styles.transactionLeft}>
                                                <div
                                                    className={styles.transactionIcon}
                                                    style={{ backgroundColor: getCategoryBgColor(transaction.type) }}
                                                >
                                                    <Image
                                                        src={getCategoryIcon(transaction.type)}
                                                        width={24}
                                                        height={24}
                                                        alt={`${transaction.type} icon`}
                                                    />
                                                </div>
                                                <div className={styles.transactionInfo}>
                                                    <h4 className={styles.transactionName}>{transaction.description}</h4>
                                                    <p className={styles.transactionDetails}>
                                                        {transaction.date} • {transaction.category}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={styles.transactionRight}>
                                                <h4 className={`${styles.transactionAmount} ${transaction.type === 'Income' ? styles.incomeAmount : styles.expenseAmount}`}>
                                                    {transaction.type === 'Income' ? '+' : '-'}${transaction.amount}
                                                </h4>
                                            </div>
                                            <div className={styles.transactionBottom}>
                                                <p className={styles.accountLabel}>{transaction.account}</p>
                                                <span className={styles.statusBadge}>{transaction.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className={styles.rightColumn}>
                                {/* Net Balance Card */}
                                <div className={styles.balanceCard}>
                                    <p className={styles.balanceLabel}>Net Balance</p>
                                    <h2 className={styles.balanceAmount}>${globalNet.toFixed(2)}</h2>
                                    <div className={styles.cashFlowIndicator}>
                                        <Image
                                            src={globalNet > 0 ? '/assets/icons/trendingUpArrow.svg' : '/assets/icons/trendingdownIcon.svg'}
                                            width={16}
                                            height={16}
                                            alt={globalNet > 0 ? 'trending up' : 'trending down'}
                                            style={{
                                                filter: globalNet > 0
                                                    ? 'brightness(0) saturate(100%) invert(58%) sepia(94%) saturate(451%) hue-rotate(76deg) brightness(95%) contrast(92%)'
                                                    : 'brightness(0) saturate(100%) invert(33%) sepia(93%) saturate(4017%) hue-rotate(346deg) brightness(98%) contrast(96%)'
                                            }}
                                        />
                                        <span className={styles.cashFlowText} style={{ color: 'black' }}>{globalNet <= 0 ? "Negative flow" : "Positive flow"}</span>
                                    </div>

                                    {/* Cash Flow Analysis */}
                                    <div className={styles.cashFlowBreakdown}>
                                        <div className={styles.breakdownHeader}>
                                            <h4 className={styles.breakdownTitle}>Cash Flow Analysis</h4>
                                        </div>

                                        {/* Savings Rate Badge */}
                                        <div className={styles.savingsRateBadge}>
                                            <div className={styles.savingsIconCircle}>
                                                <Image
                                                    src='/assets/icons/savingsIcon.svg'
                                                    width={24}
                                                    height={24}
                                                    alt='savings'
                                                />
                                            </div>
                                            <div className={styles.savingsRateContent}>
                                                <p className={styles.savingsRateLabel}>Savings Rate</p>
                                                <p className={styles.savingsRatePercentage}>
                                                    {globalEarnings > 0 ? ((globalNet / globalEarnings) * 100).toFixed(1) : 0}%
                                                </p>
                                            </div>
                                            <div className={styles.savingsAmountSection}>
                                                <p className={styles.savingsAmountLabel}>You're saving</p>
                                                <p className={styles.savingsAmountValue}>${globalNet > 0 ? globalNet : 0}</p>
                                            </div>
                                        </div>

                                        {/* Stacked Bar Comparison */}
                                        <div className={styles.stackedBarsContainer}>
                                            {/* Income Bar */}
                                            <div className={styles.barRow}>
                                                <span className={styles.barLabel}>Income</span>
                                                <div className={styles.barContainer}>
                                                    <div className={styles.incomeBarFilled}>
                                                        <span className={styles.barAmount}>${globalEarnings}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expense Bar */}
                                            <div className={styles.barRow}>
                                                <span className={styles.barLabel}>Expenses</span>
                                                <div className={styles.barContainer}>
                                                    <div
                                                        className={styles.expenseBarFilled}
                                                        style={{ width: globalEarnings > 0 ? `${(globalSpendings / globalEarnings) * 100}%` : '0%' }}
                                                    >
                                                        <span className={styles.barAmount}>${globalSpendings}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Percentage Indicator */}
                                            <div className={styles.percentageIndicator}>
                                                <span className={styles.percentageDot}></span>
                                                <span className={styles.percentageText}>
                                                    {globalEarnings > 0 ? ((globalSpendings / globalEarnings) * 100).toFixed(1) : 0}% of income spent
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total Transactions */}
                                    <div className={styles.totalTransactions}>
                                        <span className={styles.totalLabel}>Total Transactions</span>
                                        <span className={styles.totalNumber}>{transactions.length}</span>
                                    </div>
                                </div>

                                {/* Quick Actions Card */}
                                <div className={styles.quickActionsCard}>
                                    <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
                                    <div className={styles.actionsList}>
                                        <button
                                            className={styles.actionButton}
                                            onClick={() => setSidePanelOpen(true)}
                                        >
                                            <div className={styles.actionIconPurple}>
                                                <span>+</span>
                                            </div>
                                            Add Transaction
                                        </button>
                                        <button className={styles.actionButton}>
                                            <div className={styles.actionIconBlue}>
                                                <span>↓</span>
                                            </div>
                                            Export CSV
                                        </button>
                                        <button className={styles.actionButton}>
                                            <div className={styles.actionIconOrange}>
                                                <span>↑</span>
                                            </div>
                                            Import CSV
                                        </button>
                                    </div>
                                </div>

                                {/* See How Your Money Works Card */}
                                <div className={styles.balanceCard} style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #FFF0F8 100%)' }}>
                                    <div className={styles.breakdownHeader}>
                                        <Image
                                            src='/assets/icons/trendingupIcon.svg'
                                            width={20}
                                            height={20}
                                            alt='insights'
                                        />
                                        <h4 className={styles.breakdownTitle}>See How Your Money Works for You</h4>
                                    </div>
                                    <p className={styles.smallerText} style={{ marginTop: '12px', lineHeight: '1.6' }}>
                                        You've recorded all your transactions here — great job keeping your finances organized!
                                        Head over to your Dashboard to see how your income, expenses, goals, and savings come together in real-time graphs and summaries.
                                    </p>

                                    {/* Quick snapshot */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', padding: '12px', background: 'white', borderRadius: '12px' }}>
                                        <div>
                                            <p className={styles.breakdownLabel} style={{ fontSize: '12px' }}>Quick snapshot this week</p>
                                            <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                                                <div>
                                                    <p style={{ fontSize: '12px', color: '#6b7280' }}>Spending:</p>
                                                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#FF8042' }}>${globalSpendings}</p>
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: '12px', color: '#6b7280' }}>Earnings:</p>
                                                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#38BDF8' }}>${globalEarnings}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                                        <button className={styles.unlockButton} style={{ marginTop: '16px' }}>
                                            Go to Dashboard
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"/>
                                                <path d="m12 5 7 7-7 7"/>
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <TransactionsSidePannel
                isOpen={sidePanelOpen}
                onClose={() => {
                    setSidePanelOpen(false);
                    setIsAdded(false);
                }}
                onSubmit={handleAddTransaction}
                transactionAdded={isAdded}
            />
        </>
    );
};

export default Transactions;
