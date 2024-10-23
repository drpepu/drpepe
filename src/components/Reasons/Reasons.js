import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './Reasons.module.css';
import drpepeheadshot from '../../Assets/DRPEPEVACCINEHEADSHOT.svg'

import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);


function Reasons() {

  const { t } = useTranslation();






 
  return (
    <>

    <div className={styles.reasons_container}>

        <div className={styles.reason_image_title_container}>

          <img src={drpepeheadshot} className={styles.reason_image} alt="drpepe" />

          <div className={styles.reason_title_container}>
            <div  className={styles.reason_title}>{t('reason_title')}</div>
            <div  className={styles.reason_title_description}>{t('reason_subtitle')}</div>
          </div>
        </div>

        <div className={styles.reason_box_container}>


          <div className={styles.reason_one_container}>
            <div  className={styles.reason_one_title}>{t('reason_one_title')}</div>
            <div  className={styles.reason_one_description}>{t('reason_one_subtitle')}
            </div>
          </div>

          <div className={styles.reason_two_container}>
            <div  className={styles.reason_two_title}>{t('reason_two_title')}</div>
            <div  className={styles.reason_two_description}>{t('reason_two_subtitle')} </div>
          </div>

          <div className={styles.reason_three_container}>
            <div  className={styles.reason_three_title}>{t('reason_three_title')}</div>
            <div  className={styles.reason_three_description}>{t('reason_three_subtitle')}

            </div>
          </div>


        </div>

        <div className={styles.reason_top_label}>
          
          <div className={styles.reason_top_label_title}>{t('reason_label_title')}</div>
          <div className={styles.reason_top_label_description}>{t('reason_label_subtitle')}..</div>
          
        </div>
    </div>
   
    </>
  )
}

export default Reasons