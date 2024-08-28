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
                    <video autoplay="" muted="muted" controls="controls" loop="loop"  width="100%" >
                        <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4 " type="video/mp4"  />
                    </video>
                </div>
            </div>


            <div className={styles.videoComparison_video_two_container}>
                <div className={styles.videoComparison_title_two}>DR. PEPE</div>
                    <div className={styles.videoComparison_video_two}>
                    <video autoplay="" muted="muted" controls="controls" loop="loop"  width="100%"  >
                        <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" type="video/mp4"  />
                    </video>
                </div>
            </div>

        </div>
      </div>
    </>
  );
}

export default VideoComparison;
