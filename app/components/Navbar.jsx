"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation";


const Navbar = () => {

const { data: session, status } = useSession();
const [providers, setProviders] = useState(null);
const [toggler, setToggler] = useState(false);
const panelRef = useRef(null);
const buttonRef = useRef(null);
const pathname = usePathname();
const hide = pathname === "/LoginSignup" || pathname === "/profile";

const [ profileOpen, setProfileOpen ] = useState(false);
const profileButtonRef = useRef(null);
const profilePanelRef = useRef(null);
const router = useRouter();



useEffect(() => {

    const onPointerDown = (e) => {
    const t = e.target;

    
    if (toggler) {
      const clickedOutsideMobile =
        !panelRef.current?.contains(t) && !buttonRef.current?.contains(t);
      if (clickedOutsideMobile) setToggler(false);
    }

    
    if (profileOpen) {
      const clickedOutsideProfile =
        !profilePanelRef.current?.contains(t) && !profileButtonRef.current?.contains(t);
      if (clickedOutsideProfile) setProfileOpen(false);
    }

    };

    const onKeyDown = (e) => {
        if (e.key === "Escape") {
            if (toggler) setToggler(false);
            if (profileOpen) setProfileOpen(false);
        }

    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
}, [toggler, profileOpen]);

  useEffect(() => {
    setToggler(false);
    setProfileOpen(false);
  }, [pathname]);

  if (hide) return null;

  return (
    <>
        <nav className="navbar">
            <Link href="/" className="navLink">
                <Image 
                src="/assets/icons/tallyappIcon.svg" 
                alt="Logo" 
                width={46} 
                height={46} 
                />
                <p className="tallyMainTitle">Tally</p>
            </Link>

            {/* desktop Navigation */}
            <div className="navPages">
                <Link href="/" className="navButtons">Home</Link>
                <Link href="/dashboard" className="navButtons">Dashboard</Link>
                <Link href="/transactions" className="navButtons">Transactions</Link>
                <Link href="/budgets" className="navButtons">Budgets</Link>
                <Link href="/insights" className="navButtons">Insights</Link>
            </div>

            <div className="flex-align">
                <div className="navbarContent">

                <div className="profileWrapper disNone">
                    {session ? (
                        <>
                            <button href="/profile" className="disNone profileIcon"
                                ref={profileButtonRef}
                                onClick={() => setProfileOpen(v => !v)}
                                aria-expanded={profileOpen}
                                aria-controls="mainMenu"
                                aria-haspopup="menu"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                            </button>

                            <div className={`profileMenu ${profileOpen ? "open" : ""}`}
                                id="mainMenu"
                                ref={profilePanelRef}
                                role="menu"
                            >
                                <p>Welcome, {session.user.name}</p>
                                <Link href="/profile">
                                    <div className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>
                                        </svg>
                                        <span>Profile</span>
                                    </div>
                                </Link>
                                <button className="menuLink flex" onClick={() => signOut()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                    </svg>
                                    Sign out
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <button className="darkButton disNone"
                                onClick={() => router.push(`/LoginSignup?callbackUrl=${pathname}`)}
                            >
                                Login
                            </button>
                            <button className="whiteButton disNone"
                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={() => router.push(`/LoginSignup?callbackUrl=${pathname}`)}
                            >
                                Sign up
                            </button>
                        </>
                    )}
                    </div>
                </div>
                
        

                {/*smaller devices Navigation*/}
                <div className="menuWidth">
                    <button className="menuButton"
                        ref={buttonRef}
                        onClick={() => setToggler(v => !v)}
                        aria-expanded={toggler}
                        aria-controls="mainMenu"
                        aria-haspopup="menu"
                        >
                        <svg src="/assets/icons/menuIcon.svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24" fill="none">
                            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                    
                    <div className={`menuPanel ${toggler ? "open" : ""}`}
                        id="mainMenu"
                        ref={panelRef}
                        role="menu"
                        >
                        {session ? (
                            <>
                            <p>Welcome, {session.user.name}</p>

                            <Link href="/">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    </svg>
                                    <span>Home</span>
                                </div>
                            </Link>
                            <Link href="/dashboard">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
                                    </svg>
                                    <span>Dashboard</span>
                                </div>
                            </Link>
                            <Link href="/transactions">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>
                                    </svg>
                                    <span>Transactions</span>
                                </div>
                            </Link>
                            <Link href="/insights">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16h8"/><path d="M7 11h12"/><path d="M7 6h3"/>
                                    </svg>
                                    <span>Insights</span>
                                </div>
                            </Link>
                            <Link href="/profile">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>
                                    </svg>
                                    <span>Profile</span>
                                </div>
                            </Link>
                            <button className="menuLink flex" onClick={() => signOut()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                </svg>
                                Sign out
                            </button>
                            </>
                        ) : (
                            <>
                            <Link href="/">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    </svg>
                                    <span>Home</span>
                                </div>
                            </Link>
                            <Link href="/dashboard">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
                                    </svg>
                                    <span>Dashboard</span>
                                </div>
                            </Link>
                            <Link href="/transactions">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>
                                    </svg>
                                    <span>Transactions</span>
                                </div>
                            </Link>
                            <Link href="/insights">
                                <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16h8"/><path d="M7 11h12"/><path d="M7 6h3"/>
                                    </svg>
                                    <span>Insights</span>
                                </div>
                            </Link>
                            <button className="menuLink flex"
                                onClick={() => router.push(`/LoginSignup?callbackUrl=${pathname}`)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m10 17 5-5-5-5"/><path d="M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                                </svg>
                                Login
                            </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </nav>
    </>
  )
}

export default Navbar
