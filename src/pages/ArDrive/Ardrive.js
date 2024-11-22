import React from "react";
import styles from './ardrive.module.css';
import HeaderDark from '../../components/HeaderDark/HeaderDark';
import FooterSimpleDark from '../../components/FooterSimpleDark/FooterSimpleDark';


function ArDrive() {
    

  return (
    <>
    <HeaderDark />
    <div className={styles.ardrive_main_container}>
    <iframe
      id="dynamic-iframe"
      src={process.env.REACT_APP_ARDRIVE_PATH}
      title="DrPepe.ai Shared Drive"
      style={{ width: "100%", height: "75vh", border: "none",filter:"invert" }}

    ></iframe>
  </div>
    <FooterSimpleDark/>
    </>
  );
}

export default ArDrive;
