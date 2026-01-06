"use client";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import styles from "./budgets.module.css";
import { GetTransactions } from "@services/TransactionService";
import { useSession } from "@node_modules/next-auth/react";
import {
  GetRecurringBills,
  AddRecurringBill,
  DeleteBillById,
  GetBillsDueThisWeek,
  GetBillsOverdueThisWeek,
} from "@services/RecurringBillsService";
import { AddBudgetGoal, DeleteBudgetGoal, GetBudgetGoals, UpdateBudgetGoal } from "@services/BudgetGoalService";
import CircleCheckIcon from "../animatedIcons/animatedCheck";
import { GetPaidBills, MarkBillAsPaid, UnmarkBillAsPaid } from "@services/BillPaymentService";

const Budgets = () => {
  const [bufferPercent, setBufferPercent] = useState(10);
  const [safetyBuffer, setSafetyBuffer] = useState(0);
  const [safeToSpendAmount, setSafeToSpendAmount] = useState(0);
  const [recurringBills, setRecurringBills] = useState([]);
  const [billsDueThisWeekIds, setBillsDueThisWeekIds] = useState([]);
  const [billsOverdueThisWeekIds, setBillsOverdueThisWeekIds] = useState([]);
  const [billsPaidThisWeekIds, setBillsPaidThisWeekIds] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [spendings, setSpendings] = useState(0);
  const [isCustomBudget, setIsCustomBudget] = useState(false);
  const [isBudgetGoal, setIsBudgetGoal] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [budgetGoal, setBudgetGoal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalBillsDue, setTotalBillsDue] = useState(0);
  const [showBudget, setShowBudget] = useState(false);
  const [isLoadingSafe, setIsLoadingSafe] = useState(true);
  const [isErrorSafe, setIsErrorSafe] = useState(null);
  const [isLoadingBill, setIsLoadingBill] = useState(true);
  const [isErrorBill, setIsErrorBill] = useState(null);
  const [billAdded, setBillAdded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState();
  const [billForm, setBillForm] = useState({
    name: "",
    amount: "",
    dayOfMonth: "",
    category: "",
  });
  const [notification, setNotification] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const { data: session } = useSession();

  const showNotification = (message, type = "error") => {
    setIsExiting(false);
    setNotification({ message, type });
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setNotification(null), 250);
    }, 4000);
  };

  const handleCloseNotification = () => {
    setIsExiting(true);
    setTimeout(() => setNotification(null), 250);
  };

  useEffect(() => {
    if (session?.accessToken) {
      getTransactions();
      fetchRecurringBills();
      fetchBillsDueThisWeek();
      fetchBillsOverdueThisWeek();
      fetchBillPayments();
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (totalBillsDue !== undefined && transactions.length >= 0) {
      calculateSafeToSpend();
    }
  }, [transactions, totalBillsDue, bufferPercent]);

  useEffect(() => {
    fetchBudgetGoal();
  }, [session?.accessToken, isBudgetGoal]);


  const getTransactions = async () => {
    try {
      setIsLoadingSafe(true);
      setIsErrorSafe(null);
      const result = await GetTransactions(session.accessToken);
      if (Array.isArray(result)) {
        setTransactions(result);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error(error);
      setIsErrorSafe(error);
    } finally {
      setIsLoadingSafe(false);
    }
  };

  const fetchRecurringBills = async () => {
    try {
      setIsLoadingBill(true);
      setIsErrorBill(null);
      const result = await GetRecurringBills(session.accessToken);
      if (Array.isArray(result)) {
        setRecurringBills(result);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error(error);
      setIsErrorBill(error);
    } finally {
      setIsLoadingBill(false);
    }
  };

  const fetchBillsDueThisWeek = async () => {
    try {
      const data = await GetBillsDueThisWeek(session.accessToken);
      setTotalBillsDue(data.total);
      const dueIds = data.upcomingBills.map((b) => b.id);
      setBillsDueThisWeekIds(dueIds);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBillsOverdueThisWeek = async () => {
    try {
      const data = await GetBillsOverdueThisWeek(session.accessToken);
      setBillsOverdueThisWeekIds(data.overdueBills);
    } catch (error){
      console.error(error);
    }
  };

  const fetchBudgetGoal = async () => {
    if (!session?.accessToken) return;

    try {
      const data = await GetBudgetGoals(session.accessToken);

      if (!data || data.bud) return;

      setBudgetGoal(data.budgetGoal.targetAmount);
      setDailyLimit((data.budgetGoal.targetAmount / data.daysLeft).toFixed(2));
      setDaysLeft(data.daysLeft);
      setIsBudgetGoal(true);
      setShowBudget(true);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchBillPayments = async () => {
    try{
      const data = await GetPaidBills(session.accessToken);
      
      const paidIds = data.payments.map(payment => payment.recurringBillId);
      setBillsPaidThisWeekIds(paidIds);
    } catch(error){
      console.error(error);
    }
  }

  const openWeeklyBudget = () => {
    setShowBudget(!showBudget);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBill = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!billForm.name || !billForm.amount || !billForm.dayOfMonth) return;

    const tempId = Date.now();

    const billData = {
      name: billForm.name,
      amount: parseFloat(billForm.amount),
      dayOfMonth: parseInt(billForm.dayOfMonth),
      category: billForm.category,
    };

    if (!billData.amount || billData.amount < 0) {
      showNotification("Amount must be a positive number", "error");
      return;
    }

    if (
      !billData.dayOfMonth ||
      billData.dayOfMonth < 1 ||
      billData.dayOfMonth > 31
    ) {
      showNotification("Day must be between 1 and 31", "error");
      return;
    }

    setRecurringBills((prev) => [...(prev || []), { ...billData, id: tempId }]);

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const result = await AddRecurringBill(billData, session.accessToken);
      setRecurringBills((prev) =>
        prev.map((b) => (b.id === tempId ? result : b))
      );
      setBillAdded(true);
      await fetchBillsDueThisWeek();
      await fetchBillsOverdueThisWeek();
    } catch (error) {
      console.error("Failed to add bill:", error);
      setSubmitError(error.message);
      setRecurringBills((prev) => prev.filter((b) => b.id !== tempId));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddBudgetGoal = async (e) => {
    e.preventDefault();

    if(!budgetAmount || budgetAmount <= 0) {
      return showNotification('Invalid budget amount', 'error');
    }

    if(isBudgetGoal) {
      return showNotification('There is already a budget for this week', 'error');
    };

    if (budgetAmount > earnings) {
      return showNotification('Budget amount must be less than your current weekly earnings', 'error');
    };

    if (budgetAmount < spendings) {
      return showNotification('Your current spendings are already higher than your budget goal', 'error');
    }

    const budgetGoalData = {
      targetAmount : parseFloat(budgetAmount),
    };


    try {
      const data = await AddBudgetGoal(budgetGoalData, session.accessToken);
      setIsBudgetGoal(true);
      setBudgetGoal(data.targetAmount);
      setDaysLeft(data.daysLeft);
      setDailyLimit((budgetAmount / data.daysLeft).toFixed(2));
      setBudgetAmount(0);
      setIsCustomBudget(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBillPayment = async (recurringBillId) => {
    if (!recurringBillId) return;

    const isPaid = billsPaidThisWeekIds.includes(recurringBillId);
    if (isPaid){
      try {
        await UnmarkBillAsPaid(recurringBillId, session.accessToken);
        setBillsPaidThisWeekIds((prev) => prev.filter(id => id !== recurringBillId));
        await fetchBillsDueThisWeek();
        await fetchBillsOverdueThisWeek();
      } catch(error) {
        console.error(error);
      }
    } else{

    const newBillPayment = {
      RecurringBillId : recurringBillId,
      PaidDate: new Date().toISOString()
    };

    try{
      await MarkBillAsPaid(newBillPayment, session.accessToken);

      setBillsPaidThisWeekIds((prev) => [...prev, recurringBillId]);
      setBillsDueThisWeekIds((prev) => prev.filter(id => id !== recurringBillId));
      setBillsOverdueThisWeekIds((prev) => prev.filter(id => id !== recurringBillId));

    } catch(error){
      console.error(error);
    }
  }
  }

  const updateBudgetGoal = async (e) => {
    e.preventDefault();

    if (!budgetAmount || budgetAmount <= 0){
      return showNotification('Invalid budget amount', 'error');
    }

    if (budgetAmount > earnings) {
      return showNotification('Budget amount must be less than your current weekly earnings', 'error');
    };

    if (budgetAmount < spendings) {
      return showNotification('Your current spendings are already higher than your budget goal', 'error');
    }

    const budgetGoalData = {
      targetAmount: parseFloat(budgetAmount)
    }

    try{
      const data = await UpdateBudgetGoal(budgetGoalData, session.accessToken);
      setBudgetGoal(data.targetAmount);
      setDaysLeft(data.daysLeft)
      setDailyLimit((budgetAmount / data.daysLeft).toFixed(2));
      setBudgetAmount(0);
      setIsCustomBudget(false);
    } catch (error){
      console.error(error);
    }
    
  }

  const handleDeleteBill = async (billId) => {
    if (!billId) return;

    const previousBills = recurringBills;
    setRecurringBills((prev) => prev.filter((b) => b.id !== billId));

    try {
      await DeleteBillById(billId, session.accessToken);
      await fetchBillsDueThisWeek();
    } catch (error) {
      console.error(error);
      showNotification("Failed to delete bill. Please try again.", "error");
      setRecurringBills(previousBills);
    }
  };

  const handleDeleteBudgetGoal = async () => {
    if (!isBudgetGoal) return;

    try{
      await DeleteBudgetGoal(session.accessToken);
      setIsBudgetGoal(false);
      setBudgetGoal(0);
      setDailyLimit(0);
    }catch(error){
      console.error(error);
    }
  }

  const calculateTotalBills = useMemo(() => {
    if (!recurringBills || recurringBills.length === 0) return 0;

    return recurringBills.reduce((sum, bill) => sum + (bill.amount || 0), 0);
  }, [recurringBills]);

  const handleCloseModal = () => {
    setShowModal(false);
    setBillAdded(false);
    setSubmitError(null);
    setBillForm({ name: "", amount: "", dayOfMonth: "", category: "" });
  };

  const calculateSafeToSpend = () => {
    if (totalBillsDue === undefined) return;

    const totalEarnings = transactions.reduce(
      (sum, transaction) =>
        transaction.type === "Income" ? sum + transaction.amount : sum,
      0
    );

    const buffer = (bufferPercent / 100) * totalEarnings;
    setSafetyBuffer(buffer);
    setEarnings(totalEarnings);

    const totalSpendings = transactions.reduce(
      (sum, transaction) =>
        transaction.type === "Expense" ? sum + transaction.amount : sum,
      0
    );
    setSpendings(totalSpendings);

    setSafeToSpendAmount(
      totalEarnings - totalSpendings - totalBillsDue - buffer
    );
  };

  const percentageIncomeAvailable = useMemo(() => {
    if (!earnings || earnings === 0) return 0;

    return ((safeToSpendAmount / earnings) * 100).toFixed(1);
  }, [safeToSpendAmount, earnings]);

  const currentSpendingPercent = useMemo(() => {
    if (budgetGoal <= 0) return 0;

    return ((spendings / budgetGoal) * 100).toFixed(0);
  }, [spendings, budgetGoal]);

  const percentageBillsCoverage = useMemo(() => {
    if (earnings == null || totalBillsDue == null || spendings == null) return 0;

    return ((totalBillsDue + spendings) / earnings) * 100;
  }, [earnings, spendings, totalBillsDue]);


    const getBillStatus = (billId) => {
    if (billsPaidThisWeekIds.includes(billId)) return "Paid this week";
    if (billsOverdueThisWeekIds.includes(billId)) return "Overdue this week";
    if (billsDueThisWeekIds.includes(billId)) return "Due this week";

    return undefined;
  }

  const billsWithStatus = useMemo(() => {

    return recurringBills.map((bill) => ({
      ...bill,
      status: getBillStatus(bill.id)
    }));

  }, [recurringBills, billsDueThisWeekIds, billsOverdueThisWeekIds, billsPaidThisWeekIds]);


  const getWeekRange = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();

    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - daysFromMonday);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric'});
    };
    return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
  };


  

  return (
    <>
      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]} ${isExiting ? styles.exiting : ''}`}>
          <div className={styles.notificationContent}>
            <div className={styles.notificationIcon}>
              {notification.type === "error" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              )}
            </div>
            <p className={styles.notificationMessage}>{notification.message}</p>
            <button
              onClick={handleCloseNotification}
              className={styles.notificationClose}
              aria-label="Close notification"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>
        </div>
      )}
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
                {isLoadingSafe && (
                  <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p className={styles.loadingText}>
                      Loading your budget data...
                    </p>
                  </div>
                )}
                {isErrorSafe && (
                  <div className={styles.errorContainer}>
                    <div className={styles.errorIcon}>!</div>
                    <p className={styles.errorText}>
                      {isErrorSafe?.message || "Failed to load transactions"}
                    </p>
                    <button
                      className={styles.retryButton}
                      onClick={getTransactions}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {!isLoadingSafe && !isErrorSafe && (
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
                        <p className={styles.breakdownSubtext}>{getWeekRange()}</p>
                      </div>
                      <p className={styles.breakdownAmount}>
                        ${earnings.toFixed(2)}
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
                        <p className={styles.breakdownSubtext}>{getWeekRange()}</p>
                      </div>
                      <p className={styles.breakdownAmount}>
                        ${spendings.toFixed(2)}
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
                      <p className={styles.breakdownAmount}>
                        ${totalBillsDue.toFixed(2)}
                      </p>
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
                      <p className={styles.breakdownAmount}>
                        ${safetyBuffer.toFixed(2)}
                      </p>
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
                <h3 className={`${styles.resultAmount}`}>
                  ${safeToSpendAmount.toFixed(2)}
                </h3>
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
                <form onSubmit={ isBudgetGoal ? updateBudgetGoal : handleAddBudgetGoal} className={styles.settingGroup}>
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
                        checked={showBudget}
                        onChange={openWeeklyBudget}
                      />
                      <span className={styles.switchSlider}></span>
                    </label>
                  </div>

                  {(budgetAmount > 0 || isCustomBudget) && showBudget && (
                    <button
                      type="button"
                      className={styles.clearBudgetLink}
                      onClick={() => {
                        setBudgetAmount(0)
                        setIsCustomBudget(false)
                      }}
                    >
                      Clear selection
                    </button>
                  )}

                  {/* Quick Select Buttons */}
                  {showBudget && (
                    <>
                      <div className={styles.quickSelectButtons}>
                        <button className={`${styles.quickSelectBtn} ${budgetAmount === 300 && !isCustomBudget ? styles.active : ''}`}
                          type="button"
                          onClick={() => {
                            setBudgetAmount(300)
                            setIsCustomBudget(false)
                          }}
                        >$300</button>
                        <button className={`${styles.quickSelectBtn} ${budgetAmount === 500 && !isCustomBudget ? styles.active : ''}`}
                          type="button"
                          onClick={() => {
                            setBudgetAmount(500)
                            setIsCustomBudget(false)
                          }}
                        >$500</button>
                        <button className={`${styles.quickSelectBtn} ${budgetAmount === 750 && !isCustomBudget ? styles.active : ''}`}
                          type="button"
                          onClick={() => {
                            setBudgetAmount(750)
                            setIsCustomBudget(false)
                          }}
                        >$750</button>
                        <button className={`${styles.quickSelectBtn} ${budgetAmount === 1000 && !isCustomBudget ? styles.active : ''}`}
                          type="button"
                          onClick={() => {
                            setBudgetAmount(1000)
                            setIsCustomBudget(false)
                          }}
                        >$1000</button>
                        <button
                          type="button"
                          className={`${styles.quickSelectBtn} ${isCustomBudget ? styles.active : ''}`}
                          onClick={() => setIsCustomBudget(!isCustomBudget)}
                        >
                          Custom
                        </button>
                      </div>

                      {/* Budget Input */}
                      {isCustomBudget && (
                        <div className={styles.budgetInputWrapper}>
                          <span className={styles.dollarSign}>$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={budgetAmount}
                            onChange={(e) => setBudgetAmount(e.target.value)}
                            className={styles.budgetInputLarge}
                            placeholder="500"
                          />
                          <span className={styles.perWeek}>/week</span>
                        </div>
                      )}

                      {/* Current Spending Progress */}
                      <div className={styles.spendingProgress}>
                        <div className={styles.spendingHeader}>
                          <span className={styles.spendingLabel}>
                            Current Spending
                          </span>
                          <span className={styles.spendingAmount}>
                              ${spendings} of ${budgetGoal} ({currentSpendingPercent}%)
                          </span>
                        </div>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: `${currentSpendingPercent}%` }}
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

                            {!isBudgetGoal && (
                              <div className={styles.noLimitMessage}>
                                <span>No budget goal set</span>
                              </div>
                            )}

                            {isBudgetGoal && (
                              <>
                                <span className={styles.insightValue}>{daysLeft}</span>
                                <span className={styles.insightSubtext}>
                                  until week ends
                                </span>
                              </>
                            )}
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

                            {!isBudgetGoal && (
                              <div className={styles.noLimitMessage}>
                                <span>No budget goal set</span>
                              </div>
                            )}

                            {isBudgetGoal && (
                              <>
                                <span className={styles.insightValue}>
                                  ${dailyLimit}
                                </span>
                                <span className={styles.insightSubtext}>
                                  remaining per day
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Weekly to Daily Conversion */}
                      <div className={styles.conversionText}>
                        Weekly: ${budgetGoal} → Daily: ${dailyLimit}
                      </div>
                      <button type="submit" className={styles.saveSettingsButton}>
                        {isBudgetGoal ? "Update Budget Goal" : "Set Budget Goal"}
                      </button>

                      {isBudgetGoal && (
                        <button
                          type="button"
                          className={styles.deleteBudgetLink}
                          onClick={() => handleDeleteBudgetGoal()}
                        >
                          Delete budget goal
                        </button>
                      )}
                    </>
                  )}
                </form>
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

              {isLoadingBill && (
                <div className={styles.loadingBillsContainer}>
                  <div className={styles.spinnerPurple}></div>
                  <p className={styles.loadingBillsText}>
                    Loading your recurring bills...
                  </p>
                </div>
              )}

              {isErrorBill && (
                <div className={styles.errorBillsContainer}>
                  <div className={styles.errorBillsIcon}>!</div>
                  <p className={styles.errorBillsText}>
                    {isErrorBill?.message || "Failed to load recurring bills"}
                  </p>
                  <button
                    className={styles.retryBillsButton}
                    onClick={fetchRecurringBills}
                  >
                    Retry
                  </button>
                </div>
              )}

              {!isLoadingBill &&
                !isErrorBill &&
                recurringBills &&
                recurringBills.length === 0 && (
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

              {!isLoadingBill && !isErrorBill && recurringBills.length > 0 && (
                <>
                  <h3 className={styles.billSectionHeader}>
                    All Recurring Bills:
                  </h3>

                  <div className={styles.billsList}>
                    {billsWithStatus.map((bill) => (
                      <div key={bill.id} className={styles.billItem}>
                        <div className={styles.billIconCircle}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
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
                        <div className={styles.billInfo}>
                          <p className={styles.billName}>
                            {bill.name}
                            {bill.status && (
                              <span
                                className={`${styles.billStatusBadge} ${
                                  bill.status === "Overdue this week"
                                    ? styles.overdue
                                    : bill.status === "Paid this week"
                                    ? styles.paid
                                    : styles.dueSoon
                                }`}
                              >
                                {bill.status === "Paid this week" ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M20 6 9 17l-5-5"/>
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                    <path d="M12 8v4" />
                                    <path d="M12 16h.01" />
                                  </svg>
                                )}
                                {bill.status}
                              </span>
                            )}
                          </p>
                          <p className={styles.billMeta}>
                            Every {bill.dayOfMonth}
                          </p>
                        </div>

                        {bill.status && (
                          <button
                            onClick={() => handleAddBillPayment(bill.id)}
                            className={styles.checkButton}
                            title="Mark as paid this week"
                          >
                            <CircleCheckIcon size={16} isPaid={bill.status === "Paid this week" ? true : false} />
                          </button>
                        )}

                        <p className={styles.billAmount}>
                          ${bill.amount.toFixed(2)}
                        </p>

                        <div className={styles.billActions}>
                          <button className={styles.editButton}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                            </svg>
                          </button>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDeleteBill(bill.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M10 11v6" />
                              <path d="M14 11v6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                              <path d="M3 6h18" />
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
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
                    <span className={styles.billsTotalAmount}>
                      ${calculateTotalBills.toFixed(2)}
                    </span>
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
                <span className={styles.statValue}>
                  {percentageIncomeAvailable}%
                </span>
              </div>

              <div className={styles.statItem}>
                <span className={styles.statLabel}>Bills Percentage</span>
                <span className={styles.statValue}>{percentageBillsCoverage.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Add recurring bill*/}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalBox}>
            {!billAdded ? (
              <form onSubmit={handleAddBill}>
                <div className={styles.modalHeader}>
                  <h4 className={styles.modalTitle}>Add Recurring Bill</h4>
                  <button
                    type="button"
                    className={styles.modalCloseButton}
                    onClick={handleCloseModal}
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
                  {submitError && (
                    <div className={styles.modalErrorAlert}>
                      <div className={styles.modalErrorIcon}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      </div>
                      <p className={styles.modalErrorText}>{submitError}</p>
                    </div>
                  )}

                  <div className={styles.modalFormGroup}>
                    <label htmlFor="BillName" className={styles.modalLabel}>
                      Bill Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={billForm.name}
                      onChange={handleInputChange}
                      className={styles.modalInput}
                      placeholder="e.g., Netflix"
                      required
                    />
                  </div>
                  <div className={styles.modalFormGroup}>
                    <label htmlFor="Amount" className={styles.modalLabel}>
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={billForm.amount}
                      onChange={handleInputChange}
                      className={styles.modalInput}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className={styles.modalFormGroup}>
                    <label htmlFor="DueDate" className={styles.modalLabel}>
                      Day of Month (1-31)
                    </label>
                    <input
                      type="number"
                      name="dayOfMonth"
                      value={billForm.dayOfMonth}
                      onChange={handleInputChange}
                      className={styles.modalInput}
                      placeholder="15"
                      required
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
                      name="category"
                      value={billForm.category}
                      onChange={handleInputChange}
                      className={styles.modalInput}
                      placeholder="e.g., Entertainment, Utilities"
                    />
                  </div>
                </div>
                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.modalCancelButton}
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.modalAddButton}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Add Bill
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.successContent}>
                <button
                  type="button"
                  className={styles.modalCloseButton}
                  onClick={handleCloseModal}
                  style={{ position: "absolute", top: "24px", right: "24px" }}
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
                <div className={styles.successIconWrapper}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.successIcon}
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h4 className={styles.successTitle}>
                  Bill Added Successfully!
                </h4>
                <p className={styles.successText}>
                  Your recurring bill has been added to your budget.
                </p>
                <div className={styles.successButtonGroup}>
                  <button
                    className={styles.addAnotherBillButton}
                    onClick={() => {
                      setBillAdded(false);
                      setBillForm({
                        name: "",
                        amount: "",
                        dayOfMonth: "",
                        category: "",
                      });
                    }}
                  >
                    Add Another Bill
                  </button>
                  <button
                    className={styles.viewBillsButton}
                    onClick={handleCloseModal}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Budgets;
