import React from 'react'
import styles from './transactions.module.css'
import Image from '@node_modules/next/image'
import Link from '@node_modules/next/link'
import SevendayOverviewPreview from '../SevendayOverviewPreview'

const TransactionsPreview = () => {
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
                        <Link href="/dashboard" className={styles.viewDemoButton}>
                            Log In
                        </Link>
                    </div>

                    <p className={styles.joinMessage}>🎉 Join 1,000+ users managing their finances smarter</p>
                </div>
            </section>

            S

        </section>
    </div>
  )
}

export default TransactionsPreview
