"use client"

import React from 'react';
import styles from '../LoginSignup/LoginSignup.module.css';
import { useState } from 'react';

const PasswordInput = () => {

    const [showPassword, setShowPassword] = useState(false);

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
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={styles.inputFieldPassword}
                    placeholder='••••••••'
                />
            
                <button type='button' className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg> :
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off">
                            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
                            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
                            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
                            <path d="m2 2 20 20"/>
                    </svg>
                    }
                </button>
            </div>
        </div>
    </div>
  )
}

export default PasswordInput
