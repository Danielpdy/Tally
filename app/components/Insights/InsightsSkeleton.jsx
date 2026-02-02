"use client";

import React from 'react';
import styles from './insights.module.css';
import skeletonStyles from './insightsSkeleton.module.css';

const InsightsSkeleton = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.insightsPage}>
                {/* Health Score Card Skeleton */}
                <div className={styles.healthScoreCard}>
                    <div className={styles.healthScoreLeft}>
                        <div className={styles.scoreCircle}>
                            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonCircle}`} style={{ width: '140px', height: '140px' }}></div>
                        </div>
                    </div>
                    <div className={styles.healthScoreRight}>
                        <div className={styles.healthTitleRow}>
                            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '180px', height: '28px' }}></div>
                        </div>
                        <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '100%', maxWidth: '500px', height: '14px', marginBottom: '8px' }}></div>
                        <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '80%', maxWidth: '400px', height: '14px', marginBottom: '20px' }}></div>

                        <div className={styles.scoreFactors}>
                            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '180px', height: '13px', marginBottom: '10px' }}></div>
                            <div className={styles.scoreFactorsTags}>
                                <div className={`${skeletonStyles.skeleton}`} style={{ width: '100px', height: '30px', borderRadius: '20px' }}></div>
                                <div className={`${skeletonStyles.skeleton}`} style={{ width: '140px', height: '30px', borderRadius: '20px' }}></div>
                                <div className={`${skeletonStyles.skeleton}`} style={{ width: '120px', height: '30px', borderRadius: '20px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Three Cards Row Skeleton */}
                <div className={styles.cardsRow}>
                    {/* Cash Flow Insights Card Skeleton */}
                    <div className={styles.insightCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleRow}>
                                <div className={`${skeletonStyles.skeleton}`} style={{ width: '40px', height: '40px', borderRadius: '10px' }}></div>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '140px', height: '16px' }}></div>
                            </div>
                            <div className={`${skeletonStyles.skeleton}`} style={{ width: '60px', height: '24px', borderRadius: '6px' }}></div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                            {[1, 2, 3].map((i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonCircle}`} style={{ width: '8px', height: '8px', marginTop: '6px' }}></div>
                                    <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '100%', height: '14px' }}></div>
                                </div>
                            ))}
                        </div>
                        <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '90%', height: '13px', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}></div>
                    </div>

                    {/* Bill Alerts Card Skeleton */}
                    <div className={styles.insightCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleRow}>
                                <div className={`${skeletonStyles.skeleton}`} style={{ width: '40px', height: '40px', borderRadius: '10px' }}></div>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '100px', height: '16px' }}></div>
                            </div>
                            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonCircle}`} style={{ width: '24px', height: '24px' }}></div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`${skeletonStyles.skeleton}`} style={{ width: '100%', height: '48px', borderRadius: '10px' }}></div>
                            ))}
                        </div>
                        <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '140px', height: '14px', marginTop: 'auto' }}></div>
                    </div>

                    {/* Savings Rate Card Skeleton */}
                    <div className={styles.insightCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleRow}>
                                <div className={`${skeletonStyles.skeleton}`} style={{ width: '40px', height: '40px', borderRadius: '10px' }}></div>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '110px', height: '16px' }}></div>
                            </div>
                            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonCircle}`} style={{ width: '16px', height: '16px' }}></div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '16px 0' }}>
                            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '120px', height: '56px' }}></div>
                            <div className={`${skeletonStyles.skeleton}`} style={{ width: '180px', height: '30px', borderRadius: '20px' }}></div>
                        </div>
                        <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '100%', height: '13px', textAlign: 'center' }}></div>
                    </div>
                </div>

                {/* Two Cards Row Skeleton */}
                <div className={styles.cardsRowTwo}>
                    {/* Goal Progress Card Skeleton */}
                    <div className={styles.insightCardSmall}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleRow}>
                                <div className={`${skeletonStyles.skeleton}`} style={{ width: '40px', height: '40px', borderRadius: '10px' }}></div>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '120px', height: '16px' }}></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
                            {[1, 2, 3].map((i) => (
                                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '100px', height: '14px' }}></div>
                                        <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '40px', height: '14px' }}></div>
                                    </div>
                                    <div className={`${skeletonStyles.skeleton}`} style={{ width: '100%', height: '6px', borderRadius: '3px' }}></div>
                                    <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '120px', height: '12px' }}></div>
                                </div>
                            ))}
                        </div>
                        <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '160px', height: '14px', marginTop: 'auto' }}></div>
                    </div>

                    {/* Monthly Summary Card Skeleton */}
                    <div className={styles.insightCardLarge}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleRow}>
                                <div className={`${skeletonStyles.skeleton}`} style={{ width: '40px', height: '40px', borderRadius: '10px' }}></div>
                                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '140px', height: '16px' }}></div>
                            </div>
                            <div className={`${skeletonStyles.skeleton}`} style={{ width: '80px', height: '24px', borderRadius: '6px' }}></div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '16px 0' }}>
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`${skeletonStyles.skeleton}`} style={{ width: '100%', height: '100px', borderRadius: '12px' }}></div>
                            ))}
                        </div>
                        <div className={`${skeletonStyles.skeleton} ${skeletonStyles.skeletonText}`} style={{ width: '140px', height: '14px', marginTop: 'auto' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightsSkeleton;
