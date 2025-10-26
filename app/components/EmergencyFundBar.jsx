
 import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
 import "react-circular-progressbar/dist/styles.css";
 import styles from '../dashboard/dashboard.module.css';
 
 const EmergencyFundBar = () => {

    const percentage = 85;

   return (
    <div className={styles.goalsBarsData}>
        <div className={styles.progressBar}>
        <CircularProgressbar 
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                    textColor: "#333",
                    textSize: "16px",
                    pathColor: "#8b4fff",
                    trailColor: "#eee"
                })}
        />
        </div>
    </div>
   )
 }
 
 export default EmergencyFundBar
 