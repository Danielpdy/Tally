"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './accept-terms.module.css';

export default function AcceptTermsPage() {
    const { data: session, update } = useSession();
    const [agreed, setAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const pending = session?.pendingOAuth;

    async function handleSubmit(e) {
        e.preventDefault();
        if (!agreed || !pending) return;

        setIsLoading(true);
        setError(null);

        try {
            const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
            const res = await fetch(`${apiBase}/users/oauth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: pending.email,
                    name: pending.name,
                    provider: pending.provider,
                    termsAgreedAt: new Date().toISOString(),
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to create account.");
            }

            const data = await res.json();

            // Update the NextAuth session with real tokens and clear the pending flag
            await update({
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                accessToken: data.user.token,
                refreshToken: data.refreshToken,
                accessTokenExpires: Date.now() + (data.expiresIn * 1000),
                pendingOAuth: null,
            });

            // Hard redirect so the browser re-reads the updated session cookie
            // (client-side router.push won't re-run middleware with the new token)
            window.location.href = "/dashboard";
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.card}>
                {/* Logo */}
                <div className={styles.logoRow}>
                    <Image
                        src="/assets/icons/tallyappIcon.svg"
                        alt="Tally"
                        width={40}
                        height={40}
                    />
                    <span className={styles.logoText}>Tally</span>
                </div>

                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.iconWrap}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10 9 9 9 8 9"/>
                        </svg>
                    </div>
                    <h1 className={styles.title}>One last step</h1>
                    <p className={styles.subtitle}>
                        Before we create your account
                        {pending?.name ? ` for ${pending.name}` : ''}, please review and accept our legal agreements.
                    </p>
                </div>

                {/* Summary boxes */}
                <div className={styles.summaryGrid}>
                    <div className={styles.summaryItem}>
                        <div className={styles.summaryIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                        </div>
                        <div>
                            <p className={styles.summaryLabel}>Your data is safe</p>
                            <p className={styles.summaryText}>Encrypted & never sold</p>
                        </div>
                    </div>
                    <div className={styles.summaryItem}>
                        <div className={styles.summaryIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                        </div>
                        <div>
                            <p className={styles.summaryLabel}>No financial advice</p>
                            <p className={styles.summaryText}>For tracking purposes only</p>
                        </div>
                    </div>
                    <div className={styles.summaryItem}>
                        <div className={styles.summaryIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                <path d="M10 11v6M14 11v6"/>
                            </svg>
                        </div>
                        <div>
                            <p className={styles.summaryLabel}>Delete anytime</p>
                            <p className={styles.summaryText}>Full control over your account</p>
                        </div>
                    </div>
                </div>

                {/* Links */}
                <div className={styles.linksBox}>
                    <p className={styles.linksTitle}>Please read before agreeing:</p>
                    <div className={styles.linksRow}>
                        <Link href="/terms" target="_blank" className={styles.docLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                            </svg>
                            Terms of Service
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                        </Link>
                        <Link href="/privacy" target="_blank" className={styles.docLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            Privacy Policy
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={`${styles.checkboxRow} ${agreed ? styles.checkboxRowChecked : ''}`}>
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className={styles.checkbox}
                        />
                        <span className={styles.checkboxLabel}>
                            I have read and I agree to the{' '}
                            <Link href="/terms" target="_blank" className={styles.inlineLink}>Terms of Service</Link>
                            {' '}and{' '}
                            <Link href="/privacy" target="_blank" className={styles.inlineLink}>Privacy Policy</Link>
                        </span>
                    </label>

                    {error && (
                        <div className={styles.errorBox}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`${styles.submitBtn} ${!agreed ? styles.submitBtnDisabled : ''}`}
                        disabled={!agreed || isLoading}
                    >
                        {isLoading ? (
                            <span className={styles.spinner} />
                        ) : (
                            <>
                                Create my account
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                                </svg>
                            </>
                        )}
                    </button>
                </form>

                <p className={styles.footer}>
                    Changed your mind?{' '}
                    <Link href="/LoginSignup" className={styles.footerLink}>Sign in with a different account</Link>
                </p>
            </div>
        </div>
    );
}
