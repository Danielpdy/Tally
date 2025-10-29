""

import React from 'react'
import { usePathname } from "next/navigation";

const Footer = () => {

  const pathname = usePathname();
  const hide = pathname === "/LoginSignup";
  if (hide) return null;

  return (
    <footer className='footerBox'>
        <div className='footerLabels'>
            <p className='footerText'>Privacy</p>
            <p className='footerText'>Terms</p>
            <p className='footerText'>Contact</p>
            <p className='footerText'>v1.0.0</p>
        </div>
        <p className='footerText flex'>© Tally by <p className='gradientText-blue'>Daniel Pinzon</p> </p>
    </footer>
  )
}

export default Footer
