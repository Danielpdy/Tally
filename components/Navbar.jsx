"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useSession, signIn, signOut } from 'next-auth/react'



const Navbar = () => {

const { data: session, status } = useSession();
const [providers, setProviders] = useState(null);
const [toggler, setToggler] = useState(false);


  return (

    
    <nav className="navbar">
        {/* desktop Navigation */}
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

        <div>
            {session ? (
                <div className="navbarContent">
                    <Link className="darkBlackButton" href="/create-prompt">Get Started</Link>
                        <button type="button" onClick={() => signOut()}
                        className="darkButton">
                            Sign Out
                        </button>
                    

                    <Link href="/profile">
                        <img src="/assets/icons/profileIcon.png" 
                        alt="" 
                        width={40}
                        height={40}
                        />
                    </Link>
                </div>
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
                onClick={() => setToggler(v => !v)}>
                <img src="/assets/icons/menuIcon.png"
                    width={24}
                    height={24}/>
            </button>
            
            <div className={`menuPanel ${open ? "open" : ""}`}>
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
        


    </nav>
  )
}

export default Navbar
