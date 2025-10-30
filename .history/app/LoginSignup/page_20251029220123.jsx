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
                        <h2 className={styles.logInTitle}>Welcome back!</h2>
                        <p>Enter your credentials to access your dashboard</p>

                        <div>
                            <div>
                                <label htmlFor="email">Email Address</label>
                                <div></div>
                                <span className={styles.inputIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <rect x="2" y="5" width="20" height="14" rx="1.5" fill="none" stroke="#666666" strokeWidth="1.5"/>
                                        <path d="M 2 5 L 12 13 L 22 5" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                                <input className={styles.inputField} type="text" placeholder='you@example.com'/>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="password">Password</label>
                                <span className={styles.inputIcon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M 8 10 L 8 7 C 8 4.8 9.8 3 12 3 C 14.2 3 16 4.8 16 7 L 16 8" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinecap="round"/>
                                        <rect x="6" y="10" width="12" height="9" rx="1.5" fill="none" stroke="#666666" strokeWidth="1.5"/>
                                        <circle cx="12" cy="14.5" r="1.2" fill="#666666"/>
                                    </svg>
                                </span>
                                <input type="text" placeholder=''/>
                                <button type='button'>
                                    <span className={styles.inputIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye">
                                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    </span>
                                </button>
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
                                <button>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#666666"/>
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#666666"/>
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#666666"/>
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#666666"/>
                                        </svg>
                                    </span>
                                </button>

                                <button>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="#666666"/>
                                        </svg>
                                    </span>
                                </button>

                                <button>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#666666"/>
                                        </svg>
                                    </span>
                                </button>
                            </div>

                        </div>

                        <div>
                            <p>Don't have an account?</p>
                            <Link href='/'>
                                Sign up now
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </div>
  )
}

export default page
