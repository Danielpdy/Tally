"use client"

import React from 'react'
import { useState } from 'react'
import SpendingChart from '@app/components/SpendingChart';
import SafetoSpend from '@app/components/SafetoSpend';

const dashboard = () => {

const [balance, setBalance] = useState(24322);
const [monthlyIncome, setMonthlyIncome] = useState(5240);
const [monthlyExpenses, setMonthlyExpenses] = useState(3890);

  return (
    <section className='dashboardContent'>
        <div className='dashboardMain'>
            <section className='mainMessage'>
                <div className='mainMessage-content'>
                    <div className='financialFreedom'>Financial Freedom Starts Here</div>
                    <h1 className='bigTitles textAlign'>Take Control of Your Money</h1>
                    <div>
                        <p className='smallText textAlign'>Track spending, crush goals, and build wealth with AI-powered
                            insights.
                        </p>
                        <p className='smallText textAlign'>
                            Sign up to unlock all features below
                        </p>
                    </div>
                    <div className='mainMessage-boxBtns'>
                        <button className='purpleButtons'>Start Free Trial</button>
                        <button className='whiteButton'>Watch Demo</button>
                    </div>
                    <p className='smallerText'>No credit card required • 14-day free trial • Cancel anytime</p>
                </div>

                <div className='mainMessage-content'>
                    <h2 className='subTitles'
                    style={{textAlign: "center", fontSize:"2.5rem", color: "#1a0b2e"}}
                    >Everything You Need to Master Your Finances</h2>
                    <p className='smallText'
                    style={{textAlign:"center"}}
                    >See what awaits you inside. Sign up to start tracking today.</p>
                </div>
            </section>

            
            <section className='firstRowDash'>
                <div className='firstrowBoxes'>
                    <p className='smallerText'>Total Balance</p>
                    <h2>${balance}</h2>
                    <p className='smallerText'>Updated just now</p>
                </div>

                <div className='firstrowBoxes'>
                    <p className='smallerText'>Monthly Flow</p>
                    <div className='fullWidth'>
                        <div className='monthlyFlowNumbers'>
                            <div className='monthlyData'>
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
                        <div className='monthlyFlowNumbers'>
                            <div className='monthlyData'>
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

                <div className='firstrowBoxes'>
                    <div>
                        <img src="" alt="" />
                        <p>Especial Fund</p>
                    </div>
                </div>

                <div class="premium-overlay">
                    <div class="unlock-message">
                        <div class="lock-icon">
                            <img src="./assets/icons/lockIcon.svg"
                            width={60}
                            height={60}
                            alt="" />
                        </div>
                        <h3 className='subTitles'>Sign Up to Unlock</h3>
                        <button className='purpleButtons'>Create Free Account</button>
                    </div>
                </div>
            </section>

            <section className='graphsSectionOne'>
                <div className='fullWidth'>
                    <SpendingChart />
                </div>

                <div className='fullWidth'>
                    <SafetoSpend />
                </div>
            </section>
        </div>
    </section>
        
  )
}

export default dashboard