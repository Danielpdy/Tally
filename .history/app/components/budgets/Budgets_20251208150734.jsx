"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import styles from "./budgets.module.css";
import { GetTransactions } from "@services/TransactionService";
import { useSession } from "@node_modules/next-auth/react";
import { GetRecurringBills } from "@services/RecurringBillsService";

const Budgets = () => {
  const [bufferPercent, setBufferPercent] = useState(10);
  const [weeklyBudget, setWeeklyBudget] = useState("");
  const [recurringBills, setRecurringBills] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showBudget, setShowBudget] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [billForm, setBillForm] = useState({
    name: "",
    amount: "",
    dayOfMonth: "",
    category: ""
  });
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      getTransactions();
    }
  }, [session?.accessToken]);

  const getTransactions = async () => {
    try {
      setIsLoading(true);
      setIsError(null);
      const result = await GetTransactions(session.accessToken);
      if (Array.isArray(result)) {
        setTransactions(result);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error(error);
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRecurringBills = async () => {
    try{
      const result = await GetRecurringBills(session.accessToken);
      setRecurringBills(result);
    } catch(error){
      console.error(error);
    }
  }

  const weeklyEarnings = useMemo(() => {
    return transactions.reduce(
      (sum, transaction) =>
        transaction.type === "Income" ? sum + transaction.amount : sum,
      0
    );
  }, [transactions]);

  const weeklySpendings = useMemo(() => {
    return transactions.reduce(
      (sum, transaction) =>
        transaction.type === "Expense" ? sum + transaction.amount : sum,
      0
    );
  }, [transactions]);

  const openWeeklyBudget = () => {
    setShowBudget(!showBudget);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillForm(prev => ({...prev, [name]: value}));
  }

  return (
    <>
      <div className={styles.budgetPage}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1>Budget & Bills</h1>
          <p>Manage your weekly safe-to-spend and recurring bills</p>
        </div>

        {/* Two Column Layout */}
        <div className={styles.twoColumnLayout}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Safe to Spend Breakdown Card */}
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
              </div>

              <div className={styles.breakdownList}>
                {isLoading && (
                  <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p className={styles.loadingText}>
                      Loading your budget data...
                    </p>
                  </div>
                )}
                {isError && (
                  <div className={styles.errorContainer}>
                    <div className={styles.errorIcon}>!</div>
                    <p className={styles.errorText}>
                      {isError?.message || "Failed to load transactions"}
                    </p>
                    <button
                      className={styles.retryButton}
                      onClick={getTransactions}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {!isLoading && !isError && (
                  <>
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
                        <p className={styles.breakdownLabel}>
                          This Week's Income
                        </p>
                        <p className={styles.breakdownSubtext}>Dec 9-15</p>
                      </div>
                      <p className={styles.breakdownAmount}>
                        ${weeklyEarnings}
                      </p>
                    </div>

                    <div
                      className={`${styles.breakdownItem} ${styles.spending}`}
                    >
                      <div className={styles.breakdownIconCircle}>
                        <Image
                          src="/assets/icons/receiptIcon.svg"
                          width={20}
                          height={20}
                          alt="spending"
                        />
                      </div>
                      <div className={styles.breakdownContent}>
                        <p className={styles.breakdownLabel}>
                          This Week's Spending
                        </p>
                        <p className={styles.breakdownSubtext}>Dec 9-15</p>
                      </div>
                      <p className={styles.breakdownAmount}>
                        ${weeklySpendings}
                      </p>
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
                      <p className={styles.breakdownAmount}>${}</p>
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
                        <p className={styles.breakdownLabel}>
                          Safety Buffer ({bufferPercent}%)
                        </p>
                        <p className={styles.breakdownSubtext}>Reserved</p>
                      </div>
                      <p className={styles.breakdownAmount}>${}</p>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.breakdownDivider}></div>

              <div className={styles.safeToSpendResult}>
                <div className={styles.resultLabel}>
                  <p>Safe to Spend</p>
                  <p className={styles.resultFormula}>
                    (Income - Spending - Bills - Buffer)
                  </p>
                </div>
                <h3 className={`${styles.resultAmount}`}>${}</h3>
              </div>
            </div>

            {/* Budget Settings Card */}
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
              </div>

              <div className={styles.settingsForm}>
                {/* Safety Buffer Percentage */}
                <div className={styles.settingGroup}>
                  <div className={styles.settingLabelRow}>
                    <div>
                      <label className={styles.settingLabel}>
                        Safety Buffer Percentage
                      </label>
                      <span className={styles.settingHint}>
                        Portion of income to set aside for unexpected expenses
                      </span>
                    </div>
                    <span className={styles.bufferPercentDisplay}>
                      {bufferPercent}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={bufferPercent}
                    onChange={(e) => setBufferPercent(Number(e.target.value))}
                    className={styles.bufferSlider}
                    style={{
                      background: `linear-gradient(to right, #38BDF8 0%, #38BDF8 ${
                        (bufferPercent / 30) * 100
                      }%, #E5E7EB ${
                        (bufferPercent / 30) * 100
                      }%, #E5E7EB 100%)`,
                    }}
                  />
                </div>

                {/* Weekly Budget Goal */}

                <div className={styles.settingGroup}>
                  <div className={styles.settingLabelWithSwitch}>
                    <div className={styles.settingLabel}>
                      <div className={styles.labelTitleRow}>
                        <span>Weekly Budget Goal</span>
                        <span className={styles.optionalText}>(optional)</span>
                      </div>
                      <span className={styles.settingHint}>
                        Target spending limit per week
                      </span>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        value={showBudget}
                        onChange={openWeeklyBudget}
                      />
                      <span className={styles.switchSlider}></span>
                    </label>
                  </div>

                  {/* Quick Select Buttons */}
                  {showBudget && (
                    <>
                      <div className={styles.quickSelectButtons}>
                        <button className={styles.quickSelectBtn}>$300</button>
                        <button
                          className={`${styles.quickSelectBtn} ${styles.active}`}
                        >
                          $500
                        </button>
                        <button className={styles.quickSelectBtn}>$750</button>
                        <button className={styles.quickSelectBtn}>$1000</button>
                        <button className={styles.quickSelectBtn}>
                          Custom
                        </button>
                      </div>

                      {/* Budget Input */}
                      <div className={styles.budgetInputWrapper}>
                        <span className={styles.dollarSign}>$</span>
                        <input
                          type="number"
                          step="0.01"
                          value={weeklyBudget}
                          onChange={(e) => setWeeklyBudget(e.target.value)}
                          className={styles.budgetInputLarge}
                          placeholder="500"
                        />
                        <span className={styles.perWeek}>/week</span>
                      </div>

                      {/* Current Spending Progress */}
                      <div className={styles.spendingProgress}>
                        <div className={styles.spendingHeader}>
                          <span className={styles.spendingLabel}>
                            Current Spending
                          </span>
                          <span className={styles.spendingAmount}>
                            $320.00 of $500.00 (64%)
                          </span>
                        </div>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: "64%" }}
                          ></div>
                        </div>
                      </div>

                      {/* Days Left and Daily Limit */}
                      <div className={styles.budgetInsights}>
                        <div className={styles.insightBox}>
                          <div className={styles.insightIcon}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#38BDF8"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M8 2v4" />
                              <path d="M16 2v4" />
                              <rect width="18" height="18" x="3" y="4" rx="2" />
                              <path d="M3 10h18" />
                            </svg>
                          </div>
                          <div className={styles.insightContent}>
                            <span className={styles.insightLabel}>
                              DAYS LEFT
                            </span>
                            <span className={styles.insightValue}>4</span>
                            <span className={styles.insightSubtext}>
                              until week ends
                            </span>
                          </div>
                        </div>
                        <div className={styles.insightBox}>
                          <div className={styles.insightIcon}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#38BDF8"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                              <path d="M12 18V6" />
                            </svg>
                          </div>
                          <div className={styles.insightContent}>
                            <span className={styles.insightLabel}>
                              DAILY LIMIT
                            </span>
                            <span className={styles.insightValue}>$45.00</span>
                            <span className={styles.insightSubtext}>
                              remaining per day
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Success Message */}
                      <div className={styles.budgetStatusMessage}>
                        <div className={styles.statusIcon}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 16v5" />
                            <path d="M16 14v7" />
                            <path d="M20 10v11" />
                            <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
                            <path d="M4 18v3" />
                            <path d="M8 14v7" />
                          </svg>
                        </div>
                        <div className={styles.statusContent}>
                          <span className={styles.statusTitle}>
                            You're on track!
                          </span>
                          <span className={styles.statusText}>
                            Keep spending under $45.00/day to stay within budget
                          </span>
                        </div>
                      </div>

                      {/* Weekly to Daily Conversion */}
                      <div className={styles.conversionText}>
                        Weekly: $500.00 → Daily: $71.43
                      </div>
                    </>
                  )}
                </div>

                <button className={styles.saveSettingsButton}>
                  Save Settings
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Recurring Bills Manager Card */}
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
              </div>

              <button
                className={styles.addBillButton}
                onClick={() => setShowModal(true)}
              >
                <span>+</span>
                Add Recurring Bill
              </button>

              {!recurringBills && (
                <div className={styles.emptyBillsState}>
                  <div className={styles.emptyBillsIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                    </svg>
                  </div>
                  <p className={styles.emptyBillsTitle}>
                    No recurring bills yet
                  </p>
                  <p className={styles.emptyBillsSubtitle}>
                    Add your first bill to get started
                  </p>
                </div>
              )}

              {recurringBills && (
                <>
                  <h3 className={styles.billSectionHeader}>
                    All Recurring Bills:
                  </h3>

                  <div className={styles.billsList}>
                    {recurringBills.map((bill) => (
                      <div key={bill.id} className={styles.billItem}>
                        <div className={styles.billIconCircle}>
                          <Image
                            src="/assets/icons/creditCardIcon.svg"
                            width={20}
                            height={20}
                            alt="bill"
                          />
                        </div>
                        <div className={styles.billInfo}>
                          <p className={styles.billName}>
                            {bill.name}
                            {bill.status && (
                              <span
                                className={`${styles.billStatusBadge} ${
                                  styles[bill.status]
                                }`}
                              >
                                {bill.status === "dueSoon"
                                  ? "Due Soon"
                                  : bill.status === "paid"
                                  ? "Paid"
                                  : "Overdue"}
                              </span>
                            )}
                          </p>
                          <p className={styles.billMeta}>Every</p>
                        </div>
                        <p className={styles.billAmount}>
                          ${bill.amount.toFixed(2)}
                        </p>
                        <div className={styles.billActions}>
                          <button className={styles.editButton}>
                            <Image
                              src="/assets/icons/editIcon.svg"
                              width={16}
                              height={16}
                              alt="edit"
                            />
                          </button>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDeleteBill(bill.id)}
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bills Total */}
                  <div className={styles.billsTotal}>
                    <span className={styles.billsTotalLabel}>
                      Total Monthly Bills
                    </span>
                    <span className={styles.billsTotalAmount}>${}</span>
                  </div>
                </>
              )}
            </div>

            {/* Quick Stats Card */}
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
              </div>

              <div className={styles.statItem}>
                <span className={styles.statLabel}>% of Income Available</span>
                <span className={styles.statValue}>{}%</span>
              </div>

              <div className={styles.statItem}>
                <span className={styles.statLabel}>Bills Coverage</span>
                <span className={styles.statValue}>{}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Add recurring bill*/}
      {showModal && (
        <div action="submit" className={styles.modalBackdrop}>
          <form className={styles.modalBox}>
            <div className={styles.modalHeader}>
              <h4 className={styles.modalTitle}>Add Recurring Bill</h4>
              <button
                type="button"
                className={styles.modalCloseButton}
                onClick={() => setShowModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modalFormGroup}>
                <label htmlFor="BillName" className={styles.modalLabel}>
                  Bill Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={billForm.}
                  className={styles.modalInput}
                  placeholder="e.g., Netflix"
                />
              </div>
              <div className={styles.modalFormGroup}>
                <label htmlFor="Amount" className={styles.modalLabel}>
                  Amount
                </label>
                <input
                  type="number"
                  className={styles.modalInput}
                  placeholder="0.00"
                />
              </div>
              <div className={styles.modalFormGroup}>
                <label htmlFor="DueDate" className={styles.modalLabel}>
                  Day of Month (1-31)
                </label>
                <input
                  type="text"
                  className={styles.modalInput}
                  placeholder="15"
                />
                <p className={styles.modalHintText}>
                  The day each month when this bill is due
                </p>
              </div>
              <div className={styles.modalFormGroup}>
                <label htmlFor="Category" className={styles.modalLabel}>
                  Category (Optional)
                </label>
                <input
                  type="text"
                  className={styles.modalInput}
                  placeholder="e.g., Entertainment, Utilities"
                />
              </div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.modalCancelButton}>Cancel</button>
              <button className={styles.modalAddButton}>Add Bill</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Budgets;
