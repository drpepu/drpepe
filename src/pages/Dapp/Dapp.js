
import React from 'react';
import styles from './Dapp.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'


function Dapp() {


  return (
    <>
    <Header />
    <div className={styles.dapp_container}>

      <iframe
        title='chat'
        src="https://www.chatbase.co/chatbot-iframe/fhra85_xy_9lkMJTxI1P2"
        className={styles.dapp_iframe}
      ></iframe>
    </div>
    <Footer/>
    </>
  );
}

export default Dapp;
