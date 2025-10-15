"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useSession, signIn, signOut } from 'next-auth/react'



const Navbar = () => {

const { data: session, status } = useSession();
const [providers, setProviders] = useState(null);


  return (
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
        <div className="navPages">
            <Link href="/dashboard" className="navButtons">Dashboard</Link>
            <Link href="/transactions" className="navButtons">Transactions</Link>
            <Link href="/insights" className="navButtons">Insights</Link>
        </div>

        {/* desktop Navigation */}
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
                    className="darkButton">
                        Sign in
                    </button>
                </>
            )}
        </div>


    </nav>
  )
}

export default Navbar
