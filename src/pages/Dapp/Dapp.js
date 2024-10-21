
import React from 'react';
import styles from './Dapp.module.css';
import Header from '../../components/Header/Header';


function Dapp() {


  return (
    <>
    <Header />
    <div className={styles.dapp_container}>
        <div>Dapp / Chatbot Page</div>
    </div>
    </>
  );
}

export default Dapp;
