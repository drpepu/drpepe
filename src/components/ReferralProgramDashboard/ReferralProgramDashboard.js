import React, { useState, useRef, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';  // Correct imports
import { db } from '../../firebase';
import gsap from 'gsap';
import styles from './ReferralProgramDashboard.module.css';
import ReferralLog from '../ReferralLog/ReferralLog';

const ReferralProgramDashboard = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [totalReferrals, setTotalReferrals] = useState(0);
    const [telegramVerified, setTelegramVerified] = useState(false);  // State for Telegram verification status
    const [twitterVerified, setTwitterVerified] = useState(false);    // State for Twitter verification status
    const dropdownRef = useRef(null);
    const { publicKey } = useWallet();

    const toggleDropdown = () => {
        if (isDropdownOpen) {
            gsap.to(dropdownRef.current, { height: 0, duration: 0.5, ease: 'power3.inOut' });
        } else {
            gsap.to(dropdownRef.current, { height: 'auto', duration: 0.5, ease: 'power3.inOut' });
        }
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        if (publicKey) {
            // Query to filter referrals linked to the connected wallet's publicKey
            const referralQuery = query(
                collection(db, 'referrals_two'),
                where('referrerPublicKey', '==', publicKey.toString())
            );

            const unsubscribe = onSnapshot(referralQuery, (snapshot) => {
                setTotalReferrals(snapshot.size);
            });

            // Check Telegram verification status
            const fetchTelegramVerification = async () => {
                const userDocRef = doc(db, 'social_verifications', publicKey.toBase58());
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    if (userData.telegramVerification && userData.telegramVerification.verifiedStatus) {
                        setTelegramVerified(true);
                    }
                }
            };

            // Check Twitter verification status
            const fetchTwitterVerification = async () => {
                const userDocRef = doc(db, 'social_verifications', publicKey.toBase58());
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    if (userData.twitterHandle && userData.twitterHandle.trim() !== "") {  // Check if the Twitter handle exists
                        setTwitterVerified(true);
                    }
                }
            };

            fetchTelegramVerification();
            fetchTwitterVerification();

            // Clean up the listener on component unmount
            return () => unsubscribe();
        } else {
            setTotalReferrals(0); // Reset count when wallet is not connected
        }
    }, [publicKey]);

    // Calculate total $DRP Points
    const totalDRPPoints = publicKey
        ? totalReferrals * 1 + (telegramVerified ? 10 : 0) + (twitterVerified ? 10 : 0)  // 10 points per referral + points from Telegram and Twitter verifications
        : 0;

    return (
        <div className={styles.referral_program_dashboard_main_container} onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
            
            <div className={styles.referral_program_dashboardHeader}>

                <div className={styles.referral_program_dashboard_box}>
                    <div className={styles.referral_program_dashboard_box_description}>
                        Total Referrals
                    </div>
                    <div className={styles.referral_program_dashboard_box_total}>
                        {totalReferrals}
                    </div>
                </div>

                <div className={styles.referral_program_dashboard_box}>
                    <div className={styles.referral_program_dashboard_box_description}>
                        X (Twitter) Points
                    </div>
                    <div className={styles.referral_program_dashboard_box_total}>
                        {publicKey ? (twitterVerified ? 10 : 0) : 0}  {/* Add 10 points if Twitter is verified */}
                    </div>
                </div>  

                <div className={styles.referral_program_dashboard_box}>
                    <div className={styles.referral_program_dashboard_box_description}>
                        Telegram Points
                    </div>
                    <div className={styles.referral_program_dashboard_box_total}>
                        {publicKey ? (telegramVerified ? 10 : 0) : 0}  {/* Add 10 points if Telegram is verified */}
                    </div>
                </div> 

                <div className={styles.referral_program_dashboard_box}>
                    <div className={styles.referral_program_dashboard_box_description}>
                        Total $DRP Points
                    </div>
                    <div className={styles.referral_program_dashboard_box_total}>
                        {publicKey ? totalDRPPoints : 0}  {/* Sum the points */}
                    </div>
                </div>

            </div>

            <div
                ref={dropdownRef}
                className={styles.dropdownContent}
                style={{ height: 0, overflow: 'hidden' }}
            >
                <ReferralLog />
            </div>

        </div>
    );
};

export default ReferralProgramDashboard;
