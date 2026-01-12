"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./budgetsPreview.module.css";
import { useRouter } from "next/navigation";

const BudgetsPreview = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const router = useRouter();

  const sampleBills = [
    { id: 1, name: "Netflix", amount: 15.00, dayOfMonth: 10, status: null },
    { id: 2, name: "Spotify", amount: 10.00, dayOfMonth: 30, status: "Due this week" },
    { id: 3, name: "Internet", amount: 65.00, dayOfMonth: 20, status: "Due this week" },
    { id: 4, name: "StateFarm", amount: 23.00, dayOfMonth: 23, status: null }
  ];

  const handleGetStarted = () => {
    router.push("/auth/signup");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.previewPage}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
        <h1>Budget & Bills</h1>
        <p>Manage your weekly safe-to-spend and recurring bills</p>
      </div>

      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <div className={styles.bannerContent}>
          <div className={styles.bannerIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
              <path d="M12 18V6"/>
            </svg>
          </div>
          <div className={styles.bannerText}>
            <h2>See how much you can safely spend each week</h2>
            <p>Connect your accounts to get personalized insights in seconds</p>
          </div>
        </div>
        <button onClick={handleGetStarted} className={styles.signUpButton}>
          Sign Up Free
        </button>
      </div>

      {/* Two Column Layout */}
      <div className={styles.twoColumnLayout}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Safe to Spend Card - Preview (Not Locked) */}
          <div className={styles.safeToSpendCard}>
            <div className={styles.cardHeader}>
              <div className={styles.headerIconCircle}>
                <Image
                  src="/assets/icons/walletIcon.svg"
                  width={24}
                  height={24}
                  alt="safe to spend"
                />
              </div>
              <h2>Safe to Spend This Week</h2>
              <span className={styles.previewBadge}>Preview</span>
            </div>

            <div className={styles.breakdownList}>
              <div className={`${styles.breakdownItem} ${styles.income}`}>
                <div className={styles.breakdownIconCircle}>
                  <Image
                    src="/assets/icons/dollarIcon.svg"
                    width={20}
                    height={20}
                    alt="income"
                  />
                </div>
                <div className={styles.breakdownContent}>
                  <p className={styles.breakdownLabel}>This Week's Income</p>
                  <p className={styles.breakdownSubtext}>Jan 5 - Jan 11</p>
                </div>
                <p className={styles.breakdownAmount}>$1,821.00</p>
              </div>

              <div className={`${styles.breakdownItem} ${styles.spending}`}>
                <div className={styles.breakdownIconCircle}>
                  <Image
                    src="/assets/icons/receiptIcon.svg"
                    width={20}
                    height={20}
                    alt="spending"
                  />
                </div>
                <div className={styles.breakdownContent}>
                  <p className={styles.breakdownLabel}>This Week's Spending</p>
                  <p className={styles.breakdownSubtext}>Jan 5 - Jan 11</p>
                </div>
                <p className={styles.breakdownAmount}>$454.00</p>
              </div>

              <div className={`${styles.breakdownItem} ${styles.bills}`}>
                <div className={styles.breakdownIconCircle}>
                  <Image
                    src="/assets/icons/clipboardIcon.svg"
                    width={20}
                    height={20}
                    alt="bills"
                  />
                </div>
                <div className={styles.breakdownContent}>
                  <p className={styles.breakdownLabel}>Upcoming Bills</p>
                  <p className={styles.breakdownSubtext}>Due this week</p>
                </div>
                <p className={styles.breakdownAmount}>$88.00</p>
              </div>

              <div className={`${styles.breakdownItem} ${styles.buffer}`}>
                <div className={styles.breakdownIconCircle}>
                  <Image
                    src="/assets/icons/walletIcon.svg"
                    width={20}
                    height={20}
                    alt="buffer"
                  />
                </div>
                <div className={styles.breakdownContent}>
                  <p className={styles.breakdownLabel}>Safety Buffer (10%)</p>
                  <p className={styles.breakdownSubtext}>Reserved</p>
                </div>
                <p className={styles.breakdownAmount}>$182.10</p>
              </div>
            </div>

            <div className={styles.breakdownDivider}></div>

            <div className={styles.safeToSpendResult}>
              <div className={styles.resultLabel}>
                <p>Safe to Spend</p>
                <p className={styles.resultFormula}>(Income - Spending - Bills - Buffer)</p>
              </div>
              <h3 className={styles.resultAmount}>$1,096.90</h3>
            </div>
          </div>

          {/* Budget Settings Card - Locked */}
          <div
            className={styles.lockedSection}
            onMouseEnter={() => setHoveredSection('budget')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className={styles.budgetSettingsCard}>
              <div className={styles.cardHeader}>
                <div className={styles.headerIconCircle}>
                  <Image
                    src="/assets/icons/settingsIcon.svg"
                    width={24}
                    height={24}
                    alt="settings"
                  />
                </div>
                <h2>Budget Settings</h2>
                <svg className={styles.lockIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>

              <div className={styles.settingsForm}>
                <div className={styles.settingGroup}>
                  <div className={styles.settingLabelRow}>
                    <div>
                      <label className={styles.settingLabel}>Safety Buffer Percentage</label>
                      <span className={styles.settingHint}>Portion of income to set aside for unexpected expenses</span>
                    </div>
                    <span className={styles.bufferPercentDisplay}>10%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={10}
                    disabled
                    className={styles.bufferSlider}
                    style={{
                      background: `linear-gradient(to right, #38BDF8 0%, #38BDF8 33.33%, #E5E7EB 33.33%, #E5E7EB 100%)`,
                    }}
                  />
                </div>

                <div className={styles.settingGroup}>
                  <div className={styles.settingLabelWithSwitch}>
                    <div className={styles.settingLabel}>
                      <div className={styles.labelTitleRow}>
                        <span>Weekly Budget Goal</span>
                        <span className={styles.optionalText}>(optional)</span>
                      </div>
                      <span className={styles.settingHint}>Target spending limit per week</span>
                    </div>
                    <label className={styles.switch}>
                      <input type="checkbox" checked disabled />
                      <span className={styles.switchSlider}></span>
                    </label>
                  </div>

                  <div className={styles.quickSelectButtons}>
                    <button className={styles.quickSelectBtn} disabled>$300</button>
                    <button className={`${styles.quickSelectBtn} ${styles.active}`} disabled>$500</button>
                    <button className={styles.quickSelectBtn} disabled>$750</button>
                    <button className={styles.quickSelectBtn} disabled>$1000</button>
                    <button className={styles.quickSelectBtn} disabled>Custom</button>
                  </div>

                  <div className={styles.spendingProgress}>
                    <div className={styles.spendingHeader}>
                      <span className={styles.spendingLabel}>Current Spending</span>
                      <span className={styles.spendingAmount}>$454 of $500 (91%)</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: '91%' }}></div>
                    </div>
                  </div>

                  <div className={styles.budgetInsights}>
                    <div className={styles.insightBox}>
                      <div className={styles.insightIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M8 2v4"/>
                          <path d="M16 2v4"/>
                          <rect width="18" height="18" x="3" y="4" rx="2"/>
                          <path d="M3 10h18"/>
                        </svg>
                      </div>
                      <div className={styles.insightContent}>
                        <span className={styles.insightLabel}>DAYS LEFT</span>
                        <span className={styles.insightValue}>6</span>
                        <span className={styles.insightSubtext}>until week ends</span>
                      </div>
                    </div>
                    <div className={styles.insightBox}>
                      <div className={styles.insightIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
                          <path d="M12 18V6"/>
                        </svg>
                      </div>
                      <div className={styles.insightContent}>
                        <span className={styles.insightLabel}>DAILY LIMIT</span>
                        <span className={styles.insightValue}>$83.33</span>
                        <span className={styles.insightSubtext}>remaining per day</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.conversionText}>Weekly: $500 → Daily: $83.33</div>
                  <button className={styles.saveSettingsButton} disabled>Update Budget Goal</button>
                  <button className={styles.deleteBudgetLink} disabled>Delete budget goal</button>
                </div>
              </div>
            </div>

            {hoveredSection === 'budget' && (
              <div className={styles.lockOverlay}>
                <div className={styles.lockContent}>
                  <div className={styles.lockIconLarge}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <p className={styles.lockMessage}>Sign in to set your budget</p>
                  <button onClick={handleGetStarted} className={styles.getStartedButton}>Get Started</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Recurring Bills Card - Locked */}
          <div
            className={styles.lockedSection}
            onMouseEnter={() => setHoveredSection('bills')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className={styles.recurringBillsCard}>
              <div className={styles.cardHeader}>
                <div className={styles.headerIconCircle}>
                  <Image
                    src="/assets/icons/calendarIcon.svg"
                    width={24}
                    height={24}
                    alt="recurring bills"
                  />
                </div>
                <h2>Recurring Bills</h2>
                <svg className={styles.lockIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>

              <button className={styles.addBillButton} disabled>
                <span>+</span>
                Add Recurring Bill
              </button>

              <h3 className={styles.billSectionHeader}>All Recurring Bills:</h3>

              <div className={styles.billsList}>
                {sampleBills.map((bill) => (
                  <div key={bill.id} className={styles.billItem}>
                    <div className={styles.billIconCircle}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>
                        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
                      </svg>
                    </div>
                    <div className={styles.billInfo}>
                      <p className={styles.billName}>
                        {bill.name}
                        {bill.status && (
                          <span className={styles.billStatusBadge}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                              <path d="M12 8v4"/>
                              <path d="M12 16h.01"/>
                            </svg>
                            {bill.status}
                          </span>
                        )}
                      </p>
                      <p className={styles.billMeta}>Every {bill.dayOfMonth}</p>
                    </div>
                    <p className={styles.billAmount}>${bill.amount.toFixed(2)}</p>
                    <div className={styles.billActions}>
                      <button className={styles.editButton} disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                        </svg>
                      </button>
                      <button className={styles.deleteButton} disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 11v6"/>
                          <path d="M14 11v6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                          <path d="M3 6h18"/>
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.billsTotal}>
                <span className={styles.billsTotalLabel}>Total Monthly Bills</span>
                <span className={styles.billsTotalAmount}>$113.00</span>
              </div>
            </div>

            {hoveredSection === 'bills' && (
              <div className={styles.lockOverlay}>
                <div className={styles.lockContent}>
                  <div className={styles.lockIconLarge}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <p className={styles.lockMessage}>Sign in to track your bills</p>
                  <button onClick={handleGetStarted} className={styles.getStartedButton}>Get Started</button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Insights Card - Locked */}
          <div
            className={styles.lockedSection}
            onMouseEnter={() => setHoveredSection('insights')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className={styles.statsCard}>
              <div className={styles.cardHeader}>
                <div className={styles.headerIconCircle}>
                  <Image
                    src="/assets/icons/trendingUpBlue.svg"
                    width={24}
                    height={24}
                    alt="stats"
                  />
                </div>
                <h2>Quick Insights</h2>
                <svg className={styles.lockIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>

              <div className={styles.statItem}>
                <span className={styles.statLabel}>% of Income Available</span>
                <span className={styles.statValue}>60.2%</span>
              </div>

              <div className={styles.statItem}>
                <span className={styles.statLabel}>Bills Percentage</span>
                <span className={styles.statValue}>29.8%</span>
              </div>
            </div>

            {hoveredSection === 'insights' && (
              <div className={styles.lockOverlay}>
                <div className={styles.lockContent}>
                  <div className={styles.lockIconLarge}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <p className={styles.lockMessage}>Sign in to view insights</p>
                  <button onClick={handleGetStarted} className={styles.getStartedButton}>Get Started</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BudgetsPreview;
