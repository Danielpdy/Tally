import React from 'react'
import { useState } from 'react'
const dashboard = () => {

const [balance, setBalance] = useState();
const [monthlyIncome, setMonthlyIncome] = useState();
const [monthlyExpenses, setMonthlyExpenses] = useState();

  return (
    <section className='dashboardContent'>
        <section className='FirstRowDash'>
            <div className='firstrowBoxes'>
                <p>Total Balance</p>
                <h2>${balance}</h2>
                <p>Updated just now</p>
            </div>

            <div className='firstrowBoxes'>
                <p>Monthly Flow</p>
                <div>
                    <div>
                        <div>
                            <img src="" alt="" />
                            <p>${monthlyIncome}</p>
                        </div>
                        <p>Income</p>
                    </div>  
                    <div>
                        <div>
                            <img src="" alt="" />
                            <p>${monthlyExpenses}</p>
                        </div>
                        <p>Expenses</p>
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