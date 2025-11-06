"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from "next/navigation"


const Navbar = () => {

const { data: session, status } = useSession();
const [providers, setProviders] = useState(null);
const [toggler, setToggler] = useState(false);
const panelRef = useRef(null);
const buttonRef = useRef(null);
const pathname = usePathname();
const hide = pathname === "/LoginSignup"; 

const [ profileOpen, setProfileOpen ] = useState(false);
const profileButtonRef = useRef(null);
const profilePanelRef = useRef(null);


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
                <Link href="/dashboard" className="navButtons">Dashboard</Link>
                <Link href="/transactions" className="navButtons">Transactions</Link>
                <Link href="/insights" className="navButtons">Insights</Link>
            </div>

            <div className="flex-align">
                <div className="navbarContent">

                <div className="profileWrapper disNone">

                       
                        
                        <Link href="/getStarted" className="darkButton disNone">
                            Get Started
                        </Link>
                    
                        <button href="/profile" className="disNone profileIcon"
                            ref={profileButtonRef}
                            onClick={() => setProfileOpen(v => !v)}
                            aria-expanded={profileOpen}
                            aria-controls="mainMenu"
                            aria-haspopup="menu"
                            >
                            <img src="/assets/icons/profileIcon.png" 
                            alt="" 
                            width={40}
                            height={40}
                            />
                        </button>

                        <div className={`profileMenu ${profileOpen ? "open" : ""}`}
                            id="mainMenu"
                            ref={profilePanelRef}
                            role="menu"
                            >
                                
                            {session ? (
                                <>
                                <p>Welcome, {session.user.name}</p>
                                
                                <Link href="/dashboard">
                                    <div className="flex">
                                        <Image src="/assets/icons/dashboardIcon.svg"
                                        width={20}
                                        height={20}
                                        alt="Dashboard"/>
                                        <span>Dashboard</span>
                                    </div>
                                </Link>
                                <Link href="/transactions">
                                    <div className="flex">
                                        <Image src="/assets/icons/transactionsIcon.svg"
                                        width={20}
                                        height={20}
                                        alt="Transactions"/>
                                        <span>Transactions</span>
                                    </div>
                                </Link>
                                <Link href="/transactions">
                                    <div className="flex">
                                        <Image src="/assets/icons/insightsIcon.svg"
                                        width={20}
                                        height={20}
                                        alt="Insights"/>
                                        <span>Insights</span>
                                    </div>
                                </Link>
                                <Link href="/transactions">
                                    <div className="flex">
                                        <Image src="/assets/icons/settingsIcon.svg"
                                        width={20}
                                        height={20}
                                        alt="Settings"/>
                                        <span>Settings</span>
                                    </div>
                                </Link>
                                <button className="darkButton" onClick={() => signOut()}>Sign out</button>   
                                </>
                            ) : (
                                <> 
                                <Link href="/dashboard">
                                    <div className="flex">
                                        <Image src="/assets/icons/dashboardIcon.svg"
                                        width={20}
                                        height={20}
                                        alt="Dashboard"/>
                                        <span>Dashboard</span>
                                    </div>
                                </Link>
                                <Link href="/transactions">
                                    <div className="flex">
                                        <Image src="/assets/icons/transactionsIcon.svg"
                                        width={20}
                                        height={20}
                                        alt="Transactions"/>
                                        <span>Transactions</span>
                                    </div>
                                </Link>
                                <Link href="/transactions">
                                    <div className="flex">
                                        <Image src="/assets/icons/insightsIcon.svg"
                                        width={20}
                                        height={20}
                                        alt="Insights"/>
                                        <span>Insights</span>
                                    </div>
                                </Link>
                                <Link href="/transactions">
                                    <div className="flex">
                                        <Image src="/assets/icons/settingsIcon.svg"
                                        width={20}
                                        height={20}
                                        alt="Settings"/>
                                        <span>Settings</span>
                                    </div>
                                </Link>
                                
                                <Link href="/l" className="darkButton">Sign in </Link>
                                
                                </>
                            )}
                        </div>
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
                            
                            <Link href="/dashboard">
                                <div className="flex">
                                    <Image src="/assets/icons/dashboardIcon.svg"
                                    width={20}
                                    height={20}
                                    alt="Dashboard"/>
                                    <span>Dashboard</span>
                                </div>
                            </Link>
                            <Link href="/transactions">
                                <div className="flex">
                                    <Image src="/assets/icons/transactionsIcon.svg"
                                    width={20}
                                    height={20}
                                    alt="Transactions"/>
                                    <span>Transactions</span>
                                </div>
                            </Link>
                            <Link href="/transactions">
                                <div className="flex">
                                    <Image src="/assets/icons/insightsIcon.svg"
                                    width={20}
                                    height={20}
                                    alt="Insights"/>
                                    <span>Insights</span>
                                </div>
                            </Link>
                            <Link href="/transactions">
                                <div className="flex">
                                    <Image src="/assets/icons/settingsIcon.svg"
                                    width={20}
                                    height={20}
                                    alt="Settings"/>
                                    <span>Settings</span>
                                </div>
                            </Link>
                            <button className="darkButton" onClick={() => signOut()}>Sign out</button>
                            </>
                        ) : (
                            <>
                            <Link href="/dashboard">
                                <div className="flex">
                                    <Image src="/assets/icons/dashboardIcon.svg"
                                    width={20}
                                    height={20}
                                    alt="Dashboard"/>
                                    <span>Dashboard</span>
                                </div>
                            </Link>
                            <Link href="/transactions">
                                <div className="flex">
                                    <Image src="/assets/icons/transactionsIcon.svg"
                                    width={20}
                                    height={20}
                                    alt="Transactions"/>
                                    <span>Transactions</span>
                                </div>
                            </Link>
                            <Link href="/transactions">
                                <div className="flex">
                                    <Image src="/assets/icons/insightsIcon.svg"
                                    width={20}
                                    height={20}
                                    alt="Transactions"/>
                                    <span>Insights</span>
                                </div>
                            </Link>
                            <button className="darkButton">Sign in</button>
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
