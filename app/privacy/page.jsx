import React from 'react';
import styles from './privacy.module.css';

export const metadata = {
    title: 'Privacy Policy | Tally',
    description: 'Privacy Policy for Tally - Personal Finance Manager',
};

const sections = [
    {
        id: 'introduction',
        title: '1. Introduction',
        content: [
            {
                type: 'paragraph',
                text: 'Welcome to Tally ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our financial management application and related services (collectively, the "Service").'
            },
            {
                type: 'paragraph',
                text: 'Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by all terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Service.'
            },
            {
                type: 'paragraph',
                text: 'We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Effective Date" at the top of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.'
            }
        ]
    },
    {
        id: 'information-collected',
        title: '2. Information We Collect',
        subsections: [
            {
                title: '2.1 Personal Information You Provide',
                content: [
                    {
                        type: 'paragraph',
                        text: 'We collect personal information that you voluntarily provide when you register for the Service, express an interest in obtaining information about us or our products, or otherwise contact us. The personal information we collect may include:'
                    },
                    {
                        type: 'list',
                        items: [
                            'Name and email address (for account registration)',
                            'Authentication credentials (password, OAuth tokens)',
                            'Profile information (username, profile picture)',
                            'Financial data you manually enter (transactions, income, expenses, bill amounts)',
                            'Financial goals and budget information',
                            'Communications and correspondence with us'
                        ]
                    }
                ]
            },
            {
                title: '2.2 Automatically Collected Information',
                content: [
                    {
                        type: 'paragraph',
                        text: 'When you access the Service, we may automatically collect certain information about your device and usage, including:'
                    },
                    {
                        type: 'list',
                        items: [
                            'Device information (browser type, operating system, device identifiers)',
                            'Log data (IP address, access times, pages viewed, referring URLs)',
                            'Usage patterns and interactions within the Service',
                            'Session information and authentication tokens'
                        ]
                    }
                ]
            },
            {
                title: '2.3 Third-Party Authentication Information',
                content: [
                    {
                        type: 'paragraph',
                        text: 'If you choose to register or log in using a third-party service (such as Google or GitHub), we receive certain information from that provider, including your name, email address, and profile picture, as permitted by your settings with the third-party service. We do not receive or store your passwords for third-party services.'
                    }
                ]
            }
        ]
    },
    {
        id: 'use-of-information',
        title: '3. How We Use Your Information',
        content: [
            {
                type: 'paragraph',
                text: 'We use the information we collect for the following purposes:'
            },
            {
                type: 'list',
                items: [
                    'To create and manage your user account and authenticate your identity',
                    'To provide, operate, and maintain the Service and its features',
                    'To process and display your financial data (transactions, budgets, goals) within the Service',
                    'To generate financial insights, analytics, and reports based on your data',
                    'To respond to your inquiries, provide customer support, and communicate with you about your account',
                    'To send you technical notices, security alerts, and administrative messages',
                    'To monitor and analyze usage patterns to improve the Service',
                    'To detect, investigate, and prevent fraudulent activity and unauthorized access',
                    'To comply with applicable legal obligations and enforce our terms'
                ]
            },
            {
                type: 'paragraph',
                text: 'We process your financial data solely for the purpose of providing the Service to you. We do not sell, rent, or monetize your personal financial data.'
            }
        ]
    },
    {
        id: 'data-storage',
        title: '4. Data Storage and Security',
        subsections: [
            {
                title: '4.1 Data Storage',
                content: [
                    {
                        type: 'paragraph',
                        text: 'Your data is stored on secure cloud infrastructure. Financial data you enter is stored in encrypted databases hosted by trusted third-party infrastructure providers. We use industry-standard transport layer security (TLS/HTTPS) to protect data in transit.'
                    }
                ]
            },
            {
                title: '4.2 Security Measures',
                content: [
                    {
                        type: 'paragraph',
                        text: 'We implement appropriate technical and organizational security measures designed to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:'
                    },
                    {
                        type: 'list',
                        items: [
                            'Encrypted storage of sensitive data (passwords are hashed using BCrypt)',
                            'Secure authentication with JSON Web Tokens (JWT) and refresh token rotation',
                            'HTTPS encryption for all data transmitted between your device and our servers',
                            'Role-based access controls limiting data access to authorized systems',
                            'Regular security assessments of our infrastructure'
                        ]
                    }
                ]
            },
            {
                title: '4.3 Limitation of Liability',
                content: [
                    {
                        type: 'paragraph',
                        text: 'While we take reasonable precautions to protect your data, no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee absolute security of your data. In the event of a data breach that is likely to result in risk to your rights and freedoms, we will notify you in accordance with applicable law.'
                    }
                ]
            }
        ]
    },
    {
        id: 'data-sharing',
        title: '5. Sharing of Your Information',
        content: [
            {
                type: 'paragraph',
                text: 'We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following limited circumstances:'
            },
            {
                type: 'list',
                items: [
                    'Service Providers: We may share information with trusted third-party vendors who assist us in operating the Service (e.g., cloud hosting, database services), subject to confidentiality agreements',
                    'Legal Requirements: We may disclose your information if required by law, regulation, legal process, or governmental request',
                    'Protection of Rights: We may disclose information where we believe it is necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, or situations involving potential threats to safety',
                    'Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email and/or prominent notice on the Service',
                    'With Your Consent: We may share your information for any other purpose with your prior consent'
                ]
            }
        ]
    },
    {
        id: 'third-party',
        title: '6. Third-Party Services',
        content: [
            {
                type: 'paragraph',
                text: 'The Service integrates with third-party authentication providers (Google, GitHub). When you use these services to authenticate, you are subject to their respective privacy policies:'
            },
            {
                type: 'list',
                items: [
                    'Google: https://policies.google.com/privacy',
                    'GitHub: https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement'
                ]
            },
            {
                type: 'paragraph',
                text: 'We are not responsible for the privacy practices of these third-party services. We encourage you to review their privacy policies before connecting your accounts.'
            }
        ]
    },
    {
        id: 'data-retention',
        title: '7. Data Retention',
        content: [
            {
                type: 'paragraph',
                text: 'We retain your personal information for as long as your account is active or as needed to provide the Service. If you choose to delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal, regulatory, or legitimate business purposes (such as to comply with applicable law or resolve disputes).'
            },
            {
                type: 'paragraph',
                text: 'Financial data and transaction records may be retained in anonymized or aggregated form for analytical purposes after account deletion. This data cannot be used to identify individual users.'
            }
        ]
    },
    {
        id: 'your-rights',
        title: '8. Your Rights and Choices',
        content: [
            {
                type: 'paragraph',
                text: 'Depending on your location, you may have certain rights regarding your personal information:'
            },
            {
                type: 'list',
                items: [
                    'Access: You have the right to request a copy of the personal information we hold about you',
                    'Rectification: You have the right to request correction of inaccurate or incomplete information',
                    'Erasure: You have the right to request deletion of your personal information ("right to be forgotten"), subject to certain legal exceptions',
                    'Portability: You have the right to request a machine-readable export of your personal data',
                    'Objection: You have the right to object to processing of your personal information in certain circumstances',
                    'Withdrawal of Consent: Where processing is based on consent, you have the right to withdraw consent at any time'
                ]
            },
            {
                type: 'paragraph',
                text: 'To exercise these rights, please contact us at the information provided in the Contact section below. We will respond to your request within 30 days.'
            }
        ]
    },
    {
        id: 'cookies',
        title: '9. Cookies and Tracking Technologies',
        content: [
            {
                type: 'paragraph',
                text: 'We use cookies and similar tracking technologies to maintain your session, remember your preferences, and analyze usage of the Service. Specifically, we use:'
            },
            {
                type: 'list',
                items: [
                    'Session Cookies: Required to keep you logged in and maintain your authenticated session',
                    'Preference Cookies: To remember your settings and preferences within the Service',
                    'Analytics: Aggregated, non-identifying usage data to improve the Service'
                ]
            },
            {
                type: 'paragraph',
                text: 'You can control cookies through your browser settings. Disabling essential cookies may affect the functionality of the Service, including your ability to remain logged in.'
            }
        ]
    },
    {
        id: 'childrens-privacy',
        title: '10. Children\'s Privacy',
        content: [
            {
                type: 'paragraph',
                text: 'The Service is not directed to individuals under the age of 16 ("children"). We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information. If you believe that a child has provided us with personal information, please contact us immediately.'
            }
        ]
    },
    {
        id: 'international',
        title: '11. International Data Transfers',
        content: [
            {
                type: 'paragraph',
                text: 'Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from the laws of your country. When we transfer your personal information internationally, we take appropriate measures to ensure that it receives adequate protection in accordance with this Privacy Policy and applicable law.'
            }
        ]
    },
    {
        id: 'disclaimer',
        title: '12. Disclaimer of Warranties',
        content: [
            {
                type: 'paragraph',
                text: 'THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TALLY EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.'
            },
            {
                type: 'paragraph',
                text: 'Tally does not provide financial, investment, legal, or tax advice. The financial data, insights, and analytics generated by the Service are for informational purposes only and should not be construed as professional financial advice. Users are responsible for their own financial decisions.'
            }
        ]
    },
    {
        id: 'limitation-liability',
        title: '13. Limitation of Liability',
        content: [
            {
                type: 'paragraph',
                text: 'TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, TALLY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICE.'
            },
            {
                type: 'paragraph',
                text: 'In no event shall our total liability to you for all claims exceed the amount you have paid to us in the twelve (12) months preceding the claim, or one hundred dollars ($100), whichever is greater.'
            }
        ]
    },
    {
        id: 'contact',
        title: '14. Contact Us',
        content: [
            {
                type: 'paragraph',
                text: 'If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:'
            },
            {
                type: 'contact',
                lines: [
                    'Tally — Personal Finance Manager',
                    'Developer: Daniel Pinzon',
                    'Email: tally.helpapp@gmail.com'
                ]
            },
            {
                type: 'paragraph',
                text: 'We will respond to your inquiry within 30 business days.'
            }
        ]
    }
];

export default function PrivacyPage() {
    const effectiveDate = 'February 24, 2026';

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.badge}>Legal</div>
                    <h1 className={styles.title}>Privacy Policy</h1>
                    <p className={styles.subtitle}>
                        Your privacy matters. This document explains how Tally collects, uses, and protects your personal information.
                    </p>
                    <div className={styles.meta}>
                        <span className={styles.metaItem}>
                            <span className={styles.metaLabel}>Effective Date:</span> {effectiveDate}
                        </span>
                        <span className={styles.metaDivider}>·</span>
                        <span className={styles.metaItem}>
                            <span className={styles.metaLabel}>Version:</span> 1.0
                        </span>
                    </div>
                </div>

                <div className={styles.layout}>
                    {/* Table of Contents */}
                    <aside className={styles.toc}>
                        <div className={styles.tocCard}>
                            <h2 className={styles.tocTitle}>Contents</h2>
                            <nav>
                                <ol className={styles.tocList}>
                                    {sections.map((section) => (
                                        <li key={section.id}>
                                            <a href={`#${section.id}`} className={styles.tocLink}>
                                                {section.title}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className={styles.content}>
                        {sections.map((section) => (
                            <section key={section.id} id={section.id} className={styles.section}>
                                <h2 className={styles.sectionTitle}>{section.title}</h2>

                                {/* Direct content */}
                                {section.content && renderContent(section.content)}

                                {/* Subsections */}
                                {section.subsections && section.subsections.map((sub, i) => (
                                    <div key={i} className={styles.subsection}>
                                        <h3 className={styles.subsectionTitle}>{sub.title}</h3>
                                        {renderContent(sub.content)}
                                    </div>
                                ))}
                            </section>
                        ))}

                        <div className={styles.footer}>
                            <p>This Privacy Policy was last updated on <strong>{effectiveDate}</strong>. Continued use of the Service after any changes constitutes acceptance of the updated Privacy Policy.</p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

function renderContent(content) {
    return content.map((block, i) => {
        if (block.type === 'paragraph') {
            return <p key={i} className={styles.paragraph}>{block.text}</p>;
        }
        if (block.type === 'list') {
            return (
                <ul key={i} className={styles.list}>
                    {block.items.map((item, j) => (
                        <li key={j} className={styles.listItem}>{item}</li>
                    ))}
                </ul>
            );
        }
        if (block.type === 'contact') {
            return (
                <div key={i} className={styles.contactBlock}>
                    {block.lines.map((line, j) => (
                        <p key={j} className={styles.contactLine}>{line}</p>
                    ))}
                </div>
            );
        }
        return null;
    });
}
