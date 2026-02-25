"use client"

import React from 'react'
import Link from 'next/link';
import { usePathname } from "next/navigation";

const Footer = () => {

  const pathname = usePathname();
  const hide = pathname === "/LoginSignup" || pathname === "/profile";
  if (hide) return null;

  return (
    <footer className='footerBox'>
        <div className='footerLabels'>
            <Link href="/privacy" className='footerText' style={{ textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" className='footerText' style={{ textDecoration: 'none' }}>Terms</Link>
            <p className='footerText'>Contact</p>
            <p className='footerText'>v1.0.0</p>
        </div>
        <p className='footerText flex'>© Tally by <span className='gradientText-blue'>Daniel Pinzon</span> </p>
    </footer>
  )
}

export default Footer
