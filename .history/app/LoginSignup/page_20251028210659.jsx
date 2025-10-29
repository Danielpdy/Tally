import React from 'react';
import Image from 'next/image';
import styles from './LoginSignup.module.css';

const page = () => {
  return (
    <div className={styles.mainContainer}>
        <section className={styles.formBox}>
            <div>
                <div className={styles.flexAlignGap10}>
                    <Image 
                        src="/assets/icons/tallyappIcon.svg" 
                        alt="Logo" 
                        width={46} 
                        height={46}
                    />
                    <div>
                        <h1 className='tallyMainTitle'>Tally</h1>
                        <p className='smallText'>Cash Flow Timeline</p>
                    </div>
                </div>
                <div>
                    <h3 className={styles.formSubtitle}>Take control of your</h3>
                    <h3 className={styles.subtitleGradient}>financial future</h3>
                    <p className='regularText'>Join thousands of users managing their finances with beatiful,
                        intuitive tools.
                    </p>
                </div>
                <div className={styles.statsBox}>
                    <div className={styles.stats}>
                        <p>5 min</p>
                        <p className='smallerText'>Setup Time</p>
                    </div>
                    <div className={styles.stats}>
                        <p>100%</p>
                        <p className='smallerText'>Free</p>
                    </div>
                    <div className={styles.stats}>
                        <p>24/7</p>
                        <p className='smallerText'>Access</p>
                    </div>
                </div>
                <div className={styles.analytics}>
                    <div className={styles.analytics}>
                        <div className={styles.flexAlignGap10}>
                            <Image 
                                src="assets/icons/trendingUpLogin.svg"
                                width={50}
                                height={50}
                                alt='trending up'
                            />
                            <div>
                                <p>Real-time Analytics</p>
                                <p>Track your cash flow instantly</p>
                            </div>
                        </div>
                        <div>
                            <Image 
                                src="assets/icons/arrowLogin.svg"
                                width={20}
                                height={20}
                                alt='arrow'
                            />
                        </div>
                    </div>

                    <div className={styles.analytics}>
                        <div className={styles.flexAlignGap10}>
                            <Image 
                                src="assets/icons/shieldLogin.svg"
                                width={50}
                                height={50}
                                alt='shield'
                            />
                            <div>
                                <p>Bank-level Security</p>
                                <p>Your data is encrypted & safe</p>
                            </div>
                        </div>
                        <div>
                            <Image 
                                src="assets/icons/arrowLogin.svg"
                                width={20}
                                height={20}
                                alt='arrow'
                            />
                        </div>
                    </div>

                    <div className={styles.analytics}>
                        <div className={styles.flexAlignGap10}>
                            <Image 
                                src="assets/icons/lightingLogin.svg"
                                width={50}
                                height={50}
                                alt='lighting'
                            />
                            <div>
                                <p>Lightning Fast</p>
                                <p>Get insights in milliseconds</p>
                            </div>
                        </div>
                        <div>
                            <Image 
                                src="assets/icons/arrowLogin.svg"
                                width={20}
                                height={20}
                                alt='arrow'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default page
