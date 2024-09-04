import React from 'react';
import styles from './Tokenomics.module.css';
import drpepehi4 from '../../Assets/DRPEPEHI4.svg';
import drpepehi4left from '../../Assets/DRPEPEHI4LEFT.svg';

import { useCountdown } from './countdown.js';


function Tokenomics() {
  // Set the target date for the countdown
  const targetDate = new Date("Sep 6, 2024 00:00:00").getTime();

  // Use the countdown hook to get the time left
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div className={styles.tokenomics_main_container}>



            <div className={styles.tokenomics_title}>TOKENOMICS</div>
        <div className={styles.tokenomics_main_info_box}>


            <div className={styles.tokenomics_info_box_main_container}>

              <div className={styles.tokenomics_info_box_container}>
                  <div className={styles.tokenomics_info_box}>
                    <div className={styles.tokenomics_info_title}>TOKEN TICKER</div>
                    <div className={styles.tokenomics_info_description}>DRPEPEAI</div>
                  </div>
                  <div className={styles.tokenomics_info_box}>
                    <div className={styles.tokenomics_info_title}>CHAIN</div>
                    <div className={styles.tokenomics_info_description}>SOLANA</div>


                  </div>
              </div>

              <div className={styles.tokenomics_info_box_container}>
                  <div className={styles.tokenomics_info_box}>
                    <div className={styles.tokenomics_info_title}>CONTACT ADDRESS</div>
                    <div className={styles.tokenomics_info_description}>COMING SOON</div>
                  </div>
                  <div className={styles.tokenomics_info_box}>
                    <div className={styles.tokenomics_info_title}>TOKEN SUPPLY</div>
                    <div className={styles.tokenomics_info_description}>1.000.000.000.000.00</div>
                  </div>
              </div>

            </div>
        </div>





      <div className={styles.tokenomics_countdown_main_container}>
      <img src={drpepehi4} className={styles.tokenomics_pepe_image} alt="Tokenomics" />
      <img src={drpepehi4left} className={styles.tokenomics_pepe_image_mobile} alt="Tokenomics" />




        <div className={styles.tokenomics_main_countdown_container}>
          <div className={styles.tokenomics_tge_title}>TOKEN GENERATION EVENT</div>



          <div className={styles.tokenomics_container_countdown}>
            <div className={styles.tokenomics_date_box}>
              <div className={styles.tokenomics_date_box_text}>Days</div>
              <div className={styles.tokenomics_date_box_number}>{days}</div>
            </div>

            <div className={styles.tokenomics_date_box}>
              <div className={styles.tokenomics_date_box_text}>Hours</div>
              <div className={styles.tokenomics_date_box_number}>{hours}</div>
            </div>

            <div className={styles.tokenomics_date_box}>
              <div className={styles.tokenomics_date_box_text}>Minutes</div>
              <div className={styles.tokenomics_date_box_number}>{minutes}</div>
            </div>

            <div className={styles.tokenomics_date_box}>
              <div className={styles.tokenomics_date_box_text}>Seconds</div>
              <div className={styles.tokenomics_date_box_number}>{seconds}</div>
            </div>
          </div>



        </div>


      </div>



    </div>
  );
}

export default Tokenomics;