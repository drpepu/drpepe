import React, { useEffect, useRef } from 'react';
import styles from '../VideoComparison/VideoComparison.module.css';
import { useTranslation } from 'react-i18next';

function VideoComparison() {
  const { t } = useTranslation();

  // Refs to access the iframe elements
  const videoOneRef = useRef(null);
  const videoTwoRef = useRef(null);

  useEffect(() => {
    // Load the Cloudflare Stream SDK script dynamically
    const script = document.createElement('script');
    script.src = 'https://embed.cloudflarestream.com/embed/sdk.latest.js';
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Function to play both videos simultaneously
  const playBothVideos = () => {
    if (window.Stream && videoOneRef.current && videoTwoRef.current) {
      const playerOne = window.Stream(videoOneRef.current);
      const playerTwo = window.Stream(videoTwoRef.current);

      playerOne.play().catch(() => {
        playerOne.muted = true;
        playerOne.play();
      });

      playerTwo.play().catch(() => {
        playerTwo.muted = true;
        playerTwo.play();
      });
    }
  };

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
                ref={videoOneRef} // Reference to access this iframe
                src="https://customer-jjq55o3dxtfayxo5.cloudflarestream.com/e991f0106544d8051a5888c8e52e8777/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-jjq55o3dxtfayxo5.cloudflarestream.com%2Fe991f0106544d8051a5888c8e52e8777%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                loading="lazy"
                className={styles.videoComparison_video_iframe}
                playsInline
                title='wokegpt'
              ></iframe>
            </div>
          </div>
          <div className={styles.videoComparison_vs}>vs.</div>
          <div className={styles.videoComparison_videos_spacing}></div>
          <div className={styles.videoComparison_video_two_container}>
            <div className={styles.videoComparison_title_two}>DR. PEPE</div>
            <div className={styles.videoComparison_video_two}>
              <iframe
                ref={videoTwoRef} // Reference to access this iframe
                src="https://customer-jjq55o3dxtfayxo5.cloudflarestream.com/64c32ee0571ff0d50fe145b222f57b04/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-jjq55o3dxtfayxo5.cloudflarestream.com%2F64c32ee0571ff0d50fe145b222f57b04%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=true"
                loading="lazy"
                className={styles.videoComparison_video_iframe}
                playsInline
                title='pepegpt'
              ></iframe>
            </div>
          </div>
        </div>

        {/* Play Both Videos Button */}
        <button onClick={playBothVideos} className={styles.playButton}>
          Play Both Videos
        </button>
      </div>
    </>
  );
}

export default VideoComparison;
