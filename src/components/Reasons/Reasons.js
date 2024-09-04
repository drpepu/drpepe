import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import horizontalLoop from './seamless-scroll';

import styles from './Reasons.module.css';
import drpepeheadshot from '../../Assets/DRPEPEVACCINEHEADSHOT.svg'

gsap.registerPlugin(ScrollTrigger);


function Reasons() {

  const landingRef = useRef(null);
  const wrapperRef = useRef(null);
  const boxesRef = useRef([]);


  useEffect(() => {
    const boxes = boxesRef.current;
    const colors = ['transparent'];

    // Horizontal loop animation initialization
    if (boxes.length > 0) {
      gsap.set(boxes, {
        backgroundColor: gsap.utils.wrap(colors),
      });

      horizontalLoop(boxes, { paused: false, repeat: -1, speed: 0.8 });
    }


    // Ensure cleanup of animations when component unmounts
    return () => {
      gsap.killTweensOf(boxes);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Immediately set opacity to 1 once component mounts
  useEffect(() => {
    gsap.set(landingRef.current, { opacity: 1 });
  }, []);
  return (
    <>

    <div className={styles.reasons_container}>

        <div className={styles.reason_image_title_container}>

          <img src={drpepeheadshot} className={styles.reason_image} alt="drpepe" />

          <div className={styles.reason_title_container}>
            <div  className={styles.reason_title}>WHY IS DR. PEPE BETTER?</div>
            <div  className={styles.reason_title_description}>Other agents spit facts; Dr. Pepe drop alpha. Want the secret to living long enough to see your bags moon? stick with Dr. Pepe’s Longevity Lab.</div>
          </div>
        </div>

        <div className={styles.reason_box_container}>


          <div className={styles.reason_one_container}>
            <div  className={styles.reason_one_title}>Elite, peer-reviewed research on Arweave</div>
            <div  className={styles.reason_one_description}>Vast peer-reviewed research database stored on Arweave, ensuring transparency and accessibility. Get health advice backed by the latest science, all stored securely on the Solana Blockchain.
            </div>
          </div>

          <div className={styles.reason_two_container}>
            <div  className={styles.reason_two_title}>Blood analysis</div>
            <div  className={styles.reason_two_description}> Upload your blood analysis, and Dr. Pepe’s AI will dive into the data, providing tailored longevity tips based on your unique biomarkers. </div>
          </div>

          <div className={styles.reason_three_container}>
            <div  className={styles.reason_three_title}>Decentralized, computational bio</div>
            <div  className={styles.reason_three_description}>Have direct access to cutting-edge health insights without the interference of centralized entities. Your data, your control—empowered by the blockchain for ultimate freedom and security.

            </div>
          </div>


        </div>

        <div className={styles.reason_top_label}>
          
          <div className={styles.reason_top_label_title}>LIVE LONGER</div>
          <div className={styles.reason_top_label_description}>Because outlasting the next bull run isn’t enough—let’s make sure you’re around to spend those gains too.</div>
          
        </div>
    </div>
        <div className={`${styles.reason_text_stripe } ${styles.wrapper}`} ref={wrapperRef}>

        <div ref={(el) => (boxesRef.current[0] = el)} className={`${styles.reason_text_stripe_text } ${styles.boxtest}`} ><span className={styles.reason_pill}>💊</span> Backed by real experts, not just meme magic</div>
        <div ref={(el) => (boxesRef.current[1] = el)} className={`${styles.reason_text_stripe_text } ${styles.boxtest}`} ><span className={styles.reason_pill}>💊</span>No Bro Science: Verified by nerds, not your gym buddy</div>
        <div ref={(el) => (boxesRef.current[2] = el)} className={`${styles.reason_text_stripe_text } ${styles.boxtest}`}><span className={styles.reason_pill}>💊</span>Real Gains, No Cap: Proven tips, minus the wild claims</div>
        <div ref={(el) => (boxesRef.current[3] = el)} className={`${styles.reason_text_stripe_text } ${styles.boxtest}`}><span className={styles.reason_pill}>💊</span>Scrutinized by smart folks so you don’t have to</div>


      

        </div>
    </>
  )
}

export default Reasons