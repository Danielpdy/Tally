"use client";

import React from 'react';
import styles from './homepageSkeleton.module.css';

const HomepageSkeleton = () => {
    return (
        <section className="main">
            {/* Hero Section Skeleton */}
            <section className="gradient homeSection-main">
                <div className={styles.heroSection}>
                    <div className={`${styles.skeleton} ${styles.badge}`}></div>
                    <div className={`${styles.skeleton} ${styles.title}`}></div>
                    <div className={`${styles.skeleton} ${styles.subtitle}`}></div>

                    <div className={styles.buttonsRow}>
                        <div className={`${styles.skeleton} ${styles.button}`}></div>
                        <div className={`${styles.skeleton} ${styles.button}`}></div>
                    </div>

                    <div className={`${styles.skeleton} ${styles.smallNote}`}></div>

                    {/* Collage Cards Skeleton */}
                    <div className={styles.collageGrid}>
                        <div className={styles.collageCard}>
                            <div className={`${styles.skeleton} ${styles.skeletonCircle}`} style={{ width: '80px', height: '80px', margin: '0 auto' }}></div>
                            <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '120px', height: '16px' }}></div>
                            <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '180px', height: '12px' }}></div>
                        </div>

                        <div className={styles.collageCard}>
                            <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '100px', height: '14px' }}></div>
                            <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '140px', height: '32px' }}></div>
                            <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '110px', height: '12px' }}></div>
                        </div>

                        <div className={styles.collageCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '100px', height: '14px' }}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '50px', height: '14px', borderRadius: '10px' }}></div>
                            </div>
                            <div className={`${styles.skeleton} ${styles.skeletonCircle}`} style={{ width: '70px', height: '70px', margin: '0 auto' }}></div>
                            <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '90px', height: '20px', margin: '0 auto' }}></div>
                        </div>

                        <div className={styles.collageCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '120px', height: '14px' }}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '70px', height: '14px', borderRadius: '10px' }}></div>
                            </div>
                            <div className={`${styles.skeleton}`} style={{ width: '100%', height: '40px', borderRadius: '8px' }}></div>
                            <div className={`${styles.skeleton}`} style={{ width: '100%', height: '40px', borderRadius: '8px' }}></div>
                        </div>

                        <div className={styles.collageCard}>
                            <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '110px', height: '14px' }}></div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div className={`${styles.skeleton} ${styles.skeletonCircle}`} style={{ width: '50px', height: '50px' }}></div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '100px', height: '14px' }}></div>
                                    <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '120px', height: '12px' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.collageCard}`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '130px', height: '14px' }}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '60px', height: '14px', borderRadius: '10px' }}></div>
                            </div>
                            <div className={`${styles.skeleton}`} style={{ width: '100%', height: '100px', borderRadius: '8px' }}></div>
                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '60px', height: '10px' }}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '60px', height: '10px' }}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '60px', height: '10px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section Skeleton */}
            <section className={styles.featuresSection}>
                <div className={styles.featuresHeader}>
                    <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '320px', maxWidth: '100%', height: '32px' }}></div>
                    <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '500px', maxWidth: '100%', height: '16px' }}></div>
                    <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '400px', maxWidth: '100%', height: '16px' }}></div>
                </div>

                <div className={styles.featuresGrid}>
                    {/* Feature Card 1 */}
                    <div className={styles.featureCard}>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '150px', height: '20px' }}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '100%', height: '14px' }}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '80%', height: '14px' }}></div>
                        <div className={`${styles.skeleton} ${styles.featureVisualBlock}`}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '120px', height: '14px' }}></div>
                    </div>

                    {/* Feature Card 2 */}
                    <div className={styles.featureCard}>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '180px', height: '20px' }}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '100%', height: '14px' }}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '75%', height: '14px' }}></div>
                        <div className={`${styles.skeleton} ${styles.featureVisualBlock}`}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '110px', height: '14px' }}></div>
                    </div>

                    {/* Feature Card 3 - Large */}
                    <div className={`${styles.featureCard} ${styles.featureCardLarge}`}>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '200px', height: '20px' }}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '90%', height: '14px' }}></div>
                        <div className={`${styles.skeleton} ${styles.featureVisualBlock} ${styles.featureVisualBlockLarge}`}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '140px', height: '14px' }}></div>
                    </div>

                    {/* Feature Card 4 */}
                    <div className={`${styles.featureCard} ${styles.featureCardLarge}`}>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '140px', height: '20px' }}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '100%', height: '14px' }}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '70%', height: '14px' }}></div>
                        <div className={`${styles.skeleton} ${styles.featureVisualBlock}`}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '100px', height: '14px' }}></div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section Skeleton */}
            <section className={styles.whyChooseSection}>
                <div className={styles.featuresHeader}>
                    <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '240px', height: '32px' }}></div>
                    <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '460px', maxWidth: '100%', height: '16px' }}></div>
                </div>

                <div className={styles.whyChooseContent}>
                    {/* Left Column */}
                    <div className={styles.whyChooseColumn}>
                        {[1, 2].map((i) => (
                            <div key={i} className={styles.whyChooseCard}>
                                <div className={`${styles.skeleton} ${styles.whyChooseIcon}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '130px', height: '18px' }}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '100%', height: '12px' }}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '85%', height: '12px' }}></div>
                            </div>
                        ))}
                    </div>

                    {/* Center Image */}
                    <div className={`${styles.skeleton} ${styles.whyChooseImage}`}></div>

                    {/* Right Column */}
                    <div className={styles.whyChooseColumn}>
                        {[1, 2].map((i) => (
                            <div key={i} className={styles.whyChooseCard}>
                                <div className={`${styles.skeleton} ${styles.whyChooseIcon}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '120px', height: '18px' }}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '100%', height: '12px' }}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '80%', height: '12px' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section Skeleton */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaBox}>
                    <div className={styles.ctaLeft}>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '300px', maxWidth: '100%', height: '28px' }}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '380px', maxWidth: '100%', height: '14px' }}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '260px', maxWidth: '100%', height: '14px' }}></div>
                    </div>
                    <div className={styles.ctaRight}>
                        <div className={`${styles.skeleton} ${styles.ctaButton}`}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '150px', height: '12px' }}></div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default HomepageSkeleton;
