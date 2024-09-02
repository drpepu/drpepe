import React from 'react';
import styles from './Reasons.module.css';
import drpepeheadshot from '../../Assets/DRPEPEVACCINEHEADSHOT.svg'

function Reasons() {
  return (
    <div className={styles.reasons_container}>

      <div className={styles.reason_image_title_container}>

        <img src={drpepeheadshot} className={styles.reason_image} alt="drpepe" />

        <div className={styles.reason_title_container}>
          <div  className={styles.reason_subtitle}>THE REASONS</div>
          <div  className={styles.reason_title}>WHY IS DR. PEPE BETTER?</div>
          <div  className={styles.reason_title_description}>Other bots spit facts; I drop alpha. Want the secret to living long enough to see your bags moon? Stick with Dr. Pepe.</div>
        </div>
      </div>








        <div className={styles.reason_box_container}>


          <div className={styles.reason_one_container}>
            <div  className={styles.reason_one_title}>researched in an open source DB on Arweave</div>
            <div  className={styles.reason_one_description}>Vast peer-reviewed research database stored on Arweave, ensuring transparency and accessibility. Get health advice backed by the latest science, all stored securely on the blockchain.</div>
          </div>

          <div className={styles.reason_two_container}>
            <div  className={styles.reason_two_title}>Upload your blood analysis</div>
            <div  className={styles.reason_two_description}> Upload your blood analysis, and Dr. Pepe’s AI will dive into the data, providing tailored longevity tips based on your unique biomarkers. </div>
          </div>

          <div className={styles.reason_three_container}>
            <div  className={styles.reason_three_title}>Decentralized Environment</div>
            <div  className={styles.reason_three_description}>Have direct access to cutting-edge health insights without the interference of centralized entities. Your data, your control—empowered by the blockchain for ultimate freedom and security.
            </div>
          </div>


        </div>

    </div>
  )
}

export default Reasons