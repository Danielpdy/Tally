"use client"

import React from 'react'
import { useState } from 'react'
import SpendingChart from '@app/components/SpendingChart';
import SafetoSpend from '@app/components/SafetoSpend';
import styles from './dashboard.module.css';
import CashflowChart from '@app/components/CashflowChartExample';
import EmergencyFundBar from '@app/components/EmergencyFundBar';
import VacationFundBar from '@app/components/VacationFundBar';
import NewCarBar from '@app/components/NewCarBar';
import HomeDepositBar from '@app/components/HomeDepositBar';
import DebtChartBarExample from '@app/components/DebtChartBarExample';
import Image from 'next/image';
import Link from 'next/link';


const DashboardClient = ({ isLoggedIn }) => {

const [balance, setBalance] = useState(24322);
const [monthlyIncome, setMonthlyIncome] = useState(5240);
const [monthlyExpenses, setMonthlyExpenses] = useState(3890);


if (!isLoggedIn) {
  return (
        <section className={styles.dashboardContent}>
            <div className={styles.dashboardMain}>
                <section className={styles.mainMessage}>
                    <div className={styles.mainMessageContent}>
                        <div className={styles.financialFreedom}>Financial Freedom Starts Here</div>
                        <h1 className='bigTitles textAlign'>Take Control of Your Money</h1>
                        <div>
                            <p className='smallText textAlign'>Track spending, crush goals, and build wealth with AI-powered
                                insights.
                            </p>
                            <p className='smallText textAlign'>
                                Sign up to unlock all features below
                            </p>
                        </div>
                        <div className={styles.mainMessageBoxBtns}>
                            <button className={styles.purpleButtons}>Start Free Trial</button>
                            <button className='whiteButton'>Watch Demo</button>
                        </div>
                        <p className='smallerText'>No credit card required • 14-day free trial • Cancel anytime</p>
                    </div>

                    <div className={styles.mainMessageContent}>
                        <h2 className={styles.dashSubtitle}
                        >Everything You Need to Master Your Finances</h2>
                        <p className='smallText'
                        style={{textAlign:"center"}}
                        >See what awaits you inside. Sign up to start tracking today.</p>
                    </div>
                </section>

                
                <section className={styles.firstRowDash}>
                    <div className={styles.firstrowBoxes}>
                        <p className='smallerText'>Total Balance</p>
                        <h2>${balance}</h2>
                        <p className='smallerText'>Updated just now</p>
                    </div>

                    <div className={styles.firstrowBoxes}>
                        <p className='smallerText'>Monthly Flow</p>
                        <div className='fullWidth'>
                            <div className={styles.monthlyFlowNumbers}>
                                <div className={styles.monthlyData}>
                                    <img src="/assets/icons/trendingupIcon.svg"
                                    width={20}
                                    height={20}
                                    alt="Income" />
                                    <p 
                                        style={{
                                            color: "#22c55e",
                                            fontSize: "20px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        ${monthlyIncome}
                                    </p>
                                </div>
                                <p className='smallerText'>Income</p>
                            </div>  
                            <div className={styles.monthlyFlowNumbers}>
                                <div className={styles.monthlyData}>
                                    <img src="/assets/icons/trendingdownIcon.svg"
                                    width={20}
                                    height={20}
                                    alt="Expenses" />
                                    <p
                                        style={{
                                            color: "#ef4444",
                                            fontSize: "20px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        ${monthlyExpenses}
                                    </p>
                                </div>
                                <p className='smallerText'>Expenses</p>
                            </div>    
                        </div>
                    </div>

                    <div className={styles.firstrowBoxes}>
                        <div>
                        
                            <p>Especial Fund</p>
                        </div>
                    </div>

                    <div className={styles.premiumOverlay}>
                        <div className={styles.unlockMessage}>
                            <div className="lock-icon">
                                <img src="./assets/icons/lockIcon.svg"
                                width={60}
                                height={60}
                                alt="" />
                            </div>
                            <h3 className='subTitles'>Sign Up to Unlock</h3>
                            <Link >
                            <button className={styles.purpleButtons}>Create Free Account</button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className={styles.graphsSectionOne}>
                    <div className={styles.chartCardBox}>
                        <SpendingChart />
                    </div>

                    <div className={styles.chartCardBox2}>
                        <SafetoSpend />
                    </div>
                </section>
                
                <section className='fullWidth'>
                    <div className={styles.cashFlowCard}>
                        <CashflowChart />
                    </div>
                </section>

                <section className={styles.goalsBars}>
                    <h3 className={styles.goalsBarsTitle}>Financial Goals</h3>
                    <div className={styles.goalsBarsBox}>

                        <div>
                            <EmergencyFundBar />
                            <br />
                            <div className={styles.goalsBarsDataContent}>
                                <span className={styles.fundTitle}>Emergency Fund</span>                      
                                <p className={styles.fundAmount}>$8,500 / $10,000</p>                            
                                <p className={styles.fundDue}>Due: Dec 2025</p>
                                <span className={styles.fundMessage}>Keep going! 💪</span>
                            </div>
                        </div>
                        <div>
                            <VacationFundBar />
                            <br />
                            <div className={styles.goalsBarsDataContent}>
                                <span className={styles.fundTitle}>Vacation Fund</span>
                                <p className={styles.fundAmount}>$3,600 / $5,000</p>
                                <p className={styles.fundDue}>Due: Jun 2026</p>
                                <span className={styles.fundMessage}>Keep going! 💪</span>
                            </div>
                        </div>
                        <div>
                            <NewCarBar />
                            <br />
                            <div className={styles.goalsBarsDataContent}>
                                <span className={styles.fundTitle}>New Car</span>
                                <p className={styles.fundAmount}>$12,000 / $25,000</p>
                                <p className={styles.fundDue}>Due: Dec 2026</p>
                                <span className={styles.fundMessage}>Keep going! 💪</span>
                            </div>
                        </div>
                        <div>
                            <HomeDepositBar />
                            <br />
                            <div className={styles.goalsBarsDataContent}>
                                <span className={styles.fundTitle}>Home Deposit</span>
                                <p className={styles.fundAmount}>$45,000 / $100,000</p>
                                <p className={styles.fundDue}>Due: Dec 2027</p>
                                <span className={styles.fundMessage}>Keep going! 💪</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.debtChartandInsights}>
                    <div className={styles.debtChartandInsightsBoxes}>
                        <DebtChartBarExample />
                    </div>

                    <div className={`${styles.debtChartandInsightsBoxes2} ${styles.flexColumn20}`}>
                        <div className={styles.insightsTitleBox}>
                            <h3 className={styles.goalsBarsTitle}>Insights & Alerts</h3>
                            <Image 
                                src="/assets/icons/sparkleIconPurple.svg"
                                width={24}
                                height={24}
                                alt='Insights Icon'
                            />
                        </div>
                        <div className={styles.flexColumn20}>
                            <div className={styles.insightsBox}>
                                <div className={styles.insightsIconsBoxOrange}>
                                    <Image
                                        src="/assets/icons/orangeArrowIcon.svg"
                                        width={24}
                                        height={24}
                                        alt='arrow'
                                    />
                                </div>
                                <p className={styles.insightsText}>You spent 14% more on dinning this month.</p>
                            </div>

                            <div className={styles.insightsBox}>
                                <div className={styles.insightsIconsBoxOrange}>
                                    <Image 
                                        src="/assets/icons/orangeAlertIcon.svg"
                                        width={24}
                                        height={24}
                                        alt='alert'
                                    />
                                </div>
                                <p className={styles.insightsText}>Your rent is 38% of income - try keeping it under 30%.</p> 
                            </div>

                            <div className={styles.insightsBox}>
                                <div className={styles.insightsIconsBoxPurple}>
                                    <Image 
                                        src="/assets/icons/purpleTargetIcon.svg"
                                        width={24}
                                        height={24}
                                        alt='alert'
                                    />
                                </div>
                                <p className={styles.insightsText}>Your rent is 38% of income - try keeping it under 30%.</p> 
                            </div>

                            <div className={styles.insightsBox}>
                                <div className={styles.insightsIconsBoxPurple}>
                                    <Image 
                                        src="/assets/icons/sparkleIconPurple.svg"
                                        width={24}
                                        height={24}
                                        alt='alert'
                                    />
                                </div>
                                <p className={styles.insightsText}>Your rent is 38% of income - try keeping it under 30%.</p> 
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className={styles.getStartedSection}>
                    <div className={styles.getStartedTitleSection}>
                        <h1 className={styles.getStartedTitle}>Ready to Tansform Your Financial Life?</h1>
                        <p className={styles.getStartedsubTitle}>Join thousands of users who've already taken control. 
                        Start your free trial today.
                        </p>

                        <div className={styles.getStartedButtonBox}>
                            <button className={styles.purpleButtons}>Get Started Free</button>
                            <button className='whiteButton'>Go to Log In</button>
                        </div>
                    </div>

                    <div className={styles.getStartedStatsBox}>
                        <div>
                            <p className={styles.getStartedStatsText}>14 Days</p>
                            <p className='smallerText textAlign'>Free</p>
                        </div>

                        <div>
                            <p className={styles.getStartedStatsText}>1,000+</p>
                            <p className='smallerText textAlign'>Happy Users</p>
                        </div>

                        <div className='textAlign'>
                            <div className={styles.userRatingBox}>
                                <p className={styles.getStartedStatsText}>4.9</p>
                                <Image 
                                    src='/assets/icons/starIcon.svg'
                                    width={24}
                                    height={24}
                                    alt='star'
                                />
                            </div>
                            <p className='smallerText textAlign'>User Rating</p>
                        </div>
                    </div>
            </section>
        </section>
        
        );
    }

    return (
        <div>
            <p>nigga</p>
        </div>
    )
}

export default DashboardClient