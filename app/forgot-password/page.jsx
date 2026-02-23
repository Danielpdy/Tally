"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './ForgotPassword.module.css';
import { forgotPassword } from '@services/userService';

const page = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await forgotPassword(email);
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
      setIsSubmitted(true);
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.floatingIcon} ${styles.topRightIcon}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8B4FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>

      <div className={`${styles.floatingIcon} ${styles.bottomLeftIcon}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF8042" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>

      <div className={styles.formCard}>
        {!isSubmitted ? (
          <>
            <div className={styles.formHeader}>
              <div className={styles.lockIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h2>Forgot your password?</h2>
              <p>No worries! Enter your email address and we'll send you a link to reset your password.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputWrapper}>
                <label htmlFor="email">Email Address</label>
                <div className={styles.inputContainer}>
                  <span className={styles.inputIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <rect x="2" y="5" width="20" height="14" rx="1.5" fill="none" stroke="#666666" strokeWidth="1.5"/>
                      <path d="M 2 5 L 12 13 L 22 5" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <input
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    className={styles.inputField}
                    placeholder='you@example.com'
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? <span className="svg-spinners--180-ring"></span> : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successSection}>
            <div className={styles.successIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2>Check your email</h2>
            <p>If an account exists with <strong>{email}</strong>, you'll receive a password reset link shortly.</p>
            <button className={styles.resendButton} onClick={() => setIsSubmitted(false)}>
              Didn't receive it? Try again
            </button>
          </div>
        )}

        <div className={styles.backToLogin}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <Link href='/LoginSignup'>Back to login</Link>
        </div>
      </div>
    </div>
  )
}

export default page
