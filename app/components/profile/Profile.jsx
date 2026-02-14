"use client";
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './profile.module.css';

const Profile = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('personal');

    // Personal info state
    const nameParts = session?.user?.name?.split(' ') || ['', ''];
    const [firstName, setFirstName] = useState(nameParts[0] || '');
    const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || '');
    const [email, setEmail] = useState(session?.user?.email || '');
    const [phone, setPhone] = useState('');
    const [savingPersonal, setSavingPersonal] = useState(false);
    const [personalSaved, setPersonalSaved] = useState(false);

    // Password state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordSaved, setPasswordSaved] = useState(false);

    // Contact state
    const [contactSubject, setContactSubject] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [contactSent, setContactSent] = useState(false);

    // Delete account state
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleSavePersonal = () => {
        setSavingPersonal(true);
        setTimeout(() => {
            setSavingPersonal(false);
            setPersonalSaved(true);
            setTimeout(() => setPersonalSaved(false), 3000);
        }, 1000);
    };

    const handleResetPassword = () => {
        setPasswordError('');
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError('All fields are required');
            return;
        }
        if (newPassword.length < 8) {
            setPasswordError('New password must be at least 8 characters');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }
        setPasswordSaved(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordSaved(false), 3000);
    };

    const handleSendContact = () => {
        if (!contactSubject || !contactMessage) return;
        setContactSent(true);
        setContactSubject('');
        setContactMessage('');
        setTimeout(() => setContactSent(false), 3000);
    };

    const sidebarItems = [
        { id: 'personal', label: 'Personal Info', icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        )},
        { id: 'password', label: 'Emails & Password', icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
        )},
        { id: 'contact', label: 'Contact', icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
        )},
    ];

    return (
        <div className={styles.pageWrapper}>
            <nav className={styles.miniNavbar}>
                <Link href="/" className={styles.miniNavLogo}>
                    <Image
                        src="/assets/icons/tallyappIcon.svg"
                        alt="Logo"
                        width={36}
                        height={36}
                    />
                    <span className={styles.miniNavTitle}>Tally</span>
                </Link>
                <Link href="/profile" className={styles.miniNavProfileIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </Link>
            </nav>
            <div className={styles.profileContainer}>
                <div className={styles.profilePage}>
                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                    <h2 className={styles.sidebarTitle}>User profile management</h2>
                    <nav className={styles.sidebarNav}>
                        {sidebarItems.map(item => (
                            <button
                                key={item.id}
                                className={`${styles.sidebarItem} ${activeTab === item.id ? styles.sidebarItemActive : ''}`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <span className={styles.sidebarIcon}>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </nav>
                    <div className={styles.signOutButtonWrapper}>
                        <button
                            className={styles.signOutButton}
                            onClick={() => signOut({ callbackUrl: `${window.location.origin}/LoginSignup?callbackUrl=${pathname}` })}
                        >
                            <span className={styles.sidebarIcon}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                </svg>
                            </span>
                            Sign out
                        </button>
                    </div>
                </aside>

                {/* Content */}
                <main className={styles.content}>
                    {/* Personal Info Tab */}
                    {activeTab === 'personal' && (
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h1 className={styles.sectionTitle}>Personal information</h1>
                                {savingPersonal && (
                                    <span className={styles.savingIndicator}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.spinner}>
                                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                                        </svg>
                                        Saving changes
                                    </span>
                                )}
                                {personalSaved && (
                                    <span className={styles.savedIndicator}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        Changes saved
                                    </span>
                                )}
                            </div>

                            {/* Profile Avatar */}
                            <div className={styles.avatarSection}>
                                <div className={styles.avatar}>
                                    {session?.user?.image ? (
                                        <img src={session.user.image} alt="Profile" className={styles.avatarImage} />
                                    ) : (
                                        <span className={styles.avatarInitial}>
                                            {firstName?.charAt(0)?.toUpperCase() || 'U'}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className={styles.formGrid}>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.inputLabel}>First Name</label>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className={styles.inputField}
                                            placeholder="Enter your first name"
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputWrapper}>
                                    <label className={styles.inputLabel}>Last Name</label>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className={styles.inputField}
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputWrapper}>
                                    <label className={styles.inputLabel}>Email Address</label>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={styles.inputField}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputWrapper}>
                                    <label className={styles.inputLabel}>Phone Number</label>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className={styles.inputField}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button className={styles.saveButton} onClick={handleSavePersonal}>
                                Save Changes
                            </button>

                            {/* Delete Account Section */}
                            <div className={styles.deleteSection}>
                                <h3 className={styles.deleteTitle}>Delete Account</h3>
                                <div className={styles.deleteWarning}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EE6F4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="12" y1="8" x2="12" y2="12"/>
                                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                                    </svg>
                                    <p>This action is <strong>permanent</strong> and cannot be undone. All your data will be erased.</p>
                                </div>
                                <p className={styles.deleteDescription}>
                                    To permanently erase your whole Tally account, click the button below. This implies that you won't have access to your data, transactions, or any associated information.
                                </p>
                                {!showDeleteConfirm ? (
                                    <button className={styles.deleteButton} onClick={() => setShowDeleteConfirm(true)}>
                                        Delete my account
                                    </button>
                                ) : (
                                    <div className={styles.deleteConfirm}>
                                        <p className={styles.deleteConfirmText}>Are you sure? This action cannot be undone.</p>
                                        <div className={styles.deleteConfirmButtons}>
                                            <button className={styles.deleteConfirmYes}>
                                                Yes, delete my account
                                            </button>
                                            <button className={styles.deleteConfirmNo} onClick={() => setShowDeleteConfirm(false)}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Emails & Password Tab */}
                    {activeTab === 'password' && (
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h1 className={styles.sectionTitle}>Emails & Password</h1>
                                {passwordSaved && (
                                    <span className={styles.savedIndicator}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        Password updated
                                    </span>
                                )}
                            </div>

                            {/* Email Display */}
                            <div className={styles.emailDisplay}>
                                <div className={styles.emailInfo}>
                                    <span className={styles.emailLabel}>Account Email</span>
                                    <span className={styles.emailValue}>{session?.user?.email || 'No email set'}</span>
                                </div>
                                <div className={styles.emailBadge}>Primary</div>
                            </div>

                            {/* Reset Password */}
                            <div className={styles.passwordSection}>
                                <h3 className={styles.passwordSectionTitle}>Reset Password</h3>
                                <p className={styles.passwordSectionDescription}>
                                    Choose a strong password with at least 8 characters to keep your account secure.
                                </p>

                                {passwordError && (
                                    <div className={styles.errorMessage}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"/>
                                            <line x1="15" y1="9" x2="9" y2="15"/>
                                            <line x1="9" y1="9" x2="15" y2="15"/>
                                        </svg>
                                        {passwordError}
                                    </div>
                                )}

                                <div className={styles.passwordFields}>
                                    <div className={styles.inputWrapper}>
                                        <label className={styles.inputLabel}>Current Password</label>
                                        <div className={styles.passwordInputContainer}>
                                            <input
                                                type={showCurrentPassword ? 'text' : 'password'}
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className={styles.inputField}
                                                placeholder="Enter current password"
                                            />
                                            <button
                                                type="button"
                                                className={styles.passwordToggle}
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            >
                                                {showCurrentPassword ? (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                                    </svg>
                                                ) : (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                        <circle cx="12" cy="12" r="3"/>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.inputWrapper}>
                                        <label className={styles.inputLabel}>New Password</label>
                                        <div className={styles.passwordInputContainer}>
                                            <input
                                                type={showNewPassword ? 'text' : 'password'}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className={styles.inputField}
                                                placeholder="Enter new password"
                                            />
                                            <button
                                                type="button"
                                                className={styles.passwordToggle}
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                            >
                                                {showNewPassword ? (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                                    </svg>
                                                ) : (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                        <circle cx="12" cy="12" r="3"/>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.inputWrapper}>
                                        <label className={styles.inputLabel}>Confirm New Password</label>
                                        <div className={styles.passwordInputContainer}>
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className={styles.inputField}
                                                placeholder="Confirm new password"
                                            />
                                            <button
                                                type="button"
                                                className={styles.passwordToggle}
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                                    </svg>
                                                ) : (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                                        <circle cx="12" cy="12" r="3"/>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button className={styles.saveButton} onClick={handleResetPassword}>
                                    Update Password
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Contact Tab */}
                    {activeTab === 'contact' && (
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h1 className={styles.sectionTitle}>Contact Support</h1>
                                {contactSent && (
                                    <span className={styles.savedIndicator}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        Message sent
                                    </span>
                                )}
                            </div>

                            <p className={styles.contactDescription}>
                                Have a question, feedback, or need help? Reach out to our support team and we'll get back to you as soon as possible.
                            </p>

                            <div className={styles.contactCards}>
                                <div className={styles.contactCard}>
                                    <div className={styles.contactCardIcon}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                            <polyline points="22,6 12,13 2,6"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className={styles.contactCardTitle}>Email</h4>
                                        <p className={styles.contactCardText}>support@tally.com</p>
                                    </div>
                                </div>
                                <div className={styles.contactCard}>
                                    <div className={styles.contactCardIcon}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"/>
                                            <polyline points="12 6 12 12 16 14"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className={styles.contactCardTitle}>Response Time</h4>
                                        <p className={styles.contactCardText}>Within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.contactForm}>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.inputLabel}>Subject</label>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            value={contactSubject}
                                            onChange={(e) => setContactSubject(e.target.value)}
                                            className={styles.inputField}
                                            placeholder="What do you need help with?"
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputWrapper}>
                                    <label className={styles.inputLabel}>Message</label>
                                    <textarea
                                        value={contactMessage}
                                        onChange={(e) => setContactMessage(e.target.value)}
                                        className={styles.textareaField}
                                        placeholder="Describe your issue or question in detail..."
                                        rows={6}
                                    />
                                </div>
                            </div>

                            <button className={styles.saveButton} onClick={handleSendContact}>
                                Send Message
                            </button>
                        </div>
                    )}
                </main>
                </div>
            </div>
        </div>
    );
};

export default Profile;
