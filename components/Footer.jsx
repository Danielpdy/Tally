import React from 'react'

const Footer = () => {
  return (
    <footer className='footerBox'>
        <div className='footerLabels'>
            <p className='footerText'>Privacy</p>
            <p className='footerText'>Terms</p>
            <p className='footerText'>Contact</p>
        </div>
        <p className='footerText flex'>© Tally by <p className='gradientText-blue'>Daniel Pinzon</p> </p>
    </footer>
  )
}

export default Footer
