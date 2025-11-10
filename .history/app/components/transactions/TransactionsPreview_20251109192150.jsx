"use client"

import React, { useState } from 'react'
import styles from './transactions.module.css'
import Image from '@node_modules/next/image'
import Link from '@node_modules/next/link'
import SevendayOverviewPreview from '../SevendayOverviewPreview'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const TransactionsPreview = () => {
  const [activeFilter, setActiveFilter] = useState('Income')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Cleared')
  const [sortOrder, setSortOrder] = useState('Newest First')
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const router = useRouter();
  const pathname = usePathname();

  const handleActionClick = () => {
    setShowBanner(true)
  }

  const transactions = [
    {
      id: 1,
      icon: '/assets/icons/trendingUpArrow.svg',
      name: 'FedEx',
      date: '2025-11-07',
      category: 'Salary',
      account: 'Checking',
      amount: 2131,
      status: 'Cleared',
      type: 'income'
    },
    {
      id: 2,
      icon: '/assets/icons/trendingdownIcon.svg',
      name: 'Whole Foods Market',
      date: '2025-11-06',
      category: 'Groceries',
      account: 'Credit Card',
      amount: -127.84,
      status: 'Cleared',
      type: 'expense'
    },
    {
      id: 3,
      icon: '/assets/icons/trendingdownIcon.svg',
      name: 'Netflix Subscription',
      date: '2025-11-05',
      category: 'Entertainment',
      account: 'Checking',
      amount: -15.99,
      status: 'Cleared',
      type: 'expense'
    },
    {
      id: 4,
      icon: '/assets/icons/trendingdownIcon.svg',
      name: 'Uber Ride',
      date: '2025-11-05',
      category: 'Transportation',
      account: 'Checking',
      amount: -24.5,
      status: 'Cleared',
      type: 'expense'
    }
  ]

  const filters = [
    { name: 'Income', icon: '/assets/icons/incomeIcon.svg', count: 1 },
    { name: 'Expense', icon: '/assets/icons/expenseIcon.svg' },
    { name: 'Transfer', icon: '/assets/icons/transferIcon.svg' },
    { name: 'Loan', icon: '/assets/icons/loanIcon.svg' },
    { name: 'Savings', icon: '/assets/icons/savingsIcon.svg' },
    { name: 'Goal', icon: '/assets/icons/goalIcon.svg' }
  ]

  return (
    <div className={styles.transactionsContainer}>
        <section className={styles.transactionsContent}>
            <section className={styles.financialSummary}>
                <div className={styles.summaryBadge}>
                    <p className={styles.summaryLabel}>Income: </p>
                    <span className={styles.summaryAmount}>$2,981</span>
                </div>

                <div className={`${styles.summaryBadge} ${styles.expenseBadge}`}>
                    <p className={styles.summaryLabel}>Expenses: </p>
                    <span className={styles.summaryAmount}>$491.39</span>
                </div>

                <div className={`${styles.summaryBadge} ${styles.netBadge}`}>
                    <p className={styles.summaryLabel}>Net: </p>
                    <span className={styles.summaryAmount}>$2,489.61</span>
                </div>
            </section>

            <section className={styles.mainCard}>
                <div className={styles.iconWrapper}>
                    <Image
                        src="/assets/icons/tallyappIcon.svg"
                        width={46}
                        height={46}
                        alt='Tally-logo'
                    />
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.headerSection}>
                        <h2 className={styles.mainTitle}>See How Your Money Works for You</h2>
                        <div className={styles.freeBadge}>Free</div>
                    </div>
                    <div className={styles.description}>
                        <p>You've recorded all your transactions here — great job keeping your finances organized!
                        Head over to your personalized Dashboard to see beautiful insights.</p>
                    </div>

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureItem}>
                            <Image
                                src="/assets/icons/trendingUpBlue.svg"
                                width={28}
                                height={28}
                                alt='trending up'
                            />
                            <div className={styles.featureText}>
                                <p className={styles.featureTitle}>Real-time Insights</p>
                                <p className={styles.featureSubtitle}>Track spending patterns</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <Image
                                src="/assets/icons/spendingCategories.svg"
                                width={28}
                                height={28}
                                alt='spending categories'
                            />
                            <div className={styles.featureText}>
                                <p className={styles.featureTitle}>Smart Categories</p>
                                <p className={styles.featureSubtitle}>Auto-categorization</p>
                            </div>
                        </div>

                        <div className={styles.featureItem}>
                            <Image
                                src="/assets/icons/targetIcon.svg"
                                width={28}
                                height={28}
                                alt='goal Tracking'
                            />
                            <div className={styles.featureText}>
                                <p className={styles.featureTitle}>Goal Tracking</p>
                                <p className={styles.featureSubtitle}>Achieve your targets</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <Link href="/LoginSignup" className={styles.getStartedButton}>
                            Sign Up For Full Access
                        </Link>
                        <span className={styles.orText}>or</span>
                        <button className={styles.viewDemoButton}
                            onClick={() => router.push(`/LoginSignup?callbackUrl=${pathname}`)}
                        >
                            Log In
                        </button>
                    </div>

                    <p className={styles.joinMessage}>🎉 Join 1,000+ users managing their finances smarter</p>
                </div>
            </section>

            {/* Two Column Layout: Left (Graph + Transactions) and Right (Balance + Quick Actions) */}
            <section className={styles.twoColumnLayout}>
                {/* Left Column: Graph and Transactions */}
                <div className={styles.leftColumn}>
                    {/* 7-Day Overview Graph Card */}
                    <div className={styles.graphCard}>
                        <div className={styles.graphHeader}>
                            <Image
                                src="/assets/icons/trendingUpBlue.svg"
                                width={24}
                                height={24}
                                alt="chart"
                            />
                            <h3 className={styles.graphTitle}>7-Day Overview</h3>
                        </div>
                        <div className={styles.graphWrapper}>
                            <SevendayOverviewPreview />
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className={styles.searchBar}>
                        <Image
                            src="/assets/icons/searchIcon.svg"
                            width={20}
                            height={20}
                            alt="Search"
                        />
                        <input
                            type="text"
                            placeholder="Search transactions by description or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    {/* Quick Filters */}
                    <div className={styles.filtersSection}>
                        <p className={styles.filterLabel}>Quick filters</p>
                        <div className={styles.filterButtons}>
                            {filters.map((filter) => (
                                <button
                                    key={filter.name}
                                    className={`${styles.filterBtn} ${activeFilter === filter.name ? styles.filterBtnActive : ''}`}
                                    onClick={() => setActiveFilter(filter.name)}
                                >
                                    <Image
                                        src={filter.icon}
                                        width={16}
                                        height={16}
                                        alt={filter.name}
                                    />
                                    <span>{filter.name}</span>
                                    {filter.count && (
                                        <span className={styles.filterCount}>{filter.count}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sorting */}
                    <div className={styles.sortingBar}>
                        <div className={styles.statusDropdownWrapper}>
                            <button
                                className={styles.statusDropdown}
                                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                            >
                                <Image
                                    src="/assets/icons/filterIcon.svg"
                                    width={16}
                                    height={16}
                                    alt="Filter"
                                />
                                {statusFilter}
                                <Image
                                    src="/assets/icons/chevronDown.svg"
                                    width={12}
                                    height={12}
                                    alt="Dropdown"
                                />
                            </button>
                            {showStatusDropdown && (
                                <div className={styles.dropdownMenu}>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={() => {
                                            setStatusFilter('Pending')
                                            setShowStatusDropdown(false)
                                        }}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={() => {
                                            setStatusFilter('Cleared')
                                            setShowStatusDropdown(false)
                                        }}
                                    >
                                        Cleared
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className={styles.sortDropdownWrapper}>
                            <button
                                className={styles.sortButton}
                                onClick={() => setShowSortDropdown(!showSortDropdown)}
                            >
                                {sortOrder}
                                <Image
                                    src="/assets/icons/chevronDown.svg"
                                    width={12}
                                    height={12}
                                    alt="Dropdown"
                                />
                            </button>
                            {showSortDropdown && (
                                <div className={styles.dropdownMenu}>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={() => {
                                            setSortOrder('Newest First')
                                            setShowSortDropdown(false)
                                        }}
                                    >
                                        Newest First
                                    </button>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={() => {
                                            setSortOrder('Oldest First')
                                            setShowSortDropdown(false)
                                        }}
                                    >
                                        Oldest First
                                    </button>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={() => {
                                            setSortOrder('Highest Amount')
                                            setShowSortDropdown(false)
                                        }}
                                    >
                                        Highest Amount
                                    </button>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={() => {
                                            setSortOrder('Lowest Amount')
                                            setShowSortDropdown(false)
                                        }}
                                    >
                                        Lowest Amount
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Transactions List */}
                    <div className={styles.transactionsList}>
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className={styles.transactionCard}>
                                <div className={styles.transactionLeft}>
                                    <div className={styles.transactionIcon}>
                                        <Image
                                            src={transaction.icon}
                                            width={24}
                                            height={24}
                                            alt={transaction.type}
                                        />
                                    </div>
                                    <div className={styles.transactionInfo}>
                                        <h4 className={styles.transactionName}>{transaction.name}</h4>
                                        <p className={styles.transactionDetails}>
                                            {transaction.date} • {transaction.category}
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.transactionRight}>
                                    <p className={`${styles.transactionAmount} ${transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount}`}>
                                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                                    </p>
                                </div>

                                <div className={styles.transactionBottom}>
                                    <p className={styles.accountLabel}>{transaction.account}</p>
                                    <span className={styles.statusBadge}>{transaction.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Balance Card and Quick Actions Card */}
                <div className={styles.rightColumn}>
                    {/* Net Balance Card */}
                    <div className={styles.balanceCard}>
                        <p className={styles.balanceLabel}>Net Balance</p>
                        <h2 className={styles.balanceAmount}>$2,489.61</h2>
                        <div className={styles.cashFlowIndicator}>
                            <Image
                                src="/assets/icons/trendingUpBlue.svg"
                                width={16}
                                height={16}
                                alt="Positive"
                            />
                            <span className={styles.cashFlowText}>Positive cash flow</span>
                        </div>

                        <div className={styles.cashFlowBreakdown}>
                            <div className={styles.breakdownHeader}>
                                <Image
                                    src="/assets/icons/trendingUpBlue.svg"
                                    width={16}
                                    height={16}
                                    alt="Cash Flow"
                                />
                                <h4 className={styles.breakdownTitle}>Cash Flow Breakdown</h4>
                            </div>

                            <div className={styles.breakdownItem}>
                                <span className={styles.breakdownLabel}>Income</span>
                                <span className={styles.incomeText}>$2,981.00</span>
                            </div>
                            <div className={styles.progressBarIncome}></div>

                            <div className={styles.breakdownItem}>
                                <span className={styles.breakdownLabel}>Expenses</span>
                                <span className={styles.expenseText}>$491.39</span>
                            </div>
                            <div className={styles.progressBarExpense}></div>

                            <div className={styles.totalTransactions}>
                                <span className={styles.totalLabel}>Total Transactions</span>
                                <span className={styles.totalNumber}>8</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className={styles.quickActionsCard}>
                        <div className={styles.quickActionsHeader}>
                            <h4 className={styles.quickActionsTitle}>Quick Actions</h4>
                            <div className={styles.sparkleIcon}>
                                <Image
                                    src="/assets/icons/sparkleIconPurple.svg"
                                    width={20}
                                    height={20}
                                    alt="AI"
                                />
                            </div>
                        </div>

                        <div className={styles.actionsList}>
                            <button className={styles.actionButton} onClick={handleActionClick}>
                                <div className={styles.actionIconPurple}>
                                    <span>+</span>
                                </div>
                                <span>Add Transaction</span>
                            </button>

                            <button className={styles.actionButton} onClick={handleActionClick}>
                                <div className={styles.actionIconBlue}>↓</div>
                                <span>Export CSV</span>
                            </button>

                            <button className={styles.actionButton} onClick={handleActionClick}>
                                <div className={styles.actionIconOrange}>↑</div>
                                <span>Import CSV</span>
                            </button>
                        </div>

                        <button className={styles.unlockButton}
                            onClick={handleActionClick}
                        >
                            <Image
                                src="/assets/icons/sparkleIconPurple.svg"
                                width={20}
                                height={20}
                                alt="Unlock"
                            />
                            Unlock Full Access
                        </button>
                    </div>
                </div>
            </section>

        </section>

        {/* Signup Popup Banner */}
        {showBanner && (
            <>
                <div className={styles.bannerOverlay} onClick={() => setShowBanner(false)}></div>
                <div className={styles.signupBanner}>
                    <button className={styles.closeBanner} onClick={() => setShowBanner(false)}>×</button>
                    <div className={styles.bannerIcon}>🎉</div>
                    <h4 className={styles.bannerTitle}>Ready to unlock full features?</h4>
                    <p className={styles.bannerText}>Sign up free to edit transactions, export data, and unlock powerful insights!</p>
                    <div className={styles.bannerButtons}>
                        <button className={styles.bannerSignupBtn}
                            onClick={() => router.push(`/LoginSignup?callbackUrl`)}
                        >
                            Sign Up Free
                        </button>
                        <Link href="/LoginSignup" className={styles.bannerLoginBtn}>
                            Log In
                        </Link>
                    </div>
                </div>
            </>
        )}
    </div>
  )
}

export default TransactionsPreview
