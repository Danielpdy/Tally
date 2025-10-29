import React from 'react';
import Image from 'next/image';
import styles from './LoginSignup.module.css';

const page = () => {
  return (
    <div className={styles.mainContainer}>
        <section className={styles.formBox}>
            <div className={styles.flexAal}>
                <Image 
                    src="/assets/icons/tallyappIcon.svg" 
                    alt="Logo" 
                    width={46} 
                    height={46}
                />
                <div>
                    <h1 className='tallyMainTitle'>Tally</h1>
                    <p className='smallText'>Cash Flow Timeline</p>
                </div>
            </div>
        </section>
    </div>
  )
}

export default page
