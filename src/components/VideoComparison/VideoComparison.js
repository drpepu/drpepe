import React from 'react';
import styles from '../VideoComparison/VideoComparison.module.css';

function VideoComparison() {
  return (
    <>
      <div className={styles.videoComparison_container}>
      
        <div className={styles.videoComparison_main_text_one}>Dr. Pepe's longevity lab is Solana’s first AI-driven DeSci protocol, 
        </div>
        <div className={styles.videoComparison_main_text_one}>accessible via the DRPEPEAI token, designed to help you achieve a  longer, healthier life.
        </div>

        <div className={styles.videoComparison_main_text_two}>
          Laveraging an elite peer-reviewed research database
        </div>

        <div className={styles.videoComparison_videos_container}>

            <div className={styles.videoComparison_video_one_container}>
                <div className={styles.videoComparison_title_one}>Woke GPT</div>
                <div className={styles.videoComparison_video_one}>
                  <iframe
                      //src="https://customer-jjq55o3dxtfayxo5.cloudflarestream.com/54eb830541faef22b9e634d922e4dfc7/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-jjq55o3dxtfayxo5.cloudflarestream.com%2F54eb830541faef22b9e634d922e4dfc7%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
                      loading="lazy"
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                      allowfullscreen="true"
                      className={styles.videoComparison_video_iframe}

                  ></iframe>
                </div>
            </div>
            <div  className={styles.videoComparison_videos_spacing}></div>
              <div className={styles.videoComparison_video_two_container}>
                  <div className={styles.videoComparison_title_two}>DR. PEPE</div>
                      <div className={styles.videoComparison_video_two}>
                      <iframe
                          //src="https://customer-jjq55o3dxtfayxo5.cloudflarestream.com/db41485d5ebe7d08a3fad670230250a6/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-jjq55o3dxtfayxo5.cloudflarestream.com%2Fdb41485d5ebe7d08a3fad670230250a6%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"

                        loading="lazy"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowfullscreen="true"
                        className={styles.videoComparison_video_iframe}

                    ></iframe>
                  </div>
            </div>

        </div>
      </div>
    </>
  );
}

export default VideoComparison;
