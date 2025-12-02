# Safe to Spend & Recurring Bills Feature - Implementation Guide

## 📋 Table of Contents
1. [Feature Overview](#feature-overview)
2. [Vision & Goals](#vision--goals)
3. [User Flow](#user-flow)
4. [Database Architecture](#database-architecture)
5. [Backend Architecture](#backend-architecture)
6. [DTOs - When to Use Them](#dtos---when-to-use-them)
7. [Frontend Architecture](#frontend-architecture)
8. [Calculation Logic](#calculation-logic)
9. [Implementation Steps](#implementation-steps)
10. [API Endpoints](#api-endpoints)
11. [UI Components Structure](#ui-components-structure)
12. [Code Examples](#code-examples)

---

## 🎯 Feature Overview

### The Problem We're Solving
Users struggle to answer: **"Can I actually afford to spend money right now?"**

Even with money in their account, they're unsure because:
- 💸 Recurring bills (Netflix, rent, gym) aren't accounted for
- 📊 No clear view of money already committed
- 🤔 Uncertainty about what's "safe" to spend without risk

### The Solution
A **weekly-focused "Safe to Spend" calculator** that:
1. Tracks recurring bills as permanent transactions
2. Calculates available money considering ALL income/outflows
3. Shows weekly safe-to-spend amount (easy to digest)
4. Provides 4-week retrospective insights

---

## 🌟 Vision & Goals

### Core Principles
- **Weekly Focus:** Digestible, actionable data (not overwhelming monthly views)
- **Complete Accuracy:** Every penny tracked (6 transaction types + recurring bills)
- **Always Visible:** Key metrics shown without extra clicks
- **Progressive Disclosure:** Quick glance → Detailed breakdown when needed

### Success Metrics
- ✅ User knows instantly if they can afford something
- ✅ No bill surprises (all recurring expenses tracked)
- ✅ Clear insights into spending patterns (4-week view)
- ✅ Reduced financial anxiety

---

## 🔄 User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER JOURNEY                                 │
└─────────────────────────────────────────────────────────────────┘

1. MAIN TRANSACTIONS PAGE (Quick Glance)
   ↓
   User sees in "Cash Flow Analysis" card:
   ┌──────────────────────────────┐
   │ 💰 Safe to Spend This Week   │
   │ $315.00                      │
   │ Based on this week's income  │
   └──────────────────────────────┘
   ↓
   Question: "Is $315 enough for my needs?"
   ↓

2. CLICKS "Manage Bills & Budget" (Quick Actions)
   ↓
   Navigates to /budget page
   ↓

3. BUDGET PAGE (Deep Dive)
   ↓
   Sees detailed breakdown:
   - This week's income/expenses
   - Upcoming bills this week
   - Safety buffer calculation
   ↓
   Reviews last 4 weeks:
   - Week-by-week income vs spent
   - Monthly totals
   - Trend chart
   ↓
   Manages recurring bills:
   - Add new bills (Netflix, Rent, etc.)
   - Edit/pause existing bills
   - See next due dates
   ↓

4. BILLS AUTO-GENERATE AS TRANSACTIONS
   ↓
   When due date arrives:
   - Bill appears in transaction list
   - Marked with "🔁 Recurring" badge
   - Automatically included in calculations
```

---

## 🗄️ Database Architecture

### New Table: `recurring_bills`

```sql
CREATE TABLE recurring_bills (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id NVARCHAR(450) NOT NULL,
    description NVARCHAR(200) NOT NULL,
    amount DECIMAL(18,2) NOT NULL,
    category NVARCHAR(50),
    type NVARCHAR(50) NOT NULL, -- 'Expense', 'Savings', etc.
    frequency NVARCHAR(20) NOT NULL, -- 'weekly', 'monthly'
    next_due_date DATETIME NOT NULL,
    account NVARCHAR(100),
    status NVARCHAR(20) DEFAULT 'Pending',
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (user_id) REFERENCES AspNetUsers(Id)
);

-- Indexes for performance
CREATE INDEX idx_recurring_bills_user ON recurring_bills(user_id);
CREATE INDEX idx_recurring_bills_due_date ON recurring_bills(next_due_date);
```

### Updated Table: `transactions`

```sql
-- Add new column to existing transactions table
ALTER TABLE transactions
ADD recurring_bill_id INT NULL,
    FOREIGN KEY (recurring_bill_id) REFERENCES recurring_bills(id);

-- Index for queries
CREATE INDEX idx_transactions_recurring ON transactions(recurring_bill_id);
```

### New Table: `budget_settings`

```sql
CREATE TABLE budget_settings (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id NVARCHAR(450) NOT NULL UNIQUE,
    monthly_budget DECIMAL(18,2),
    weekly_budget DECIMAL(18,2),
    safety_buffer_percentage DECIMAL(5,2) DEFAULT 10.00,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (user_id) REFERENCES AspNetUsers(Id)
);
```

### Entity Relationships

```
AspNetUsers (1) ──────── (Many) recurring_bills
                │
                └──────── (Many) transactions
                │
                └──────── (1) budget_settings

recurring_bills (1) ──── (Many) transactions
                         (via recurring_bill_id)
```

---

## 🏗️ Backend Architecture

### Project Structure

```
backendTally/
├── Models/
│   ├── RecurringBill.cs          [NEW]
│   ├── Transaction.cs             [UPDATE - add RecurringBillId]
│   ├── BudgetSettings.cs         [NEW]
│   └── DTOs/                      [NEW - Only for calculations]
│       ├── WeeklySafeToSpendDto.cs   [NEW]
│       ├── FourWeekSummaryDto.cs     [NEW]
│       └── WeekSummary.cs            [NEW]
│
├── Controllers/
│   ├── RecurringBillsController.cs  [NEW]
│   ├── BudgetController.cs          [NEW]
│   └── TransactionsController.cs    [UPDATE - handle recurring bills]
│
├── Services/
│   ├── RecurringBillService.cs      [NEW]
│   ├── BudgetCalculationService.cs  [NEW]
│   └── TransactionService.cs        [UPDATE]
│
└── Data/
    └── ApplicationDbContext.cs      [UPDATE - add DbSets]
```

---

## 🎯 DTOs - When to Use Them

### What Are DTOs?
**DTO = Data Transfer Object** - A simple object used to transfer data between layers (API ↔ Frontend)

### ✅ Use DTOs For: CALCULATED DATA
We use DTOs **only** for endpoints that return calculated/aggregated data:

```csharp
// ✅ GOOD: Calculated data that doesn't exist in database
public class WeeklySafeToSpendDto {
    public decimal ThisWeekIncome { get; set; }
    public decimal ThisWeekOutflow { get; set; }
    public decimal UpcomingBills { get; set; }
    public decimal SafetyBuffer { get; set; }
    public decimal SafeToSpend { get; set; }  // Calculated!
}

public class FourWeekSummaryDto {
    public List<WeekSummary> Weeks { get; set; }
    public decimal MonthlyIncome { get; set; }
    public decimal MonthlySpent { get; set; }
    public decimal MonthlyNet { get; set; }  // Aggregated!
}
```

### ❌ Skip DTOs For: SIMPLE CRUD
For recurring bills and budget settings, we return **models directly** because:
- ✅ No sensitive data to hide
- ✅ Model structure matches what API needs
- ✅ Simpler code, less maintenance
- ✅ Faster development

```csharp
// ✅ GOOD: Return model directly for CRUD
[HttpGet]
public async Task<List<RecurringBill>> GetRecurringBills() {
    return await _billService.GetUserRecurringBills(userId);
}

[HttpPost]
public async Task<RecurringBill> CreateRecurringBill([FromBody] RecurringBill bill) {
    return await _billService.CreateRecurringBill(bill);
}
```

### Why This Hybrid Approach?
- **Simpler**: Less mapping code, fewer files
- **Safe**: RecurringBill/BudgetSettings have no passwords or sensitive data
- **Clean**: Still use DTOs where they add value (complex calculations)
- **Pragmatic**: Right tool for the right job

---

## 🎨 Frontend Architecture

### Project Structure

```
app/
├── budget/
│   ├── page.jsx                     [NEW - Main budget page]
│   └── budget.module.css            [NEW]
│
├── components/
│   ├── transactions/
│   │   ├── Transactions.jsx         [UPDATE - add safe-to-spend box]
│   │   └── transactionsPreview.module.css [UPDATE]
│   │
│   ├── budget/
│   │   ├── SafeToSpendCard.jsx      [NEW]
│   │   ├── WeeklySummaryChart.jsx   [NEW]
│   │   ├── RecurringBillsList.jsx   [NEW]
│   │   ├── AddBillModal.jsx         [NEW]
│   │   ├── FourWeekOverview.jsx     [NEW]
│   │   └── BudgetSettings.jsx       [NEW]
│   │
│   └── shared/
│       └── WeeklyMetrics.jsx        [NEW - Reusable weekly calc]
│
└── services/
    ├── RecurringBillService.js      [NEW]
    ├── BudgetService.js             [NEW]
    └── TransactionService.js        [UPDATE]
```

---

## 🧮 Calculation Logic

### 1. Weekly Safe to Spend (Main Page - Quick View)

**Formula:**
```
This Week's Income
- This Week's Expenses (all types)
- Upcoming Bills This Week (not yet paid)
- Safety Buffer (10% of weekly income)
= Safe to Spend This Week
```

**Code Logic:**
```javascript
function calculateWeeklySafeToSpend(transactions, recurringBills, bufferPercentage = 10) {
  // 1. Get this week's income
  const thisWeekIncome = transactions
    .filter(t => isThisWeek(t.date) && t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  // 2. Get this week's outflows (all non-income transactions)
  const thisWeekOutflow = transactions
    .filter(t => isThisWeek(t.date) && t.type !== 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  // 3. Get unpaid bills due this week
  const unpaidBillsThisWeek = recurringBills
    .filter(bill => {
      const dueDate = new Date(bill.next_due_date);
      return isThisWeek(dueDate) && !isAlreadyPaidThisWeek(bill.id, transactions);
    })
    .reduce((sum, b) => sum + b.amount, 0);

  // 4. Calculate safety buffer
  const safetyBuffer = thisWeekIncome * (bufferPercentage / 100);

  // 5. Calculate safe to spend
  return thisWeekIncome - thisWeekOutflow - unpaidBillsThisWeek - safetyBuffer;
}

// Helper: Check if bill already generated as transaction this week
function isAlreadyPaidThisWeek(billId, transactions) {
  return transactions.some(t =>
    t.recurring_bill_id === billId &&
    isThisWeek(t.date)
  );
}
```

### 2. Detailed Breakdown (Budget Page)

**Formula:**
```
=== THIS WEEK'S BREAKDOWN ===
This Week's Income:                    $X
  - Expenses (Expense type):           -$X
  - Transfers (Transfer type):         -$X
  - Loan Payments (Loan type):         -$X
  - Savings (Savings type):            -$X
  - Goals (Goal type):                 -$X
  - Bills Already Paid (recurring):    -$X
─────────────────────────────────────
Subtotal Remaining:                    $X
  - Upcoming Bills This Week (unpaid): -$X
  - Safety Buffer (10%):               -$X
═════════════════════════════════════
= SAFE TO SPEND:                       $X
```

**Code Logic:**
```javascript
function calculateDetailedSafeToSpend(transactions, recurringBills, bufferPercentage) {
  const breakdown = {
    thisWeekIncome: 0,
    expenses: 0,
    transfers: 0,
    loans: 0,
    savings: 0,
    goals: 0,
    billsPaid: 0,
    upcomingBills: 0,
    safetyBuffer: 0,
    safeToSpend: 0
  };

  // Income
  breakdown.thisWeekIncome = transactions
    .filter(t => isThisWeek(t.date) && t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  // Categorize outflows by type
  const thisWeekTransactions = transactions.filter(t => isThisWeek(t.date));

  breakdown.expenses = thisWeekTransactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  breakdown.transfers = thisWeekTransactions
    .filter(t => t.type === 'Transfer')
    .reduce((sum, t) => sum + t.amount, 0);

  breakdown.loans = thisWeekTransactions
    .filter(t => t.type === 'Loan')
    .reduce((sum, t) => sum + t.amount, 0);

  breakdown.savings = thisWeekTransactions
    .filter(t => t.type === 'Savings')
    .reduce((sum, t) => sum + t.amount, 0);

  breakdown.goals = thisWeekTransactions
    .filter(t => t.type === 'Goal')
    .reduce((sum, t) => sum + t.amount, 0);

  // Bills already paid (transactions linked to recurring bills)
  breakdown.billsPaid = thisWeekTransactions
    .filter(t => t.recurring_bill_id !== null)
    .reduce((sum, t) => sum + t.amount, 0);

  // Upcoming bills (not yet generated as transactions)
  breakdown.upcomingBills = recurringBills
    .filter(bill => {
      const dueDate = new Date(bill.next_due_date);
      return isThisWeek(dueDate) && !isAlreadyPaidThisWeek(bill.id, transactions);
    })
    .reduce((sum, b) => sum + b.amount, 0);

  // Safety buffer
  breakdown.safetyBuffer = breakdown.thisWeekIncome * (bufferPercentage / 100);

  // Calculate safe to spend
  const totalOutflow = breakdown.expenses + breakdown.transfers + breakdown.loans +
                       breakdown.savings + breakdown.goals + breakdown.billsPaid;

  breakdown.safeToSpend = breakdown.thisWeekIncome - totalOutflow -
                          breakdown.upcomingBills - breakdown.safetyBuffer;

  return breakdown;
}
```

### 3. Four-Week Summary

**Formula (for each week):**
```
Week X Income - Week X Outflow = Week X Net
Sum of 4 weeks = Monthly Total
```

**Code Logic:**
```javascript
function calculateFourWeekSummary(transactions, recurringBills) {
  const weeks = [];

  // Get last 4 weeks
  for (let i = 3; i >= 0; i--) {
    const weekStart = getWeekStart(i); // i weeks ago
    const weekEnd = getWeekEnd(i);

    const weekTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date >= weekStart && date <= weekEnd;
    });

    const income = weekTransactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const spent = weekTransactions
      .filter(t => t.type !== 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    weeks.push({
      weekNumber: 4 - i,
      startDate: weekStart,
      endDate: weekEnd,
      income: income,
      spent: spent,
      net: income - spent
    });
  }

  // Calculate monthly total
  const monthlyTotal = {
    income: weeks.reduce((sum, w) => sum + w.income, 0),
    spent: weeks.reduce((sum, w) => sum + w.spent, 0),
    net: weeks.reduce((sum, w) => sum + w.net, 0)
  };

  return { weeks, monthlyTotal };
}
```

### 4. Recurring Bill Auto-Generation

**Logic:**
```javascript
// Backend service method
async function generateDueBills(userId) {
  // 1. Get all active recurring bills for user
  const recurringBills = await getActiveRecurringBills(userId);

  // 2. Check which bills are due (next_due_date <= today)
  const today = new Date();
  const dueBills = recurringBills.filter(bill =>
    new Date(bill.next_due_date) <= today
  );

  const generatedTransactions = [];

  // 3. For each due bill, create transaction
  for (const bill of dueBills) {
    // Check if already generated (avoid duplicates)
    const alreadyGenerated = await checkIfBillAlreadyGeneratedToday(bill.id);

    if (!alreadyGenerated) {
      // Create transaction from bill template
      const transaction = {
        user_id: userId,
        description: bill.description,
        amount: bill.amount,
        category: bill.category,
        type: bill.type,
        date: bill.next_due_date,
        account: bill.account,
        status: bill.status,
        recurring_bill_id: bill.id
      };

      const created = await createTransaction(transaction);
      generatedTransactions.push(created);

      // Update next due date
      bill.next_due_date = calculateNextDueDate(bill.next_due_date, bill.frequency);
      await updateRecurringBill(bill);
    }
  }

  return generatedTransactions;
}

function calculateNextDueDate(currentDueDate, frequency) {
  const date = new Date(currentDueDate);

  if (frequency === 'weekly') {
    date.setDate(date.getDate() + 7);
  } else if (frequency === 'monthly') {
    date.setMonth(date.getMonth() + 1);
  }

  return date;
}
```

---

## 📝 Implementation Steps - Quick Reference

### Phase 1: Backend Setup (C# .NET)

**Step 1: Database Models**
- Create `RecurringBill.cs` model with fields: Description, Amount, Category, Type, Frequency, NextDueDate, Account, Status, IsActive
- Create `BudgetSettings.cs` model with fields: MonthlyBudget, WeeklyBudget, SafetyBufferPercentage
- Update `Transaction.cs` model - add `RecurringBillId` field (nullable integer)

**Step 2: Database Context**
- Add `DbSet<RecurringBill>` and `DbSet<BudgetSettings>` to ApplicationDbContext
- Configure indexes on UserId and NextDueDate for RecurringBill
- Configure unique index on UserId for BudgetSettings

**Step 3: Database Migration**
- Run command: `dotnet ef migrations add AddRecurringBillsAndBudgetSettings`
- Run command: `dotnet ef database update`

**Step 4: Create Services**
- **RecurringBillService**: Methods for GetUserRecurringBills, CreateRecurringBill, UpdateRecurringBill, DeleteRecurringBill (soft delete), GenerateDueBills
- **BudgetCalculationService**: Methods for CalculateWeeklySafeToSpend, CalculateFourWeekSummary

**Step 5: Create DTOs (for calculated data only)**
- Create `WeeklySafeToSpendDto` with calculated fields
- Create `FourWeekSummaryDto` and `WeekSummary` for aggregated data
- Note: RecurringBill and BudgetSettings return models directly (no DTOs needed)

**Step 6: Create Controllers**
- **RecurringBillsController**: Endpoints for GET, POST, PUT, DELETE bills + POST generate-due
- **BudgetController**: Endpoints for GET safe-to-spend and GET four-week-summary
- Add [Authorize] attribute to all controllers

**Step 7: Register Services**
- Add services to dependency injection in Program.cs: `AddScoped<RecurringBillService>()` and `AddScoped<BudgetCalculationService>()`

---

### Phase 2: Frontend Setup (React/Next.js)

**Step 1: Create Service Layer**
- Create `RecurringBillService.js` with functions: GetRecurringBills, CreateRecurringBill, UpdateRecurringBill, DeleteRecurringBill, GenerateDueBills
- Create `BudgetService.js` with functions: GetSafeToSpend, GetFourWeekSummary

**Step 2: Update Transactions Page**
- Add state for `safeToSpend` data
- Add `fetchSafeToSpend()` function to load data from API
- Add `generateDueBills()` function to auto-generate due bills on page load
- Add "Safe to Spend This Week" box in Cash Flow Analysis section
- Update Quick Actions - replace CSV buttons with "Manage Bills & Budget" button linking to /budget

**Step 3: Create Budget Page Structure**
- Create `/app/budget/page.jsx` as main budget page
- Add state for safeToSpend, fourWeekSummary, and recurringBills
- Fetch all three datasets on page load using Promise.all
- Create two-column layout (Left: Safe to Spend + 4-Week Overview, Right: Recurring Bills)

**Step 4: Create Budget Components**
- **SafeToSpendCard.jsx**: Shows detailed breakdown with Income - Outflow - Bills - Buffer = Safe to Spend
- **FourWeekOverview.jsx**: Displays 4 weeks of data with income/spent/net per week + monthly total
- **RecurringBillsList.jsx**: Lists all bills with edit/delete actions + "Add Bill" button
- **AddBillModal.jsx**: Modal form for creating/editing recurring bills with fields: Description, Amount, Category, Type, Frequency, NextDueDate

**Step 5: Add Styling**
- Create CSS modules for each component
- Add Safe to Spend box styling to transactionsPreview.module.css
- Style budget page with proper grid layout, cards, and responsive design

**Step 6: Add Navigation**
- Ensure "Manage Bills & Budget" button navigates to `/budget`
- Update any main navigation if needed

---

### Testing Checklist

**Backend Testing:**
- [ ] Create a recurring bill via POST /api/recurringbills
- [ ] Retrieve bills via GET /api/recurringbills
- [ ] Update a bill via PUT /api/recurringbills/{id}
- [ ] Soft delete a bill via DELETE /api/recurringbills/{id}
- [ ] Generate due bills via POST /api/recurringbills/generate-due
- [ ] Verify transaction created with recurring_bill_id
- [ ] Test safe-to-spend calculation via GET /api/budget/safe-to-spend
- [ ] Test four-week summary via GET /api/budget/four-week-summary

**Frontend Testing:**
- [ ] Safe to Spend box shows on Transactions page
- [ ] Clicking "Manage Bills & Budget" navigates to /budget
- [ ] Budget page loads all three datasets
- [ ] Can add a new recurring bill via modal
- [ ] Can edit an existing bill
- [ ] Can delete a bill
- [ ] Safe to Spend breakdown shows correct calculations
- [ ] Four-Week Overview displays all 4 weeks + monthly total
- [ ] Bills auto-generate as transactions when due

**Edge Cases:**
- [ ] User with no income this week shows $0 safe to spend
- [ ] User with expenses > income shows negative amount with warning
- [ ] Bills with past due dates auto-generate immediately
- [ ] Deleting a generated transaction doesn't affect recurring bill

---

## 📝 Implementation Steps - Full Details

### Phase 1: Backend Setup (C# .NET)

#### Step 1.1: Create Models
```csharp
// Models/RecurringBill.cs
public class RecurringBill
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public string Description { get; set; }
    public decimal Amount { get; set; }
    public string Category { get; set; }
    public string Type { get; set; } // Expense, Savings, etc.
    public string Frequency { get; set; } // weekly, monthly
    public DateTime NextDueDate { get; set; }
    public string Account { get; set; }
    public string Status { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

// Models/BudgetSettings.cs
public class BudgetSettings
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public decimal? MonthlyBudget { get; set; }
    public decimal? WeeklyBudget { get; set; }
    public decimal SafetyBufferPercentage { get; set; } = 10.00m;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

// Update Models/Transaction.cs - ADD:
public int? RecurringBillId { get; set; }
```

#### Step 1.2: Update DbContext
```csharp
// Data/ApplicationDbContext.cs
public class ApplicationDbContext : IdentityDbContext
{
    // Existing DbSets...

    // ADD:
    public DbSet<RecurringBill> RecurringBills { get; set; }
    public DbSet<BudgetSettings> BudgetSettings { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Configure RecurringBill
        builder.Entity<RecurringBill>()
            .HasIndex(b => b.UserId);

        builder.Entity<RecurringBill>()
            .HasIndex(b => b.NextDueDate);

        // Configure BudgetSettings
        builder.Entity<BudgetSettings>()
            .HasIndex(b => b.UserId)
            .IsUnique();
    }
}
```

#### Step 1.3: Create Migration
```bash
# Run in terminal
dotnet ef migrations add AddRecurringBillsAndBudgetSettings
dotnet ef database update
```

#### Step 1.4: Create Services
```csharp
// Services/RecurringBillService.cs
public class RecurringBillService
{
    private readonly ApplicationDbContext _context;

    public RecurringBillService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<RecurringBill>> GetUserRecurringBills(string userId)
    {
        return await _context.RecurringBills
            .Where(b => b.UserId == userId && b.IsActive)
            .OrderBy(b => b.NextDueDate)
            .ToListAsync();
    }

    public async Task<RecurringBill> CreateRecurringBill(RecurringBill bill)
    {
        bill.CreatedAt = DateTime.UtcNow;
        bill.UpdatedAt = DateTime.UtcNow;
        bill.IsActive = true;

        _context.RecurringBills.Add(bill);
        await _context.SaveChangesAsync();

        return bill;
    }

    public async Task<RecurringBill> UpdateRecurringBill(int id, RecurringBill updatedBill)
    {
        var bill = await _context.RecurringBills.FindAsync(id);
        if (bill == null) return null;

        bill.Description = updatedBill.Description;
        bill.Amount = updatedBill.Amount;
        bill.Category = updatedBill.Category;
        bill.Frequency = updatedBill.Frequency;
        bill.NextDueDate = updatedBill.NextDueDate;
        bill.Account = updatedBill.Account;
        bill.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return bill;
    }

    public async Task<bool> DeleteRecurringBill(int id)
    {
        var bill = await _context.RecurringBills.FindAsync(id);
        if (bill == null) return false;

        bill.IsActive = false;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<Transaction>> GenerateDueBills(string userId)
    {
        var today = DateTime.UtcNow.Date;
        var dueBills = await _context.RecurringBills
            .Where(b => b.UserId == userId &&
                        b.IsActive &&
                        b.NextDueDate.Date <= today)
            .ToListAsync();

        var generatedTransactions = new List<Transaction>();

        foreach (var bill in dueBills)
        {
            // Check if already generated today
            var alreadyGenerated = await _context.Transactions
                .AnyAsync(t => t.RecurringBillId == bill.Id &&
                              t.Date.Date == bill.NextDueDate.Date);

            if (!alreadyGenerated)
            {
                var transaction = new Transaction
                {
                    UserId = userId,
                    Description = bill.Description,
                    Amount = bill.Amount,
                    Category = bill.Category,
                    Type = bill.Type,
                    Date = bill.NextDueDate,
                    Account = bill.Account,
                    Status = bill.Status,
                    RecurringBillId = bill.Id
                };

                _context.Transactions.Add(transaction);
                generatedTransactions.Add(transaction);

                // Update next due date
                bill.NextDueDate = CalculateNextDueDate(bill.NextDueDate, bill.Frequency);
                bill.UpdatedAt = DateTime.UtcNow;
            }
        }

        await _context.SaveChangesAsync();
        return generatedTransactions;
    }

    private DateTime CalculateNextDueDate(DateTime currentDate, string frequency)
    {
        return frequency.ToLower() switch
        {
            "weekly" => currentDate.AddDays(7),
            "monthly" => currentDate.AddMonths(1),
            _ => currentDate
        };
    }
}

// Services/BudgetCalculationService.cs
public class BudgetCalculationService
{
    private readonly ApplicationDbContext _context;

    public BudgetCalculationService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<WeeklySafeToSpendDto> CalculateWeeklySafeToSpend(string userId)
    {
        var settings = await _context.BudgetSettings
            .FirstOrDefaultAsync(s => s.UserId == userId);

        var bufferPercentage = settings?.SafetyBufferPercentage ?? 10.00m;

        // Get this week's transactions
        var weekStart = GetWeekStart(DateTime.UtcNow);
        var weekEnd = GetWeekEnd(DateTime.UtcNow);

        var thisWeekTransactions = await _context.Transactions
            .Where(t => t.UserId == userId &&
                        t.Date >= weekStart &&
                        t.Date <= weekEnd)
            .ToListAsync();

        var thisWeekIncome = thisWeekTransactions
            .Where(t => t.Type == "Income")
            .Sum(t => t.Amount);

        var thisWeekOutflow = thisWeekTransactions
            .Where(t => t.Type != "Income")
            .Sum(t => t.Amount);

        // Get unpaid bills due this week
        var upcomingBills = await _context.RecurringBills
            .Where(b => b.UserId == userId &&
                        b.IsActive &&
                        b.NextDueDate >= weekStart &&
                        b.NextDueDate <= weekEnd)
            .ToListAsync();

        var upcomingBillsAmount = 0m;
        foreach (var bill in upcomingBills)
        {
            // Check if already paid
            var isPaid = thisWeekTransactions
                .Any(t => t.RecurringBillId == bill.Id);

            if (!isPaid)
            {
                upcomingBillsAmount += bill.Amount;
            }
        }

        var safetyBuffer = thisWeekIncome * (bufferPercentage / 100);
        var safeToSpend = thisWeekIncome - thisWeekOutflow - upcomingBillsAmount - safetyBuffer;

        return new WeeklySafeToSpendDto
        {
            ThisWeekIncome = thisWeekIncome,
            ThisWeekOutflow = thisWeekOutflow,
            UpcomingBills = upcomingBillsAmount,
            SafetyBuffer = safetyBuffer,
            SafeToSpend = safeToSpend
        };
    }

    public async Task<FourWeekSummaryDto> CalculateFourWeekSummary(string userId)
    {
        var weeks = new List<WeekSummary>();

        for (int i = 3; i >= 0; i--)
        {
            var weekStart = GetWeekStart(DateTime.UtcNow.AddDays(-7 * i));
            var weekEnd = GetWeekEnd(DateTime.UtcNow.AddDays(-7 * i));

            var weekTransactions = await _context.Transactions
                .Where(t => t.UserId == userId &&
                            t.Date >= weekStart &&
                            t.Date <= weekEnd)
                .ToListAsync();

            var income = weekTransactions
                .Where(t => t.Type == "Income")
                .Sum(t => t.Amount);

            var spent = weekTransactions
                .Where(t => t.Type != "Income")
                .Sum(t => t.Amount);

            weeks.Add(new WeekSummary
            {
                WeekNumber = 4 - i,
                StartDate = weekStart,
                EndDate = weekEnd,
                Income = income,
                Spent = spent,
                Net = income - spent
            });
        }

        return new FourWeekSummaryDto
        {
            Weeks = weeks,
            MonthlyIncome = weeks.Sum(w => w.Income),
            MonthlySpent = weeks.Sum(w => w.Spent),
            MonthlyNet = weeks.Sum(w => w.Net)
        };
    }

    private DateTime GetWeekStart(DateTime date)
    {
        var diff = (7 + (date.DayOfWeek - DayOfWeek.Monday)) % 7;
        return date.AddDays(-1 * diff).Date;
    }

    private DateTime GetWeekEnd(DateTime date)
    {
        return GetWeekStart(date).AddDays(6);
    }
}
```

#### Step 1.5: Create Controllers
```csharp
// Controllers/RecurringBillsController.cs
// NOTE: Returns RecurringBill model directly (no DTO needed for simple CRUD)
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RecurringBillsController : ControllerBase
{
    private readonly RecurringBillService _billService;

    public RecurringBillsController(RecurringBillService billService)
    {
        _billService = billService;
    }

    [HttpGet]
    public async Task<ActionResult<List<RecurringBill>>> GetRecurringBills()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var bills = await _billService.GetUserRecurringBills(userId);
        return Ok(bills);  // Returns model directly
    }

    [HttpPost]
    public async Task<ActionResult<RecurringBill>> CreateRecurringBill([FromBody] RecurringBill bill)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        bill.UserId = userId;

        var created = await _billService.CreateRecurringBill(bill);
        return CreatedAtAction(nameof(GetRecurringBills), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<RecurringBill>> UpdateRecurringBill(int id, [FromBody] RecurringBill bill)
    {
        var updated = await _billService.UpdateRecurringBill(id, bill);
        if (updated == null) return NotFound();
        return Ok(updated);  // Returns model directly
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteRecurringBill(int id)
    {
        var result = await _billService.DeleteRecurringBill(id);
        if (!result) return NotFound();
        return NoContent();
    }

    [HttpPost("generate-due")]
    public async Task<ActionResult<List<Transaction>>> GenerateDueBills()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var generated = await _billService.GenerateDueBills(userId);
        return Ok(generated);
    }
}

// Controllers/BudgetController.cs
// NOTE: Uses DTOs because these endpoints return CALCULATED data (not database models)
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BudgetController : ControllerBase
{
    private readonly BudgetCalculationService _calculationService;

    public BudgetController(BudgetCalculationService calculationService)
    {
        _calculationService = calculationService;
    }

    [HttpGet("safe-to-spend")]
    public async Task<ActionResult<WeeklySafeToSpendDto>> GetSafeToSpend()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var result = await _calculationService.CalculateWeeklySafeToSpend(userId);
        return Ok(result);  // Returns DTO with calculated fields
    }

    [HttpGet("four-week-summary")]
    public async Task<ActionResult<FourWeekSummaryDto>> GetFourWeekSummary()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var result = await _calculationService.CalculateFourWeekSummary(userId);
        return Ok(result);
    }
}
```

#### Step 1.6: Register Services
```csharp
// Program.cs or Startup.cs
builder.Services.AddScoped<RecurringBillService>();
builder.Services.AddScoped<BudgetCalculationService>();
```

---

### Phase 2: Frontend Setup (React/Next.js)

#### Step 2.1: Create Service Layer
```javascript
// services/RecurringBillService.js
export async function GetRecurringBills(accessToken) {
  const response = await fetch('https://localhost:7232/api/recurringbills', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Failed to fetch recurring bills');
  return await response.json();
}

export async function CreateRecurringBill(bill, accessToken) {
  const response = await fetch('https://localhost:7232/api/recurringbills', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bill)
  });

  if (!response.ok) throw new Error('Failed to create recurring bill');
  return await response.json();
}

export async function UpdateRecurringBill(id, bill, accessToken) {
  const response = await fetch(`https://localhost:7232/api/recurringbills/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bill)
  });

  if (!response.ok) throw new Error('Failed to update recurring bill');
  return await response.json();
}

export async function DeleteRecurringBill(id, accessToken) {
  const response = await fetch(`https://localhost:7232/api/recurringbills/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) throw new Error('Failed to delete recurring bill');
}

export async function GenerateDueBills(accessToken) {
  const response = await fetch('https://localhost:7232/api/recurringbills/generate-due', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) throw new Error('Failed to generate due bills');
  return await response.json();
}

// services/BudgetService.js
export async function GetSafeToSpend(accessToken) {
  const response = await fetch('https://localhost:7232/api/budget/safe-to-spend', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Failed to fetch safe to spend');
  return await response.json();
}

export async function GetFourWeekSummary(accessToken) {
  const response = await fetch('https://localhost:7232/api/budget/four-week-summary', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Failed to fetch four week summary');
  return await response.json();
}
```

#### Step 2.2: Update Transactions Component
```javascript
// app/components/transactions/Transactions.jsx

// ADD IMPORTS:
import { GetSafeToSpend } from '@services/BudgetService';
import { GenerateDueBills } from '@services/RecurringBillService';

// ADD STATE:
const [safeToSpend, setSafeToSpend] = useState(null);

// ADD TO useEffect:
useEffect(() => {
  fetchTransactions();
  getChartData();
  fetchSafeToSpend();        // NEW
  generateDueBills();        // NEW
}, []);

// ADD FUNCTIONS:
const fetchSafeToSpend = async () => {
  try {
    const data = await GetSafeToSpend(session.accessToken);
    setSafeToSpend(data);
  } catch (error) {
    console.error('Failed to fetch safe to spend:', error);
  }
};

const generateDueBills = async () => {
  try {
    const generated = await GenerateDueBills(session.accessToken);
    if (generated.length > 0) {
      // Refresh transactions to show newly generated bills
      fetchTransactions();
    }
  } catch (error) {
    console.error('Failed to generate due bills:', error);
  }
};

// UPDATE Quick Actions section (around line 590-615):
<div className={styles.quickActionsCard}>
  <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
  <div className={styles.actionsList}>
    <button
      className={styles.actionButton}
      onClick={() => setSidePanelOpen(true)}
    >
      <div className={styles.actionIconPurple}>
        <span>+</span>
      </div>
      Add Transaction
    </button>

    {/* NEW BUTTON - Replace Export/Import CSV */}
    <Link href="/budget" style={{ textDecoration: 'none' }}>
      <button className={styles.actionButton}>
        <div className={styles.actionIconBlue}>
          <span>📋</span>
        </div>
        Manage Bills & Budget
      </button>
    </Link>
  </div>
</div>

// ADD Safe to Spend box after Savings Rate (around line 545):
{/* Savings Rate Badge */}
<div className={styles.savingsRateBadge}>
  {/* ... existing savings rate code ... */}
</div>

{/* NEW: Safe to Spend Box */}
<div className={styles.safeToSpendBox}>
  <div className={styles.safeToSpendHeader}>
    <span className={styles.safeToSpendIcon}>💰</span>
    <p className={styles.safeToSpendLabel}>Safe to Spend This Week</p>
  </div>
  <h3 className={styles.safeToSpendAmount}>
    ${safeToSpend?.safeToSpend?.toFixed(2) || '0.00'}
  </h3>
  <p className={styles.safeToSpendSubtext}>
    Based on this week's cash flow
  </p>
</div>
```

#### Step 2.3: Add CSS for Safe to Spend Box
```css
/* app/components/transactions/transactionsPreview.module.css */

/* ADD: */
.safeToSpendBox {
  margin-top: 16px;
  padding: 16px;
  background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
  border-radius: 12px;
  border: 1px solid #BAE6FD;
}

.safeToSpendHeader {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.safeToSpendIcon {
  font-size: 20px;
}

.safeToSpendLabel {
  font-size: 13px;
  font-weight: 500;
  color: #0369A1;
  margin: 0;
}

.safeToSpendAmount {
  font-size: 28px;
  font-weight: 700;
  color: #0C4A6E;
  margin: 4px 0;
}

.safeToSpendSubtext {
  font-size: 12px;
  color: #0369A1;
  margin: 0;
  opacity: 0.8;
}
```

#### Step 2.4: Create Budget Page
```javascript
// app/budget/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { GetSafeToSpend, GetFourWeekSummary } from '@services/BudgetService';
import { GetRecurringBills } from '@services/RecurringBillService';
import SafeToSpendCard from '@components/budget/SafeToSpendCard';
import FourWeekOverview from '@components/budget/FourWeekOverview';
import RecurringBillsList from '@components/budget/RecurringBillsList';
import styles from './budget.module.css';

const BudgetPage = () => {
  const { data: session } = useSession();
  const [safeToSpend, setSafeToSpend] = useState(null);
  const [fourWeekSummary, setFourWeekSummary] = useState(null);
  const [recurringBills, setRecurringBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [safeToSpendData, summaryData, billsData] = await Promise.all([
        GetSafeToSpend(session.accessToken),
        GetFourWeekSummary(session.accessToken),
        GetRecurringBills(session.accessToken)
      ]);

      setSafeToSpend(safeToSpendData);
      setFourWeekSummary(summaryData);
      setRecurringBills(billsData);
    } catch (error) {
      console.error('Failed to fetch budget data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading budget data...</div>;
  }

  return (
    <div className={styles.budgetContainer}>
      <div className={styles.budgetContent}>
        {/* Header */}
        <section className={styles.headerSection}>
          <div>
            <h2 className={styles.mainTitle}>Bills & Budget Manager</h2>
            <p className={styles.description}>
              Manage recurring bills and track your safe-to-spend amount
            </p>
          </div>
        </section>

        {/* Main Grid */}
        <div className={styles.budgetGrid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Safe to Spend - Detailed */}
            <SafeToSpendCard data={safeToSpend} />

            {/* Four Week Overview */}
            <FourWeekOverview data={fourWeekSummary} />
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Recurring Bills Manager */}
            <RecurringBillsList
              bills={recurringBills}
              onUpdate={fetchData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
```

#### Step 2.5: Create Budget Components
```javascript
// app/components/budget/SafeToSpendCard.jsx
import React from 'react';
import styles from './SafeToSpendCard.module.css';

const SafeToSpendCard = ({ data }) => {
  if (!data) return null;

  const isPositive = data.safeToSpend >= 0;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>💰 Safe to Spend This Week</h3>

      <div className={`${styles.amount} ${isPositive ? styles.positive : styles.negative}`}>
        ${data.safeToSpend.toFixed(2)}
      </div>

      <div className={styles.breakdown}>
        <div className={styles.breakdownRow}>
          <span>This Week's Income:</span>
          <span className={styles.income}>${data.thisWeekIncome.toFixed(2)}</span>
        </div>

        <div className={styles.breakdownRow}>
          <span>- Already Spent:</span>
          <span className={styles.expense}>-${data.thisWeekOutflow.toFixed(2)}</span>
        </div>

        <div className={styles.breakdownRow}>
          <span>- Upcoming Bills:</span>
          <span className={styles.expense}>-${data.upcomingBills.toFixed(2)}</span>
        </div>

        <div className={styles.breakdownRow}>
          <span>- Safety Buffer (10%):</span>
          <span className={styles.expense}>-${data.safetyBuffer.toFixed(2)}</span>
        </div>

        <div className={styles.divider}></div>

        <div className={`${styles.breakdownRow} ${styles.total}`}>
          <span>= Safe to Spend:</span>
          <span className={isPositive ? styles.income : styles.expense}>
            ${data.safeToSpend.toFixed(2)} {isPositive ? '✅' : '⚠️'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SafeToSpendCard;

// app/components/budget/FourWeekOverview.jsx
import React from 'react';
import styles from './FourWeekOverview.module.css';

const FourWeekOverview = ({ data }) => {
  if (!data) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>📊 Last 4 Weeks Overview</h3>

      {data.weeks.map((week, index) => (
        <div key={index} className={styles.weekRow}>
          <div className={styles.weekHeader}>
            <span className={styles.weekLabel}>
              Week {week.weekNumber} ({formatDate(week.startDate)} - {formatDate(week.endDate)})
            </span>
          </div>

          <div className={styles.weekStats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Income:</span>
              <span className={styles.statIncome}>${week.income.toFixed(2)}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Spent:</span>
              <span className={styles.statExpense}>${week.spent.toFixed(2)}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Net:</span>
              <span className={week.net >= 0 ? styles.statIncome : styles.statExpense}>
                {week.net >= 0 ? '+' : ''}${week.net.toFixed(2)} {week.net >= 0 ? '✅' : '⚠️'}
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.divider}></div>

      <div className={styles.monthlyTotal}>
        <h4 className={styles.monthlyTitle}>Monthly Total</h4>
        <div className={styles.weekStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Income:</span>
            <span className={styles.statIncome}>${data.monthlyIncome.toFixed(2)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Spent:</span>
            <span className={styles.statExpense}>${data.monthlySpent.toFixed(2)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Net:</span>
            <span className={data.monthlyNet >= 0 ? styles.statIncome : styles.statExpense}>
              {data.monthlyNet >= 0 ? '+' : ''}${data.monthlyNet.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourWeekOverview;

// app/components/budget/RecurringBillsList.jsx
import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { DeleteRecurringBill } from '@services/RecurringBillService';
import AddBillModal from './AddBillModal';
import styles from './RecurringBillsList.module.css';

const RecurringBillsList = ({ bills, onUpdate }) => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this recurring bill?')) return;

    try {
      await DeleteRecurringBill(id, session.accessToken);
      onUpdate();
    } catch (error) {
      console.error('Failed to delete bill:', error);
    }
  };

  const handleEdit = (bill) => {
    setEditingBill(bill);
    setIsModalOpen(true);
  };

  const formatNextDue = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>📋 Recurring Bills ({bills.length})</h3>
        <button
          className={styles.addButton}
          onClick={() => {
            setEditingBill(null);
            setIsModalOpen(true);
          }}
        >
          + Add Bill
        </button>
      </div>

      {bills.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No recurring bills yet</p>
          <button
            className={styles.emptyButton}
            onClick={() => setIsModalOpen(true)}
          >
            Add Your First Bill
          </button>
        </div>
      ) : (
        <div className={styles.billsList}>
          {bills.map((bill) => (
            <div key={bill.id} className={styles.billCard}>
              <div className={styles.billLeft}>
                <div className={styles.billIcon}>
                  <span>🔁</span>
                </div>
                <div className={styles.billInfo}>
                  <h4 className={styles.billName}>{bill.description}</h4>
                  <p className={styles.billDetails}>
                    {bill.category} • {bill.frequency} • Due: {formatNextDue(bill.nextDueDate)}
                  </p>
                </div>
              </div>

              <div className={styles.billRight}>
                <h4 className={styles.billAmount}>${bill.amount.toFixed(2)}</h4>
                <div className={styles.billActions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(bill)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(bill.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddBillModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBill(null);
        }}
        onSuccess={() => {
          setIsModalOpen(false);
          setEditingBill(null);
          onUpdate();
        }}
        editingBill={editingBill}
      />
    </div>
  );
};

export default RecurringBillsList;

// app/components/budget/AddBillModal.jsx
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { CreateRecurringBill, UpdateRecurringBill } from '@services/RecurringBillService';
import styles from './AddBillModal.module.css';

const AddBillModal = ({ isOpen, onClose, onSuccess, editingBill }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'Expense',
    frequency: 'monthly',
    nextDueDate: '',
    account: 'Main Account',
    status: 'Pending'
  });

  useEffect(() => {
    if (editingBill) {
      setFormData({
        description: editingBill.description,
        amount: editingBill.amount,
        category: editingBill.category,
        type: editingBill.type,
        frequency: editingBill.frequency,
        nextDueDate: editingBill.nextDueDate.split('T')[0],
        account: editingBill.account,
        status: editingBill.status
      });
    }
  }, [editingBill]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const billData = {
        ...formData,
        amount: parseFloat(formData.amount),
        nextDueDate: new Date(formData.nextDueDate).toISOString()
      };

      if (editingBill) {
        await UpdateRecurringBill(editingBill.id, billData, session.accessToken);
      } else {
        await CreateRecurringBill(billData, session.accessToken);
      }

      onSuccess();
    } catch (error) {
      console.error('Failed to save bill:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{editingBill ? 'Edit' : 'Add'} Recurring Bill</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Description *</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="e.g., Netflix Subscription"
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Amount *</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0.00"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="Entertainment"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Expense">Expense</option>
                <option value="Savings">Savings</option>
                <option value="Loan">Loan</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Frequency</label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({...formData, frequency: e.target.value})}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Next Due Date *</label>
            <input
              type="date"
              value={formData.nextDueDate}
              onChange={(e) => setFormData({...formData, nextDueDate: e.target.value})}
              required
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {editingBill ? 'Update' : 'Add'} Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBillModal;
```

---

## 📡 API Endpoints

### Recurring Bills Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/recurringbills` | Get all active recurring bills for user | Required |
| POST | `/api/recurringbills` | Create new recurring bill | Required |
| PUT | `/api/recurringbills/{id}` | Update existing recurring bill | Required |
| DELETE | `/api/recurringbills/{id}` | Soft delete recurring bill (set IsActive = false) | Required |
| POST | `/api/recurringbills/generate-due` | Generate transactions for due bills | Required |

### Budget Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/budget/safe-to-spend` | Get weekly safe-to-spend calculation | Required |
| GET | `/api/budget/four-week-summary` | Get 4-week breakdown with monthly total | Required |

---

## 🎨 UI Components Structure

### Main Transactions Page Update
```
Cash Flow Analysis Card
├── Savings Rate Badge (existing)
├── Safe to Spend Box (NEW)
│   ├── Icon: 💰
│   ├── Amount: $315.00
│   └── Subtext: "Based on this week's cash flow"
└── Stacked Bars (existing)

Quick Actions Card
├── Add Transaction (existing)
└── Manage Bills & Budget (NEW - replaces CSV buttons)
```

### Budget Page Structure
```
/budget Page
├── Header Section
├── Budget Grid (2 columns)
│   ├── Left Column
│   │   ├── Safe to Spend Card (Detailed)
│   │   └── Four Week Overview Card
│   └── Right Column
│       └── Recurring Bills List Card
│           ├── Bills List
│           ├── Add Bill Button
│           └── Add Bill Modal (overlay)
```

---

## 💡 Key Design Decisions

### Why Weekly Instead of Monthly?
- **Actionable**: "Can I afford dinner tonight?" works with weekly view
- **Less overwhelming**: Smaller chunks of data easier to understand
- **Matches spending patterns**: Most people think week-to-week
- **Aligns with paychecks**: Many users paid weekly/bi-weekly

### Why Auto-Generate Bills as Transactions?
- **Unified view**: All money flow in one place (transactions page)
- **No separate tracking**: Don't need to check two different lists
- **Works with filters**: Bills show up in expense filters, charts, etc.
- **Audit trail**: Can see when bills were "paid" (generated)

### Why 10% Safety Buffer?
- **Prevents overdraft**: Small cushion for unexpected expenses
- **Psychological**: Encourages slight under-spending
- **Customizable**: Can be adjusted in budget settings (future)

---

## 🚀 Go-Live Checklist

### Backend
- [ ] Models created (RecurringBill, BudgetSettings)
- [ ] Transaction model updated (RecurringBillId field)
- [ ] DbContext updated with new DbSets
- [ ] Migration created and applied
- [ ] Services implemented (RecurringBillService, BudgetCalculationService)
- [ ] Controllers created (RecurringBillsController, BudgetController)
- [ ] Services registered in Program.cs
- [ ] Endpoints tested with Postman/Swagger

### Frontend
- [ ] Service layer created (RecurringBillService.js, BudgetService.js)
- [ ] Transactions.jsx updated (Safe to Spend box, Quick Actions button)
- [ ] Budget page created (/budget/page.jsx)
- [ ] Budget components created (SafeToSpendCard, FourWeekOverview, RecurringBillsList, AddBillModal)
- [ ] CSS modules created for all components
- [ ] Navigation updated (add link to /budget if needed)
- [ ] Testing: Add bill, generate transaction, verify calculations

### Testing Scenarios
- [ ] Create recurring bill (monthly Netflix $15)
- [ ] Verify bill appears in recurring bills list
- [ ] Wait for due date (or manually set to today)
- [ ] Call generate-due endpoint
- [ ] Verify transaction created with recurring_bill_id
- [ ] Verify safe-to-spend calculation correct
- [ ] Edit recurring bill, verify updates
- [ ] Delete recurring bill, verify soft delete
- [ ] Test with multiple transaction types (Income, Expense, Savings, etc.)
- [ ] Verify 4-week summary shows correct data

---

## 📊 Success Metrics to Track

After launch, measure:
- **Adoption**: % of users who add at least 1 recurring bill
- **Engagement**: How often users visit /budget page
- **Value**: Does safe-to-spend prevent overdrafts? (user feedback)
- **Accuracy**: Are calculations matching user expectations?

---

## 🔮 Future Enhancements (Not in Phase 1)

### Phase 2 Ideas:
- **Custom buffer percentage**: User can set their own safety buffer (5%, 15%, etc.)
- **Bill notifications**: Email/push when bills are due
- **Bill categories budget**: Set limits per category (max $50/mo on subscriptions)
- **Bill splitting**: Share bills with roommates/family
- **Trend predictions**: "You'll overspend by $X this month" warnings
- **Bank integration**: Auto-detect recurring bills from bank transactions
- **Paused bills**: Temporarily pause seasonal bills (gym during vacation)

---

## 📝 Notes & Considerations

### Date Handling
- All dates stored in UTC in database
- Frontend converts to user's local timezone
- Week starts on Monday (can be customized)

### Performance
- Calculations run on every page load (consider caching for high traffic)
- Index on `next_due_date` for fast bill queries
- Consider pagination for users with 100+ bills

### Security
- All endpoints require JWT authentication
- UserId from claims, never from request body
- Soft deletes (IsActive flag) preserve history

### Edge Cases
- What if user has no income this week? (Show $0 safe to spend)
- What if expenses > income? (Show negative, red warning)
- What if bill due date is in past? (Auto-generate immediately)
- What if user deletes transaction generated from bill? (Bill still active, will regenerate)

---

## 📞 Support & Troubleshooting

### Common Issues

**Issue**: Bills not generating automatically
- **Solution**: Call `/api/recurringbills/generate-due` on page load or set up cron job

**Issue**: Safe to spend showing wrong amount
- **Solution**: Verify week calculation (GetWeekStart/GetWeekEnd), check timezone

**Issue**: Recurring bills duplicating
- **Solution**: Check `isAlreadyPaidThisWeek` logic, ensure unique constraint

**Issue**: 4-week summary showing incomplete data
- **Solution**: Verify transactions have correct dates, check week boundary calculations

---

## 🎉 Implementation Complete!

Once all checkboxes are checked and testing passes, the feature is ready to launch!

**Remember**: Start simple, gather feedback, iterate. This feature solves a REAL problem - users will love it! 💰✅
