import React from 'react';
import styles from '../VideoComparison/VideoComparison.module.css';

function VideoComparison() {
  return (
    <>
      <div className={styles.videoComparison_container}>
      
        <div className={styles.videoComparison_main_text_one}>
          The first decentralized smarth agent
        </div>
        <div className={styles.videoComparison_main_text_one}>
          specifically designed to help you 
        </div>
        <div className={styles.videoComparison_main_text_one}>
         understand how to live longer.
        </div>



        <div className={styles.videoComparison_main_text_two}>
          Laveraging an elite peer-reviewed research database
        </div>

        <div className={styles.videoComparison_videos_container}>

            <div className={styles.videoComparison_video_one_container}>
                <div className={styles.videoComparison_title_one}>Woke GPT</div>
                <div className={styles.videoComparison_video_one}>
                  <iframe
                      src="https://customer-jjq55o3dxtfayxo5.cloudflarestream.com/c722c8843596b3b4e04554289d2651c0/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-jjq55o3dxtfayxo5.cloudflarestream.com%2Fc722c8843596b3b4e04554289d2651c0%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
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
                            src="https://customer-jjq55o3dxtfayxo5.cloudflarestream.com/7cd0b28d1a0557c216e61c38ccda79c8/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-jjq55o3dxtfayxo5.cloudflarestream.com%2F7cd0b28d1a0557c216e61c38ccda79c8%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"

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
