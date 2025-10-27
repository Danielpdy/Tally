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

        <div>
          <div className="floating-cards-wrapper">
            {/* Balance Card */}
            <div className="card float-1">
              <div className="card-header">
                <span className="card-label">Balance</span>
                <div className="dot dot-purple"></div>
              </div>
              <div className="balance-text">$24,582.00</div>
            </div>

            {/* Monthly Flow Card */}
            <div className="card float-2">
              <div className="card-header">
                <span className="card-label">Monthly Flow</span>
                <div className="dot dot-orange"></div>
              </div>
              <div className="flow-text">
                +$4,230
                <span className="percentage">+18%</span>
              </div>
            </div>

            {/* Progress Bars Card */}
            <div className="card float-3">
              <div className="bars-container">
                {/* Purple Bar */}
                <div className="bar-row">
                  <div className="bar-dot bar-dot-purple"></div>
                  <div className="bar-bg">
                    <div className="bar-fill bar-fill-purple"></div>
                  </div>
                </div>

                {/* Cyan Bar */}
                <div className="bar-row">
                  <div className="bar-dot bar-dot-cyan"></div>
                  <div className="bar-bg">
                    <div className="bar-fill bar-fill-cyan"></div>
                  </div>
                </div>

                {/* Orange Bar */}
                <div className="bar-row">
                  <div className="bar-dot bar-dot-orange"></div>
                  <div className="bar-bg">
                    <div className="bar-fill bar-fill-orange"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      <section className="homeSection-services">
        <div className="boxServices card-purple">
          <img src="/assets/icons/importIcon.svg"
          width={54}
          height={54}
          alt="Import CVSs" />
          <div className="homeSec-text">
            <label className="subTitles">Import CSVs</label>
            <p className="smallText">Upload bank CSVs and bulk import transactions.</p>
          </div>
          <div className="gradient-line"></div>
        </div>

        <div className="boxServices card-blue">
          <img src="/assets/icons/quickInsightsIcon.svg" 
          width={54}
          height={54}
          alt="Quick Insights" />
          <div className="homeSec-text">
            <label className="subTitles">Quick Insights</label>
            <p className="smallText">See balance, monthly inflows/outflows and alerts.</p>
          </div>
          <div className="gradient-line"></div>
        </div>

        <div className="boxServices card-orange">
          <img src="/assets/icons/manualEntryIcon.svg" 
          width={54}
          height={54}
          alt="Manual Entry & Budgets" />
          <div className="homeSec-text">
            <label className="subTitles">Manual entry & budgets</label>
            <p className="smallText">Add transactions manually and set simple budgets.</p>
          </div>
          <div className="gradient-line"></div>
        </div>
      </section>

      <section className="homeSection-howItWorks">
        <h1 className="bigTitles">How it works</h1>

        <div className="howItWorksBox">
          <div className="howItWorks">
            <label className="howItWorksNumbers">1</label>
            <label className="subTitles">Export CSV from bank</label>
            <p className="smallText">Download your transaction history as a CSV file from your bank</p>
          </div>

          <div className="howItWorks">
            <label className="howItWorksNumbers">2</label>
            <label className="subTitles">Upload & map columns</label>
            <p className="smallText">Upload your CSV and map the columns to match your data</p>
          </div>

          <div className="howItWorks">
            <label className="howItWorksNumbers">3</label>
            <label className="subTitles">Review and categorize</label>
            <p className="smallText">Review your transactions, categorize them, and add any missing details</p>
          </div>
        </div>
      </section>

      
    </section>
  );
}
