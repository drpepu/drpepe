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
                          src="https://customer-jjq55o3dxtfayxo5.cloudflarestream.com/f12bbf4cb56866e2bb8fe4cb9177dfd6/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-jjq55o3dxtfayxo5.cloudflarestream.com%2Ff12bbf4cb56866e2bb8fe4cb9177dfd6%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"

                  
                          className={styles.videoComparison_video_iframe}
                        >
                      </iframe>
                </div>
            </div>
            <div  className={styles.videoComparison_videos_spacing}></div>
            <div className={styles.videoComparison_video_two_container}>
                <div className={styles.videoComparison_title_two}>DR. PEPE</div>
                    <div className={styles.videoComparison_video_two}>
                      <iframe
                        src="https://customer-jjq55o3dxtfayxo5.cloudflarestream.com/b63e08a96870860a5ddd0c953e160383/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-jjq55o3dxtfayxo5.cloudflarestream.com%2Fb63e08a96870860a5ddd0c953e160383%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"

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
