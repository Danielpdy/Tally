"use client";

import React from 'react';
import styles from './dashboard.module.css';
import skeletonStyles from './dashboardSkeleton.module.css';

const DashboardSkeleton = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.dashboardPage}>
                {/* Top Stats Row Skeleton */}
                <div className={styles.topStatsRow}>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '100px', height: '14px' }}></div>
                        </div>
                        <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '120px', height: '32px', marginTop: '12px' }}></div>
                        <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '90px', height: '12px', marginTop: '8px' }}></div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '100px', height: '14px' }}></div>
                        </div>
                        <div className={styles.flowItems} style={{ marginTop: '12px' }}>
                            <div className={styles.flowItem}>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '80px', height: '24px' }}></div>
                            </div>
                            <div className={styles.flowItem}>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '80px', height: '24px' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '100px', height: '14px' }}></div>
                        </div>
                        <div className={styles.goalProgress} style={{ marginTop: '12px' }}>
                            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '60px', height: '20px' }}></div>
                            <div className={styles.progressBarHorizontal}>
                                <div className={`${skeletonStyles.skeleton}`} style={{ width: '100%', height: '8px', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                        <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '120px', height: '12px', marginTop: '8px' }}></div>
                    </div>
                </div>

                {/* Main Content Grid Skeleton */}
                <div className={styles.mainGrid}>
                    {/* Left Column */}
                    <div className={styles.leftColumn}>
                        {/* Spending Chart Skeleton */}
                        <div className={skeletonStyles.chartCardSkeleton}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '180px', height: '20px' }}></div>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '60px', height: '24px', borderRadius: '12px' }}></div>
                            </div>
                            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonCircle}`} style={{ width: '200px', height: '200px', margin: '20px auto' }}></div>
                        </div>

                        {/* Cash Flow Chart Skeleton */}
                        <div className={skeletonStyles.chartCardSkeleton}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '150px', height: '20px' }}></div>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '80px', height: '24px', borderRadius: '12px' }}></div>
                            </div>
                            <div className={`${skeletonStyles.skeleton}`} style={{ width: '100%', height: '250px', borderRadius: '8px' }}></div>
                        </div>

                        {/* Expense Pattern Detector Skeleton */}
                        <div className={skeletonStyles.chartCardSkeleton}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '200px', height: '20px' }}></div>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '80px', height: '24px', borderRadius: '12px' }}></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={`${skeletonStyles.skeleton}`} style={{ width: '100%', height: '60px', borderRadius: '8px' }}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.rightColumn}>
                        {/* Safe to Spend Skeleton */}
                        <div className={skeletonStyles.chartCardSkeleton}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '130px', height: '20px' }}></div>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '60px', height: '24px', borderRadius: '12px' }}></div>
                            </div>
                            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonCircle}`} style={{ width: '150px', height: '150px', margin: '20px auto' }}></div>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '100px', height: '28px', margin: '0 auto' }}></div>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '140px', height: '14px', margin: '8px auto' }}></div>
                            </div>
                        </div>

                        {/* Financial Goals Skeleton */}
                        <div className={skeletonStyles.chartCardSkeleton}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '130px', height: '20px' }}></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[1, 2].map((i) => (
                                    <div key={i} className={`${skeletonStyles.skeleton}`} style={{ width: '100%', height: '80px', borderRadius: '8px' }}></div>
                                ))}
                            </div>
                        </div>

                        {/* Monthly Summary Skeleton */}
                        <div className={skeletonStyles.chartCardSkeleton}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '150px', height: '20px' }}></div>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '80px', height: '24px', borderRadius: '12px' }}></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className={`${skeletonStyles.skeleton}`} style={{ width: '100%', height: '60px', borderRadius: '8px' }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;
