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
      src="https://ardrive.ar.io/#/drives/3f1b9e91-a572-416f-a08b-384e2d1f33b7?name=DrPepe.ai"
      title="DrPepe.ai Shared Drive"
      style={{ width: "100%", height: "75vh", border: "none",filter:"invert" }}

    ></iframe>
  </div>
    <FooterSimpleDark/>
    </>
  );
}

export default ArDrive;
