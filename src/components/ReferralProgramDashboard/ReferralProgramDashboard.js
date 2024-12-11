import React, { useState, useRef, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import gsap from 'gsap';
import styles from './ReferralProgramDashboard.module.css';
import pepebestfren from '../../Assets/DRPEPEBESTFREN.svg';

const ReferralProgramDashboard = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [referralData, setReferralData] = useState(null); // Store data for the connected wallet
    const [telegramVerified, setTelegramVerified] = useState(false);
    const [twitterVerified, setTwitterVerified] = useState(false);
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
            const referralDocRef = doc(db, 'referrals', publicKey.toBase58());

            const unsubscribe = onSnapshot(referralDocRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setReferralData(data);

                    // Check Telegram Verification
                    if (data.telegramId && data.telegramId.trim() !== '') {
                        setTelegramVerified(true);
                    } else {
                        setTelegramVerified(false);
                    }

                    // Check Twitter Verification
                    if (data.twitterHandle && data.twitterHandle.trim() !== '') {
                        setTwitterVerified(true);
                    } else {
                        setTwitterVerified(false);
                    }
                } else {
                    setReferralData(null);
                    setTelegramVerified(false);
                    setTwitterVerified(false);
                }
            });

            return () => unsubscribe();
        } else {
            setReferralData(null);
            setTelegramVerified(false);
            setTwitterVerified(false);
        }
    }, [publicKey]);

    const totalDRPPoints = referralData
        ? (referralData.totalPoints || 0) +
          (telegramVerified ? 10 : 0) +
          (twitterVerified ? 10 : 0)
        : 0;

    return (
        <div className={styles.referral_program_dashboard_main_container} onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
            <div className={styles.referral_program_dashboardHeader}>
                <div className={styles.referral_program_dashboard_box}>
                    <div className={styles.referral_program_dashboard_box_description}>
                        X (Twitter) Points
                    </div>
                    <div className={styles.referral_program_dashboard_box_total}>
                        {twitterVerified ? 10 : 0}
                    </div>
                </div>

                <div className={styles.referral_program_dashboard_box}>
                    <div className={styles.referral_program_dashboard_box_description}>
                        Telegram Points
                    </div>
                    <div className={styles.referral_program_dashboard_box_total}>
                        {telegramVerified ? 10 : 0}
                    </div>
                </div>

                <div className={styles.referral_program_dashboard_box}>
                    <div className={styles.referral_program_dashboard_box_description}>
                        Total Referrals
                    </div>
                    <div className={styles.referral_program_dashboard_box_total}>
                        {referralData ? referralData.totalReferrals || 0 : 0}
                    </div>
                </div>

                <div className={styles.referral_program_dashboard_box}>
                    <div className={styles.referral_program_dashboard_box_description}>
                        Total $DRP Points
                    </div>
                    <div className={styles.referral_program_dashboard_box_total}>
                        {totalDRPPoints}
                    </div>
                    <img src={pepebestfren} alt='pepebestfren' className={styles.referral_program_dashboard_img_bestfren}></img>
                </div>
            </div>

            <div
                ref={dropdownRef}
                className={styles.dropdownContent}
                style={{ height: 0, overflow: 'hidden' }}
            >
                {referralData && (
                    <div className={styles.referral_details}>
                        <p><strong>Level 1 Referrals:</strong> {referralData.level1Referrals || 0}</p>
                        <p><strong>Level 2 Referrals:</strong> {referralData.level2Referrals || 0}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReferralProgramDashboard;
