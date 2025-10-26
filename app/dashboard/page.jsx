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

const dashboard = () => {

const [balance, setBalance] = useState(24322);
const [monthlyIncome, setMonthlyIncome] = useState(5240);
const [monthlyExpenses, setMonthlyExpenses] = useState(3890);

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
                        <button className={styles.purpleButtons}>Create Free Account</button>
                    </div>
                </div>
            </section>

            <section className={styles.graphsSectionOne}>
                <div className='fullWidth'>
                    <SpendingChart />
                </div>

                <div className='fullWidth'>
                    <SafetoSpend />
                </div>
            </section>
            
            <section className='fullWidth'>
                <div>
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

            <section>
                <div>
                    <DebtChartBarExample />
                </div>
                <div>
                    <div>
                        <h3 className={styles.goalsBarsTitle}>Insights & Alerts</h3>
                        <Image 
                            src="/assets/icons/shineIcon.png"
                            width={20}
                            height={20}
                            alt='Insights Icon'
                        />
                    </div>
                </div>
            </section>
        </div>
    </section>
        
  )
}

export default dashboard