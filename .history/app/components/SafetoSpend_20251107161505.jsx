import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { useState } from 'react';
import styles from './dashboard/dashboard.module.css';


const SafetoSpend = () => {

    const [Amount, setAmount] = useState(1350);
    const percentage = 72;
  return (
    <div className={styles.safeToSpendProgressBar}>
        <div className='fullWidth'>
            <h3 className={styles.safetoSpendTitle}>Safe to Spend</h3>
        </div>
        <div className={styles.progressBar}>
            <CircularProgressbar
                
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                    textColor: "#333",
                    textSize: "16px",
                    pathColor: "#00D4FF",
                    trailColor: "#eee",
                })} 
            />
        </div>
        <div className={styles.safeToSpendData}>
            <h2 className={styles.amountTitle}>${Amount}</h2>
            <p className='smallText'>Remaining Budget This Month</p>
            <p style={{color: "#00D4FF", textAlign: "center"}}>You're tracking well +18% under your average</p>
        </div>    
    </div>
  );
}

export default SafetoSpend
