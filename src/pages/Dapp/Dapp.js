
import React from 'react';
import styles from './Dapp.module.css';
import Header from '../../components/Header/Header';


function Dapp() {


  return (
    <>
    <Header />
    <div className={styles.dapp_container}>

        <iframe
          title='chat'
          src="https://www.chatbase.co/chatbot-iframe/fhra85_xy_9lkMJTxI1P2"
          width="100%"
          style={{ height: '100%', minHeight: '700px' }}
          frameborder="0"
        ></iframe>
    </div>
    </>
  );
}

export default Dapp;
