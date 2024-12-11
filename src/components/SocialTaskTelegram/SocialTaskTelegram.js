import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import { db } from '../../firebase';
import styles from './SocialTaskTelegram.module.css';
import checkmark_green from '../../Assets/CHECKMARK_ICON_GREEN.svg';
import checkmark_grey from '../../Assets/CHECKMARK_ICON_GREY.svg';
import xmark_red from '../../Assets/XMARK_ICON.svg';
import { useTranslation } from 'react-i18next';

const SocialTaskTelegram = () => {
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [membershipStatus, setMembershipStatus] = useState('grey');
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [verifiedTelegramId, setVerifiedTelegramId] = useState('');
    const dropdownRef = useRef(null);

    const { t } = useTranslation();
    const { publicKey } = useWallet();

    useEffect(() => {
        if (publicKey) {
            setIsWalletConnected(true);
            fetchTelegramVerification();
        } else {
            setIsWalletConnected(false);
            setVerifiedTelegramId('');
            setMembershipStatus('grey');
        }
    }, [publicKey]);

    const fetchTelegramVerification = async () => {
        if (!publicKey) return;

        const userDocRef = doc(db, 'referrals', publicKey.toBase58());
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData.telegramId) {
                setVerifiedTelegramId(userData.telegramId);
                setMembershipStatus('green');
            }
        }
    };

    const handleCheckMembership = async () => {
        if (!publicKey) {
            console.error("No public key found. Connect the wallet first.");
            return;
        }

        setLoading(true);
        setMembershipStatus('grey');

        try {
            // Check if the Telegram ID is already used
            const referralsCollection = collection(db, 'referrals');
            const telegramQuery = query(referralsCollection, where('telegramId', '==', userId));
            const querySnapshot = await getDocs(telegramQuery);

            if (!querySnapshot.empty) {
                setMembershipStatus('red');
                setVerifiedTelegramId('');
                alert("This Telegram ID is already associated with another wallet.");
                return;
            }

            // Verify Telegram membership through external API
            const response = await axios.post('https://social-task-telegram-server.onrender.com/check-membership', { userId });
            const isMember = response.data.isMember;

            if (isMember) {
                setMembershipStatus('green');
                setVerifiedTelegramId(userId);

                const userDocRef = doc(db, 'referrals', publicKey.toBase58());
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    await setDoc(userDocRef, {
                        telegramId: userId,
                        lastUpdated: serverTimestamp(),
                    }, { merge: true });
                } else {
                    await setDoc(userDocRef, {
                        referrerPublicKey: publicKey.toBase58(),
                        telegramId: userId,
                        totalReferrals: 0,
                        level1Referrals: 0,
                        level2Referrals: 0,
                        totalPoints: 0,
                        lastUpdated: serverTimestamp(),
                    });
                }

                alert("Telegram ID saved successfully!");
            } else {
                setMembershipStatus('red');
                setVerifiedTelegramId('');
            }
        } catch (error) {
            console.error('Error checking membership:', error);
            setMembershipStatus('red');
        } finally {
            setLoading(false);
        }
    };

    const toggleDropdown = () => {
        if (isDropdownOpen) {
            gsap.to(dropdownRef.current, { height: 0, duration: 0.5, ease: 'power3.inOut' });
        } else {
            gsap.to(dropdownRef.current, { height: 'auto', duration: 0.5, ease: 'power3.inOut' });
        }
        setIsDropdownOpen(!isDropdownOpen);
    };

    const getMembershipIcon = () => {
        if (membershipStatus === 'green') {
            return checkmark_green;
        } else if (membershipStatus === 'red') {
            return xmark_red;
        } else {
            return checkmark_grey;
        }
    };
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const openTelegramLink = () => {
        const mobileLink = 'tg://resolve?domain=drpepeaiOFFICIAL'; 
        const webLink = 'https://web.telegram.org/a/#-1002428485287'; 

        if (isMobile) {
        window.location.href = mobileLink;
        } else {
        window.open(webLink, '_blank', 'noopener noreferrer');
        }
    };


    return (
        <div
            className={styles.SocialTaskTelegram_main_container}
            onClick={toggleDropdown}
            style={{ cursor: 'pointer' }}
        >
            <div className={styles.SocialTaskTelegram_visible_drop}>
                <div className={styles.SocialTaskTelegram_visible}>
                    <div className={styles.SocialTaskTelegram_title}>Join DrPepe.ai on Telegram</div>
                    <div className={styles.SocialTaskTelegram_input_button}>
                        <input
                            type="number"
                            placeholder={publicKey ? "TELEGRAM USER ID" : "CONNECT WALLET"}
                            value={userId}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setUserId(e.target.value)}
                            className={styles.SocialTaskTelegram_input}
                            disabled={!isWalletConnected || membershipStatus === 'green'}
                        />
                        <button
                            onClick={(e) => { e.stopPropagation(); handleCheckMembership(); }}
                            disabled={loading || !publicKey || membershipStatus === 'green'}
                            className={styles.SocialTaskTelegram_button}
                            style={{
                                backgroundColor: publicKey && membershipStatus !== 'green' ? 'var(--secondary-color)' : 'var(--tertiary-color-hover)',
                                cursor: publicKey && membershipStatus !== 'green' ? 'pointer' : 'not-allowed',
                            }}
                        >
                            {loading ? 'VERIFYING...' : 'VERIFY TELEGRAM'}
                        </button>

                        {(membershipStatus === 'green' || membershipStatus === 'red') && (
                            <img src={getMembershipIcon()} alt="membership status" className={styles.checkmarkIcon} />
                        )}
                    </div>

                    {verifiedTelegramId && membershipStatus === 'green' && (
                        <div className={styles.SocialTaskTelegram_verified}>
                            VERIFIED
                        </div>
                    )}
                </div>

                <div
                    ref={dropdownRef}
                    className={styles.SocialTaskTelegram_dropdown}
                    style={{ height: 0, overflow: 'hidden' }}
                >
                    <strong className={styles.SocialTaskTelegram_p}>{t('social_task_telegram_guide_description')}</strong>
                    <ul className={styles.SocialTaskTelegram_ul}>
                        <li>{t('social_task_telegram_guide_description_text')}</li>
                    </ul>
                    <strong className={styles.SocialTaskTelegram_p}>{t('social_task_telegram_guide_guide')}</strong>
                    <ul className={styles.SocialTaskTelegram_ul}>
                        <li className={styles.SocialTaskTelegram_li}>{t('social_task_telegram_step_1')}
                            
                        <button onClick={openTelegramLink} className={styles.social_task_telegram_link} aria-label="Open Telegram chat">DrPepe.ai on Telegram</button>

                            
                            
                            
                         .</li>
                        <li className={styles.SocialTaskTelegram_li}>{t('social_task_telegram_step_2')}</li>

                        <li className={styles.SocialTaskTelegram_li}>{t('social_task_telegram_step_3')}<strong><a className={styles.SocialTaskTelegram_link} href="https://telegram.me/userinfobot" target="_blank" rel="noopener noreferrer">this Telegram bot</a></strong> {t('social_task_telegram_step_3_1')}</li>
                        <li className={styles.SocialTaskTelegram_li}>{t('social_task_telegram_step_4')}</li>
                    </ul>
                </div>
            <div className={styles.SocialTaskTelegram_read_instructions}>📖</div>
            </div>
    
        </div>
    );
};

export default SocialTaskTelegram;
