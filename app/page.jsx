"use client"

import { signIn, useSession } from "next-auth/react";

export default function Home() {

  const {data: session, status } = useSession();

  return (
    <section className="main">
      <section className="gradient homeSection-main">
        <div className="homeContent">
          <div className="cashflowSpan">
            <img src="/assets/icons/shineIcon.png" 
            width={14}
            height={14}
            alt="shine" />
            <p>Simple cashflow management</p>
          </div>
          <h1 className="bigTitles flex maxWidth">
            Tally — Simple cashflow for small businesses
          </h1>
          <p className="regularText">Import bank CSVs, track cashflow, and manage budgets — fast and private.</p>

          {session ? (
          <></>
          ) : (
            <div className="googleAndGithub">
              <button className="darkButton alignItems"
                onClick={() => signIn()}>
                <img src="/assets/icons/googleIcon.svg" 
                width={24}
                height={24}
                alt="Google" />
                Sign in with Google
              </button>
              <button className="whiteButton alignItems"
                onClick={() => signIn()}>
                <img src="/assets/icons/githubIcon.png" 
                alt="Github"
                width={24}
                height={24}/>
                Sign in with GitHub
              </button>
            </div>
          )}
          <p className="smallText">No bank-connected billing required - CSV import only.</p>
        </div>

        {/* Code-based Photomontage */}
        <div className="heroCollage">
          {/* Health Score Card */}
          <div className="collageCard healthCard">
            <div className="healthScoreCircle">
              <svg viewBox="0 0 100 100" className="scoreRing">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E9D5FF" strokeWidth="8"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#8B5CF6" strokeWidth="8"
                  strokeDasharray="200" strokeDashoffset="45" strokeLinecap="round"
                  transform="rotate(-90 50 50)"/>
              </svg>
              <div className="scoreValue">78</div>
              <div className="scoreLabel">SCORE</div>
            </div>
            <div className="healthInfo">
              <h4>Very Good Health</h4>
              <p>Your financial habits are consistent.</p>
            </div>
          </div>

          {/* Balance Card */}
          <div className="collageCard balanceCard">
            <div className="balanceHeader">
              <span>Total Balance</span>
              <div className="balanceDot"></div>
            </div>
            <div className="balanceAmount">$24,322</div>
            <div className="balanceUpdated">Updated just now</div>
          </div>

          {/* Safe to Spend Card */}
          <div className="collageCard safeSpendCard">
            <div className="safeHeader">
              <span>Safe to Spend</span>
              <span className="weeklyBadge">Weekly</span>
            </div>
            <div className="safeCircle">
              <svg viewBox="0 0 80 80" className="safeRing">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#E0F7FA" strokeWidth="6"/>
                <circle cx="40" cy="40" r="32" fill="none" stroke="#00D4FF" strokeWidth="6"
                  strokeDasharray="145" strokeDashoffset="40" strokeLinecap="round"
                  transform="rotate(-90 40 40)"/>
              </svg>
              <div className="safePercent">72%</div>
            </div>
            <div className="safeAmount">$1,350.00</div>
            <div className="safeStatus">You're tracking well!</div>
          </div>

          {/* Monthly Summary Card */}
          <div className="collageCard summaryCard">
            <div className="summaryHeader">
              <span>Monthly Summary</span>
              <span className="monthBadge">December</span>
            </div>
            <div className="summaryRow">
              <div className="summaryIcon incomeIcon">💰</div>
              <div className="summaryText">
                <span className="summaryLabel">INCOME</span>
                <span>You earned <strong>$4,850</strong> this month</span>
              </div>
            </div>
            <div className="summaryRow">
              <div className="summaryIcon expenseIcon">📊</div>
              <div className="summaryText">
                <span className="summaryLabel">EXPENSES</span>
                <span>You spent <strong>$3,720</strong> across 47 transactions</span>
              </div>
            </div>
          </div>

          {/* Financial Goals Card */}
          <div className="collageCard goalsCard">
            <div className="goalsHeader">Financial Goals</div>
            <div className="goalsRow">
              <div className="goalCircle">
                <svg viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#E9D5FF" strokeWidth="5"/>
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#8B5CF6" strokeWidth="5"
                    strokeDasharray="128" strokeDashoffset="19" strokeLinecap="round"
                    transform="rotate(-90 30 30)"/>
                </svg>
                <span className="goalPercent">85%</span>
              </div>
              <div className="goalInfo">
                <span className="goalName">Emergency Fund</span>
                <span className="goalAmount">$6,300 / $10,500</span>
              </div>
            </div>
          </div>

          {/* Cash Flow Timeline Chart Card */}
          <div className="collageCard chartCard">
            <div className="chartHeader">
              <span className="chartTitle">Cash Flow Timeline</span>
              <span className="chartBadge">February</span>
            </div>
            <div className="chartArea">
              <svg viewBox="0 0 280 120" className="lineChart">
                {/* Grid lines */}
                <line x1="0" y1="30" x2="280" y2="30" stroke="#f1f5f9" strokeWidth="1"/>
                <line x1="0" y1="60" x2="280" y2="60" stroke="#f1f5f9" strokeWidth="1"/>
                <line x1="0" y1="90" x2="280" y2="90" stroke="#f1f5f9" strokeWidth="1"/>

                {/* Balance line (cyan) */}
                <path
                  d="M 0,50 Q 35,45 70,15 T 140,35 T 210,50 T 280,80"
                  fill="none"
                  stroke="#00D4FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Earnings line (purple) */}
                <path
                  d="M 0,60 Q 35,55 70,25 T 140,50 T 210,30 T 280,35"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Spendings line (orange) */}
                <path
                  d="M 0,40 Q 35,50 70,55 T 140,45 T 210,40 T 280,30"
                  fill="none"
                  stroke="#FB923C"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Data points */}
                <circle cx="0" cy="50" r="4" fill="#00D4FF"/>
                <circle cx="70" cy="15" r="4" fill="#00D4FF"/>
                <circle cx="140" cy="35" r="4" fill="#00D4FF"/>
                <circle cx="210" cy="50" r="4" fill="#00D4FF"/>
                <circle cx="280" cy="80" r="4" fill="#00D4FF"/>

                <circle cx="0" cy="60" r="4" fill="#8B5CF6"/>
                <circle cx="70" cy="25" r="4" fill="#8B5CF6"/>
                <circle cx="140" cy="50" r="4" fill="#8B5CF6"/>
                <circle cx="210" cy="30" r="4" fill="#8B5CF6"/>
                <circle cx="280" cy="35" r="4" fill="#8B5CF6"/>

                <circle cx="0" cy="40" r="4" fill="#FB923C"/>
                <circle cx="70" cy="55" r="4" fill="#FB923C"/>
                <circle cx="140" cy="45" r="4" fill="#FB923C"/>
                <circle cx="210" cy="40" r="4" fill="#FB923C"/>
                <circle cx="280" cy="30" r="4" fill="#FB923C"/>
              </svg>
            </div>
            <div className="chartLegend">
              <div className="legendItem">
                <span className="legendDot" style={{background: '#00D4FF'}}></span>
                <span>Balance</span>
              </div>
              <div className="legendItem">
                <span className="legendDot" style={{background: '#8B5CF6'}}></span>
                <span>Earnings</span>
              </div>
              <div className="legendItem">
                <span className="legendDot" style={{background: '#FB923C'}}></span>
                <span>Spendings</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="featuresSection">
        <div className="featuresHeader">
          <h2 className="featuresTitle">Take control of your cashflow</h2>
          <p className="featuresSubtitle">
            Import your bank statements, track spending patterns, set budgets,
            and get personalized insights — all in one simple dashboard.
          </p>
        </div>

        <div className="featuresGrid">
          {/* Feature Card 1 - Financial Goals */}
          <div className="featureCard">
            <h3 className="featureCardTitle">Financial Goals</h3>
            <p className="featureCardDesc">
              Set savings targets for emergencies, vacations, or big purchases. Track your progress and stay motivated.
            </p>
            <div className="featureVisual goalsVisual">
              <div className="goalProgressItem">
                <div className="goalProgressCircle">
                  <svg viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="24" fill="none" stroke="#E9D5FF" strokeWidth="5"/>
                    <circle cx="30" cy="30" r="24" fill="none" stroke="#8B5CF6" strokeWidth="5"
                      strokeDasharray="128" strokeDashoffset="19" strokeLinecap="round"
                      transform="rotate(-90 30 30)"/>
                  </svg>
                  <span className="goalProgressPercent">85%</span>
                </div>
                <div className="goalProgressInfo">
                  <span className="goalProgressName">Emergency Fund</span>
                  <span className="goalProgressAmount">$8,500 / $10,000</span>
                </div>
              </div>
              <div className="goalProgressItem">
                <div className="goalProgressCircle">
                  <svg viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="24" fill="none" stroke="#E0F7FA" strokeWidth="5"/>
                    <circle cx="30" cy="30" r="24" fill="none" stroke="#00D4FF" strokeWidth="5"
                      strokeDasharray="128" strokeDashoffset="64" strokeLinecap="round"
                      transform="rotate(-90 30 30)"/>
                  </svg>
                  <span className="goalProgressPercent">50%</span>
                </div>
                <div className="goalProgressInfo">
                  <span className="goalProgressName">Vacation</span>
                  <span className="goalProgressAmount">$1,500 / $3,000</span>
                </div>
              </div>
              <div className="goalProgressItem">
                <div className="goalProgressCircle">
                  <svg viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="24" fill="none" stroke="#FEF3C7" strokeWidth="5"/>
                    <circle cx="30" cy="30" r="24" fill="none" stroke="#FB923C" strokeWidth="5"
                      strokeDasharray="128" strokeDashoffset="96" strokeLinecap="round"
                      transform="rotate(-90 30 30)"/>
                  </svg>
                  <span className="goalProgressPercent">25%</span>
                </div>
                <div className="goalProgressInfo">
                  <span className="goalProgressName">New Laptop</span>
                  <span className="goalProgressAmount">$400 / $1,600</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 2 - Health Score */}
          <div className="featureCard">
            <h3 className="featureCardTitle">Financial Health Score</h3>
            <p className="featureCardDesc">
              Get a personalized health score based on your spending habits, savings rate, and financial consistency.
            </p>
            <div className="featureVisual gaugeVisual">
              <svg viewBox="0 0 120 80" className="gaugeChart">
                {/* Background track */}
                <path d="M 15 65 A 45 45 0 0 1 105 65" fill="none" stroke="#E9D5FF" strokeWidth="10" strokeLinecap="round"/>
                {/* Orange section (poor) */}
                <path d="M 15 65 A 45 45 0 0 1 35 30" fill="none" stroke="#FB923C" strokeWidth="10" strokeLinecap="round"/>
                {/* Purple section (good - main progress) */}
                <path d="M 35 30 A 45 45 0 0 1 90 35" fill="none" stroke="#8B5CF6" strokeWidth="10" strokeLinecap="round"/>
                {/* Needle center */}
                <circle cx="60" cy="65" r="5" fill="#1a0b2e"/>
                {/* Needle */}
                <line x1="60" y1="65" x2="82" y2="42" stroke="#1a0b2e" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Needle tip */}
                <circle cx="82" cy="42" r="3" fill="#1a0b2e"/>
              </svg>
              <div className="gaugeLabels">
                <span style={{color: '#FB923C'}}>Poor</span>
                <span className="gaugeScore">78</span>
                <span style={{color: '#8B5CF6'}}>Excellent</span>
              </div>
            </div>
          </div>

          {/* Feature Card 3 - Budget Tracking (Large) */}
          <div className="featureCard featureCardLarge">
            <h3 className="featureCardTitle">Smart Budget Tracking</h3>
            <p className="featureCardDesc">
              Create custom budgets by category, track spending in real-time, and receive alerts before you overspend.
            </p>
            <div className="featureVisual budgetVisual">
              <div className="budgetStats">
                <div className="budgetStat">
                  <span className="budgetStatLabel">Monthly Budget</span>
                  <span className="budgetStatValue">$4,500</span>
                </div>
                <div className="budgetStat">
                  <span className="budgetStatLabel">Remaining</span>
                  <span className="budgetStatValue budgetRemaining">$1,280</span>
                </div>
              </div>
              <div className="budgetProgress">
                <div className="budgetProgressLabel">
                  <span>$3,220 Spent</span>
                  <span>72%</span>
                </div>
                <div className="budgetProgressBar">
                  <div className="budgetProgressFill" style={{width: '72%'}}></div>
                </div>
              </div>
              <div className="budgetChart">
                <div className="budgetChartBars">
                  <div className="budgetChartBar">
                    <div className="barFill" style={{height: '85%', background: '#FB923C'}}></div>
                    <span>Food</span>
                  </div>
                  <div className="budgetChartBar">
                    <div className="barFill" style={{height: '60%', background: '#8B5CF6'}}></div>
                    <span>Bills</span>
                  </div>
                  <div className="budgetChartBar">
                    <div className="barFill" style={{height: '45%', background: '#00D4FF'}}></div>
                    <span>Transport</span>
                  </div>
                  <div className="budgetChartBar">
                    <div className="barFill" style={{height: '70%', background: '#8B5CF6'}}></div>
                    <span>Shopping</span>
                  </div>
                  <div className="budgetChartBar">
                    <div className="barFill" style={{height: '30%', background: '#FB923C'}}></div>
                    <span>Other</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Card 4 - Recurring Bills */}
          <div className="featureCard">
            <h3 className="featureCardTitle">Recurring Bills</h3>
            <p className="featureCardDesc">
              Never miss a payment. Track all your recurring bills and get reminders before due dates.
            </p>
            <div className="featureVisual billsVisual">
              <div className="billItem">
                <div className="billIcon" style={{background: '#F3E8FF'}}>
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#8B5CF6" strokeWidth="2"/>
                    <path d="M2 10h20" stroke="#8B5CF6" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="billInfo">
                  <span className="billName">Netflix</span>
                  <span className="billDate">Due in 3 days</span>
                </div>
                <span className="billAmount">-$15.99</span>
              </div>
              <div className="billItem">
                <div className="billIcon" style={{background: '#E0F7FA'}}>
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#00D4FF" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="billInfo">
                  <span className="billName">Rent</span>
                  <span className="billDate">Due in 7 days</span>
                </div>
                <span className="billAmount">-$1,200</span>
              </div>
              <div className="billItem">
                <div className="billIcon" style={{background: '#FEF3C7'}}>
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="#FB923C" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="billInfo">
                  <span className="billName">Insurance</span>
                  <span className="billDate">Due in 12 days</span>
                </div>
                <span className="billAmount">-$89.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>


    </section>
  );
}
