import React from 'react';
import styles from '../VideoComparison/VideoComparison.module.css';

import { useTranslation } from 'react-i18next';

function VideoComparison() {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.videoComparison_container}>
      
      <div className={styles.videoComparison_main_text_container}>
        <div className={styles.videoComparison_main_text_one}>{t('video_comparison_title')}
        </div>
    
        <div className={styles.videoComparison_main_text_two}>
        {t('video_comparison_subtitle')}
        </div>

      </div>

        <div className={styles.videoComparison_videos_container}>

            <div className={styles.videoComparison_video_one_container}>
                <div className={styles.videoComparison_title_one}>Woke GPT</div>
                <div className={styles.videoComparison_video_one}>
                  {/*desktop*/}
                  <iframe
                      src={t('video_comparison_video_woke')}
                      loading="lazy"
                      className={`${styles.videoComparison_video_iframe} ${styles.video_desktop}`}
                      playsInline
                      title='wokegpt'
                  ></iframe>
               
                </div>
            </div>
            <div className={styles.videoComparison_vs}>vs.</div>
            <div  className={styles.videoComparison_videos_spacing}></div>
              <div className={styles.videoComparison_video_two_container}>
                  <div className={styles.videoComparison_title_two}>DR. PEPE</div>
                      <div className={styles.videoComparison_video_two}>
                      {/*desktop*/}
                      <iframe
                      src={t('video_comparison_video_drpepe')}


                        loading="lazy"
                        className= {`${styles.videoComparison_video_iframe} ${styles.video_desktop}`}
                        playsInline
                        title='pepegpt'
                      ></iframe>
           
                
                  </div>
              </div>

        </div>
      </div>
    </>
  );
}

export default VideoComparison;
