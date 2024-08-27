import React from 'react';
import styles from '../VideoComparison/VideoComparison.module.css';

function VideoComparison() {
  return (
    <>
      <div className={styles.videoComparison_container}>
        <div className={styles.videoComparison_main_text}>
          THE FIRST DECENTRALIZED SMART AGENT SPECIFICALLY DESIGNED TO HELP YOU UNDERSTAND HOW TO LIVE LONGER, LEVERAGING AN ELITE PEER-REVIEWED RESEARCH DATABASE
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
