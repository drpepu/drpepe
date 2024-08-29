import React from 'react';
import styles from './Tokenomics.module.css';
import drpepehi4 from '../../Assets/DRPEPEHI4.svg';
import { useCountdown } from './countdown.js';


function Tokenomics() {
  // Set the target date for the countdown
  const targetDate = new Date("Sep 6, 2024 00:00:00").getTime();

  // Use the countdown hook to get the time left
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div className={styles.tokenomics_container}>
      <div className={styles.tokenomics_container_one}>
        <img src={drpepehi4} className={styles.tokenomics_container_one_a} alt="Tokenomics" />
        <div className={styles.tokenomics_container_one_b}>
          <div className={styles.tokenomics_container_one_b_title}>TOKEN GENERATION EVENT</div>
          <div className={styles.tokenomics_container_one_b_countdown}>
            <div className={styles.tokenomics_container_one_b_countdown_box}>
              <div className={styles.tokenomics_container_one_b_countdown_box_text}>Days</div>
              <div className={styles.tokenomics_container_one_b_countdown_box_number}>{days}</div>
            </div>

            <div className={styles.tokenomics_container_one_b_countdown_box}>
              <div className={styles.tokenomics_container_one_b_countdown_box_text}>Hours</div>
              <div className={styles.tokenomics_container_one_b_countdown_box_number}>{hours}</div>
            </div>

            <div className={styles.tokenomics_container_one_b_countdown_box}>
              <div className={styles.tokenomics_container_one_b_countdown_box_text}>Minutes</div>
              <div className={styles.tokenomics_container_one_b_countdown_box_number}>{minutes}</div>
            </div>

            <div className={styles.tokenomics_container_one_b_countdown_box}>
              <div className={styles.tokenomics_container_one_b_countdown_box_text}>Seconds</div>
              <div className={styles.tokenomics_container_one_b_countdown_box_number}>{seconds}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tokenomics_container_two}>
        <div className={styles.tokenomics_main_title}>TOKENOMICS</div>

        <div className={styles.tokenomics_container_two_b}>
          <div className={styles.tokenomics_container_two_box}>
            <div className={styles.tokenomics_container_two_box_top}>TOKEN NAME</div>
            <div className={styles.tokenomics_container_two_box_bottom}>$DRPEPE</div>
          </div>
          <div className={styles.tokenomics_container_two_box}>
            <div className={styles.tokenomics_container_two_box_top}>INITIAL MARKET CAP</div>
            <div className={styles.tokenomics_container_two_box_bottom}>$18.0022</div>
          </div>
          <div className={styles.tokenomics_container_two_box}>
            <div className={styles.tokenomics_container_two_box_top}>FULLY DILUTED</div>
            <div className={styles.tokenomics_container_two_box_bottom}>$18.0022</div>
          </div>
          <div className={styles.tokenomics_container_two_box}>
            <div className={styles.tokenomics_container_two_box_top}>TOKEN SUPPY</div>
            <div className={styles.tokenomics_container_two_box_bottom}>1000T</div>
          </div>
        </div>
        <div className={styles.tokenomics_container_two_a}></div>
      </div>
    </div>
  );
}

export default Tokenomics;