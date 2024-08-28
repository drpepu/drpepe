import React from 'react';
import styles from './Reasons.module.css'

function Reasons() {
  return (
    <div className={styles.reasons_container}>

        <div  className={styles.reason_title}>WHY IS DR. PEPE BETTER?</div>


        <div className={styles.reason_box_container}>


          <div className={styles.reason_one_container}>
            <div  className={styles.reason_one_title}>Peer reviewed research in an open source DB on Arweave</div>
            <div  className={styles.reason_one_description}>Dr. Pepe taps into a vast, peer-reviewed research database stored on Arweave, ensuring transparency and accessibility. Get health advice backed by the latest science, all stored securely on the blockchain, where it’s immutable and open to all.</div>
          </div>

          <div className={styles.reason_two_container}>
            <div  className={styles.reason_two_title}>Upload your blood analysis</div>
            <div  className={styles.reason_two_description}> Upload your blood analysis, and Dr. Pepe’s AI will dive into the data, providing tailored longevity tips based on your unique biomarkers. It’s like having a personal health guru, powered by science.</div>
          </div>

          <div className={styles.reason_three_container}>
            <div  className={styles.reason_three_title}>Decentralized</div>
            <div  className={styles.reason_three_description}>Dr. Pepe operates in a fully decentralized environment, giving you direct access to cutting-edge health insights without the interference of centralized entities. Your data, your control—empowered by the blockchain for ultimate freedom and security.</div>
          </div>


        </div>

    </div>
  )
}

export default Reasons