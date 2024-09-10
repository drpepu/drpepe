import React, { useEffect } from 'react';
import styles from '../VideoComparison/VideoComparison.module.css';
import { useTranslation } from 'react-i18next';

function VideoComparison() {
  const { t } = useTranslation();

  useEffect(() => {
    const initializeVideos = () => {
      // Wait for the Stream function to be available
      if (window.Stream) {
        const videoOne = document.getElementById('video-one');
        const videoTwo = document.getElementById('video-two');

        if (videoOne && videoTwo) {
          // Initialize players using the global Stream function
          const playerOne = window.Stream(videoOne);
          const playerTwo = window.Stream(videoTwo);

          // Attempt to autoplay videos
          playerOne.play().catch(() => {
            playerOne.muted = true;
            playerOne.play();
          });

          playerTwo.play().catch(() => {
            playerTwo.muted = true;
            playerTwo.play();
          });
        }
      }
    };

    // Load the Cloudflare Stream SDK script dynamically
    const script = document.createElement('script');
    script.src = 'https://embed.cloudflarestream.com/embed/sdk.latest.js';
    script.onload = initializeVideos; // Initialize videos after the script loads
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className={styles.videoComparison_container}>
        <div className={styles.videoComparison_main_text_container}>
          <div className={styles.videoComparison_main_text_one}>{t('video_comparison_title')}</div>
          <div className={styles.videoComparison_main_text_two}>{t('video_comparison_subtitle')}</div>
        </div>

        <div className={styles.videoComparison_videos_container}>
          <div className={styles.videoComparison_video_one_container}>
            <div className={styles.videoComparison_title_one}>Woke GPT</div>
            <div className={styles.videoComparison_video_one}>
              <iframe
                src="https://customer-jjq55o3dxtfayxo5.cloudflarestream.com/e991f0106544d8051a5888c8e52e8777/iframe?muted=true&preload=true&loop=true&autoplay=true&controls=false"
                loading="lazy"
                className={styles.videoComparison_video_iframe}
                playsInline
                title='wokegpt'
                id='video-one'
              ></iframe>
            </div>
          </div>

          <div className={styles.videoComparison_vs}>vs.</div>
          <div className={styles.videoComparison_videos_spacing}></div>

          <div className={styles.videoComparison_video_two_container}>
            <div className={styles.videoComparison_title_two}>DR. PEPE</div>
            <div className={styles.videoComparison_video_two}>
              <iframe
                src="https://customer-jjq55o3dxtfayxo5.cloudflarestream.com/64c32ee0571ff0d50fe145b222f57b04/iframe?muted=true&preload=true&loop=true&autoplay=true&controls=false"
                loading="lazy"
                className={styles.videoComparison_video_iframe}
                playsInline
                title='pepegpt'
                id='video-two'
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoComparison;
