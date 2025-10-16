"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useSession, signIn, signOut } from 'next-auth/react'
import { usePathname } from "next/navigation"




const Navbar = () => {

const { data: session, status } = useSession();
const [providers, setProviders] = useState(null);
const [toggler, setToggler] = useState(false);
const panelRef = useRef(null);
const buttonRef = useRef(null);
const pathname = usePathname();

useEffect(() => {
    const onPointerDown = (e) => {
        if (!toggler) return;
        const t = e.target;
        if (panelRef.current?.contains(t)) return;
        if (buttonRef.current?.contains(t)) return;
        setToggler(false);
    };
    const onKeyDown = (e) => {
        if (e.key === "Escape") setToggler(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
}, [toggler]);

  useEffect(() => {
    setToggler(false);
  }, [pathname]);



  return (
    <>
        <nav className="navbar">
            <Link href="/" className="navLink">
                <Image 
                src="/assets/icons/mainIcon.png" 
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
                    {session ? (
                    <>
                        <Link className="darkBlackButton disNone" href="/create-prompt">Get Started</Link>
                            <button type="button" onClick={() => signOut()}
                                className="darkButton disNone">
                                Sign Out
                            </button>
                        

                        <Link href="/profile" className="disNone">
                            <img src="/assets/icons/profileIcon.png" 
                            alt="" 
                            width={40}
                            height={40}
                            />
                        </Link>
                        
                    </>
                    ) : (
                    <> 
                        <button type="button"
                        className="darkButton signInbutton">
                            Sign in
                        </button>
                    </>
                    )}
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
                        <img src="/assets/icons/menuIcon.png"
                            width={24}
                            height={24}/>
                    </button>
                    
                    <div className={`menuPanel ${toggler ? "open" : ""}`}
                        id="mainMenu"
                        ref={panelRef}
                        role="menu"
                    >
                        {session ? (
                            <>
                            <p>Welcome back {session.user.name}</p>
                            <Link href="/dashboard">Dashboard</Link>
                            <Link href="/transactions">Transactions</Link>
                            <Link href="/transactions">Insights</Link>
                            <button>Sign out</button>
                            </>
                        ) : (
                            <>
                            <Link href="/transactions">Dashboard</Link>
                            <Link href="/transactions">Transactions</Link>
                            <Link href="/transactions">Insights</Link>
                            <button>Sign in</button>
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
