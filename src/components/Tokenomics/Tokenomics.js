import React from 'react';
import styles from './Tokenomics.module.css';
import drpepehi4 from '../../Assets/DRPEPEHI4.svg'

function Tokenomics() {
  return (
    <div className={styles.tokenomics_container}>


        <div className={styles.tokenomics_container_one}>
          <img src={drpepehi4} className={styles.tokenomics_container_one_a}></img>
          <div className={styles.tokenomics_container_one_b}></div>
        </div>

        <div className={styles.tokenomics_container_two}>
          <div className={styles.tokenomics_container_two_b}>


            <div className={styles.tokenomics_container_two_box }>
              <div className={styles.tokenomics_container_two_box_top}>TOKEN NAME</div>
              <div className={styles.tokenomics_container_two_box_bottom}>$DRPEPE</div>
            </div>
            <div className={styles.tokenomics_container_two_box }>
              <div className={styles.tokenomics_container_two_box_top}>INITIAL MARKET CAP</div>
              <div className={styles.tokenomics_container_two_box_bottom}>$18.0022</div>
            </div>
            <div className={styles.tokenomics_container_two_box }>
              <div className={styles.tokenomics_container_two_box_top}>FULLY DILUTED</div>
              <div className={styles.tokenomics_container_two_box_bottom}>$18.0022</div>
            </div>
            <div className={styles.tokenomics_container_two_box }>
              <div className={styles.tokenomics_container_two_box_top}>TOKEN SUPPY</div>
              <div className={styles.tokenomics_container_two_box_bottom}>1000T</div>
            </div>


          </div>
          <div className={styles.tokenomics_container_two_a}></div>
        </div>



    </div>
  )
}

export default Tokenomics