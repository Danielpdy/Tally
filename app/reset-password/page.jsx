"use client"

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './ResetPassword.module.css';
import { resetPassword } from '@services/userService';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Both fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(token, password);
      setIsReset(true);
    } catch (err) {
      setError('Invalid or expired reset link. Please request a new one.');
    } finally {
      setIsLoading(false);
    }
  }

  if (!token) {
    return (
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <div className={styles.errorIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <h2>Invalid Link</h2>
          <p>This password reset link is invalid. Please request a new one.</p>
        </div>
        <div className={styles.backToLogin}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <Link href='/forgot-password'>Request new link</Link>
        </div>
      </div>
    );
  }

  return (
    <>
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
        {!isReset ? (
          <>
            <div className={styles.formHeader}>
              <div className={styles.lockIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 17v-2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                </svg>
              </div>
              <h2>Create new password</h2>
              <p>Your new password must be at least 6 characters long.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputWrapper}>
                <label htmlFor="password">New Password</label>
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
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={styles.inputField}
                      placeholder='••••••••'
                    />
                    <button type='button' className={styles.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

              <div className={styles.inputWrapper}>
                <label htmlFor="confirmPassword">Confirm Password</label>
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
                      name='confirmPassword'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={showConfirm ? "text" : "password"}
                      id="confirmPassword"
                      className={styles.inputField}
                      placeholder='••••••••'
                    />
                    <button type='button' className={styles.passwordToggle}
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

              {error && <p className={styles.errorMessage}>{error}</p>}

              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? <span className="svg-spinners--180-ring"></span> : "Reset Password"}
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
            <h2>Password reset!</h2>
            <p>Your password has been successfully updated. You can now sign in with your new password.</p>
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
    </>
  );
}

const page = () => {
  return (
    <div className={styles.mainContainer}>
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}

export default page
