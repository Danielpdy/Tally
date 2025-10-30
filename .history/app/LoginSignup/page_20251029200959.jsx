import React from 'react';
import Image from 'next/image';
import styles from './LoginSignup.module.css';
import Link from 'next/link';


const page = () => {
  return (
    <div className={styles.mainContainer}>
        <section className={styles.formBox}>
            <div className={styles.formBoxLeft}>
                <div className={styles.flexAlignGap10}>
                    <Image 
                        src="/assets/icons/tallyappIcon.svg" 
                        alt="Logo" 
                        width={56} 
                        height={56}
                    />
                    <div>
                        <h1 className={styles.tallyTitle}>Tally</h1>
                        <p className='smallText'>Cash Flow Timeline</p>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <h3 className={styles.formSubtitle}>Take control of your</h3>
                    <h3 className={styles.subtitleGradient}>financial future</h3>
                    <p className='regularText'>Join thousands of users managing their finances with beatiful,
                        intuitive tools.
                    </p>
                </div>
                <div className={styles.statsBox}>
                    <div className={styles.stats}>
                        <p style={{fontSize: '26px', fontWeight: '700', color: '#8B4FFF'}}>5 min</p>
                        <p className='smallerText'>Setup Time</p>
                    </div>
                    <div className={styles.stats}>
                        <p style={{fontSize: '26px', fontWeight: '700', color: '#FF8042'}}>100%</p>
                        <p className='smallerText'>Free</p>
                    </div>
                    <div className={styles.stats}>
                        <p style={{fontSize: '26px', fontWeight: '700', color: '#1a0b2e'}}>24/7</p>
                        <p className='smallerText'>Access</p>
                    </div>
                </div>
                <div className={styles.analyticsBox}>
                    <div className={styles.analytics}>
                        <div className={styles.flexAlignGap10}>
                            <Image 
                                src="assets/icons/trendingUpLogin.svg"
                                width={50}
                                height={50}
                                alt='trending up'
                            />
                            <div>
                                <p className={styles.analyticsTitles}>Real-time Analytics</p>
                                <p className='smallText'>Track your cash flow instantly</p>
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
                                <p className={styles.analyticsTitles}>Bank-level Security</p>
                                <p className='smallText'>Your data is encrypted & safe</p>
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
                                <p className={styles.analyticsTitles}>Lightning Fast</p>
                                <p className='smallText'>Get insights in milliseconds</p>
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

            <div className={styles.formBoxRight}>
                <form action="submit" className={styles.form}>
                    <div>
                        <button>Login</button>
                        <button>Sign Up</button>
                    </div>

                    <div>
                        <h2>Welcome back!</h2>
                        <p>Enter your credentials to access your dashboard</p>

                        <div>
                            <div>
                                <label htmlFor="email">Email Address</label>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <rect x="2" y="5" width="20" height="14" rx="1.5" fill="none" stroke="#666666" strokeWidth="1.5"/>
                                        <path d="M 2 5 L 12 13 L 22 5" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                                <input type="text" placeholder='you@example.com'/>
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M 8 10 L 8 7 C 8 4.8 9.8 3 12 3 C 14.2 3 16 4.8 16 7 L 16 8" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinecap="round"/>
                                        <rect x="6" y="10" width="12" height="9" rx="1.5" fill="none" stroke="#666666" strokeWidth="1.5"/>
                                        <circle cx="12" cy="14.5" r="1.2" fill="#666666"/>
                                    </svg>
                                </span>
                                <input type="text" placeholder=''/>
                            </div>

                            <div>
                                <Link href='/'>
                                    Forgot password?
                                </Link>
                            </div>

                            <button>Sign in to Dashboard</button>

                            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                                <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
                                <span style={{ padding: '0 15px', color: '#999', fontSize: '12px' }}>OR CONTINUE WITH</span>
                                <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
                            </div>    

                            <div>
                                
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </div>
  )
}

export default page
