import React from 'react';
import Skeleton from '@app/components/Skeleton';
import styles from './transactions.module.css';

const TransactionsSkeleton = () => {
    return (
        <div className={styles.mainContainer}>
            {/* Title Container Skeleton */}
            <section className={styles.titleContainer}>
                <div>
                    <Skeleton variant="title" width="180px" height="36px" />
                    <Skeleton variant="text" width="320px" height="20px" className={styles.skeletonMarginTop} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Skeleton variant="button" width="180px" height="44px" />
                    <Skeleton variant="button" width="120px" height="44px" />
                </div>
            </section>

            {/* Stats Skeleton */}
            <section className={styles.emptyStats}>
                <div>
                    <Skeleton variant="text" width="80px" height="20px" />
                    <Skeleton variant="stat" width="120px" height="32px" className={styles.skeletonMarginTop} />
                </div>
                <div>
                    <Skeleton variant="text" width="90px" height="20px" />
                    <Skeleton variant="stat" width="120px" height="32px" className={styles.skeletonMarginTop} />
                </div>
                <div>
                    <Skeleton variant="text" width="60px" height="20px" />
                    <Skeleton variant="stat" width="120px" height="32px" className={styles.skeletonMarginTop} />
                </div>
            </section>

            {/* Empty Message Skeleton */}
            <section className={styles.emptyTransMessage}>
                <section className={styles.emptyMessage}>
                    <div className={styles.messageEmpty}>
                        <Skeleton variant="circle" width="140px" height="140px" />
                        <Skeleton variant="heading" width="240px" height="32px" className={styles.skeletonMarginTop} />
                        <Skeleton variant="text" width="400px" height="20px" className={styles.skeletonMarginTop} />
                        <Skeleton variant="text" width="200px" height="20px" className={styles.skeletonMarginTop} />
                    </div>
                    <Skeleton variant="button" width="260px" height="48px" className={styles.skeletonMarginTop} />
                </section>
            </section>
        </div>
    );
};

export default TransactionsSkeleton;
