import React from 'react'
import styles from './Hero.module.css';
import Header from '../Header/Header';
import DrPepeOne from '../../Assets/DrPepeImageOne.png'
import DrPepeTwo from '../../Assets/DrPepeImageTwo.png'



function Hero() {
  return (
    <>

    <Header />

    <div className={styles.hero_main_text_container}>

    <img src={DrPepeOne}alt='Dr Pepe' className={styles.hero_drpepe_image_one}></img>
        <div className={styles.hero_main_text_one_container}>
            <div className={styles.hero_main_text_one} >DR. PEPE’S</div>
        </div>
        <div className={styles.hero_main_text_two}>LONGETIVITY</div>
        <div className={styles.hero_main_text_three}>LAB. </div>

    </div>


    <div className={styles.hero_secondary_text_container}>
        <div className={styles.hero_secondary_text_one}>AI POWERED AGENT DESIGNED </div>
        <div className={styles.hero_secondary_text_two}>TO HELP YOU LIVE FOREVER</div>
        <div className={styles.hero_doitnow_button}>DO IT NOW</div>

        <img src={DrPepeTwo}alt='Dr Pepe' className={styles.hero_drpepe_image_two}></img>
    </div>



    </>
  )
}

export default Hero