
import React from 'react';
import styles from './agent.module.css';
import Header from '../../components/Header/Header';
import FooterSimple from '../../components/FooterSimple/FooterSimple';

function Agent() {


  return (
    <>
    <Header />
    <div className={styles.agent_container}>

      <iframe
        title='chat'
        src="https://www.chatbase.co/chatbot-iframe/fhra85_xy_9lkMJTxI1P2"
        className={styles.agent_iframe}
      ></iframe>
    </div>
    <FooterSimple/>
    </>
  );
}

export default Agent;
