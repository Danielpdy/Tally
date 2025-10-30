import React from 'react'

const PasswordInput = () => {
  return (
    <div className={styles.inputWrapper}>
                            <label htmlFor="password">Password</label>
                            <div className={styles.passwordContainer}>
                                <div className={styles.inputContainer}>
                                    <span className={styles.inputIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <path d="M 8 10 L 8 7 C 8 4.8 9.8 3 12 3 C 14.2 3 16 4.8 16 7 L 16 8" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinecap="round"/>
                                            <rect x="6" y="10" width="12" height="9" rx="1.5" fill="none" stroke="#666666" strokeWidth="1.5"/>
                                            <circle cx="12" cy="14.5" r="1.2" fill="#666666"/>
                                        </svg>
                                    </span>
                                    <input
                                        type="password"
                                        id="password"
                                        className={styles.inputField}
                                        placeholder='••••••••'
                                    />
                                </div>
                                <button type='button' className={styles.passwordToggle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
  )
}

export default PasswordInput
