"use client"

import React from 'react'
import { useState } from 'react'
const dashboard = () => {

const [balance, setBalance] = useState(24322);
const [monthlyIncome, setMonthlyIncome] = useState(5240);
const [monthlyExpenses, setMonthlyExpenses] = useState(3890);

  return (
    <section className='dashboardContent'>
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
        </section>
    </section>    
  )
}

export default dashboard