import styles from "./budgets.module.css";

const BudgetSkeleton = () => {
  return (
    <div className={styles.twoColumnLayout}>
      {/* Left Column Skeleton */}
      <div className={styles.leftColumn}>
        {/* Safe to Spend Card Skeleton */}
        <div className={styles.safeToSpendCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.skeleton} ${styles.skeletonCircle} ${styles.skeletonIconCircle}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonHeader}`}></div>
          </div>

          <div className={styles.breakdownList}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.skeletonBreakdownItem}>
                <div className={`${styles.skeleton} ${styles.skeletonCircle} ${styles.skeletonBreakdownIcon}`}></div>
                <div className={styles.skeletonBreakdownContent}>
                  <div className={`${styles.skeleton} ${styles.skeletonBreakdownLabel}`}></div>
                  <div className={`${styles.skeleton} ${styles.skeletonBreakdownSubtext}`}></div>
                </div>
                <div className={`${styles.skeleton} ${styles.skeletonBreakdownAmount}`}></div>
              </div>
            ))}
          </div>

          <div className={styles.breakdownDivider}></div>

          <div className={styles.skeletonResult}>
            <div className={`${styles.skeleton} ${styles.skeletonResultLabel}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonResultAmount}`}></div>
          </div>
        </div>

        {/* Budget Settings Card Skeleton */}
        <div className={styles.budgetSettingsCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.skeleton} ${styles.skeletonCircle} ${styles.skeletonIconCircle}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonHeader}`}></div>
          </div>

          <div className={styles.settingsForm}>
            <div className={styles.settingGroup}>
              <div className={`${styles.skeleton} ${styles.skeletonBreakdownLabel}`} style={{ marginBottom: '8px' }}></div>
              <div className={`${styles.skeleton}`} style={{ width: '100%', height: '8px', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column Skeleton */}
      <div className={styles.rightColumn}>
        {/* Recurring Bills Card Skeleton */}
        <div className={styles.recurringBillsCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.skeleton} ${styles.skeletonCircle} ${styles.skeletonIconCircle}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonHeader}`}></div>
          </div>

          <div className={`${styles.skeleton}`} style={{ width: '100%', height: '44px', borderRadius: '8px', marginBottom: '20px' }}></div>

          <div className={`${styles.skeleton} ${styles.skeletonBreakdownLabel}`} style={{ marginBottom: '12px' }}></div>

          <div className={styles.billsList}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonBillItem}>
                <div className={`${styles.skeleton} ${styles.skeletonCircle} ${styles.skeletonBillIcon}`}></div>
                <div className={styles.skeletonBillInfo}>
                  <div className={`${styles.skeleton} ${styles.skeletonBillName}`}></div>
                  <div className={`${styles.skeleton} ${styles.skeletonBillMeta}`}></div>
                </div>
                <div className={`${styles.skeleton} ${styles.skeletonBillAmount}`}></div>
                <div className={styles.skeletonBillActions}>
                  <div className={`${styles.skeleton} ${styles.skeletonCircle} ${styles.skeletonButton}`}></div>
                  <div className={`${styles.skeleton} ${styles.skeletonCircle} ${styles.skeletonButton}`}></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255, 255, 255, 0.6)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <div className={`${styles.skeleton} ${styles.skeletonBreakdownLabel}`}></div>
            <div className={`${styles.skeleton}`} style={{ width: '80px', height: '18px' }}></div>
          </div>
        </div>

        {/* Quick Stats Card Skeleton */}
        <div className={styles.statsCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.skeleton} ${styles.skeletonCircle} ${styles.skeletonIconCircle}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonHeader}`}></div>
          </div>

          {[1, 2].map((i) => (
            <div key={i} className={styles.statItem}>
              <div className={`${styles.skeleton} ${styles.skeletonBreakdownLabel}`}></div>
              <div className={`${styles.skeleton}`} style={{ width: '60px', height: '16px' }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetSkeleton;
