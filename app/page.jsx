"use client"

import { signIn, useSession } from "next-auth/react";

export default function Home() {

  const {data: session, status } = useSession();

  return (
    <section className="main">
      <section className="gradient homeSection-main">
        <div className="homeContent">
          <h1 className="bigTitles">Tally — Simple cashflow for small businesses</h1>
          <p className="regularText">Import bank CSVs, track cashflow, and manage budgets — fast and private.</p>

          {session ? (
          <></>
          ) : (
            <div className="googleAndGithub">
              <button className="darkButton alignItems"
                onClick={() => signIn()}>
                <img src="/assets/icons/googleIcon.png" 
                width={24}
                height={24}
                alt="Google" />
                Sign in with Google
              </button>
              <button className="darkButton alignItems"
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
           <img src="/assets/icons/images/homePage.png" className="homePageimg"/>
        </div>
      </section>

      <section className="homeSection-services">
        <div className="boxServices">
          <img src="/assets/icons/uploadCVSIcon.png" alt="Import CVSs" />
          <div>
            <label className="subTitles">Import CSVs</label>
            <p className="smallText">Upload bank CSVs and bulk import transactions.</p>
          </div>
        </div>

        <div className="boxServices">
          <img src="/assets/icons/quickInsightsIcon.png" alt="Quick Insights" />
          <div>
            <label className="subTitles">Quick Insights</label>
            <p className="smallText">See balance, monthly inflows/outflows and alerts.</p>
          </div>
        </div>

        <div className="boxServices">
          <img src="/assets/icons/manualEntryIcon.png" alt="Manual Entry & Budgets" />
          <div>
            <label className="subTitles">Manual entry & budgets</label>
            <p className="smallText">Add transactions manually and set simple budgets.</p>
          </div>
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
