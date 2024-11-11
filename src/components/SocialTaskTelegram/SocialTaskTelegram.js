import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import { db } from '../../firebase'; 
import styles from './SocialTaskTelegram.module.css';
import checkmark_green from '../../Assets/CHECKMARK_ICON_GREEN.svg';
import checkmark_grey from '../../Assets/CHECKMARK_ICON_GREY.svg';
import xmark_red from '../../Assets/XMARK_ICON.svg';

const SocialTaskTelegram = () => {
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [membershipStatus, setMembershipStatus] = useState('grey');
    const [isWalletConnected, setIsWalletConnected] = useState(false); 
    const [verifiedTelegramId, setVerifiedTelegramId] = useState(''); 
    const dropdownRef = useRef(null);

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

        const userDocRef = doc(db, 'social_verifications', publicKey.toBase58());
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData.telegramVerification) {
                const { telegramUserId, verifiedStatus } = userData.telegramVerification;
                setVerifiedTelegramId(telegramUserId);
                setMembershipStatus(verifiedStatus ? 'green' : 'red');
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
            
            const telegramIdCheckRef = doc(db, 'social_verifications', userId); 
            const telegramIdCheckSnap = await getDoc(telegramIdCheckRef);
    
            if (telegramIdCheckSnap.exists()) {
            
                setMembershipStatus('red');
                setVerifiedTelegramId('');
                alert("This Telegram ID is already associated with another wallet.");
                return;
            }

            const response = await axios.post('https://social-task-telegram-server.onrender.com/check-membership', { userId });
            const isMember = response.data.isMember;
    

            if (isMember) {
                setMembershipStatus('green');
                setVerifiedTelegramId(userId); 
    
               
                const userDocRef = doc(db, 'social_verifications', publicKey.toBase58());
                await setDoc(userDocRef, {
                    publicKey: publicKey.toBase58(),
                    telegramVerification: {
                        telegramUserId: userId,
                        verifiedStatus: true,
                        timestamp: serverTimestamp(),
                    }
                }, { merge: true });
    
               
                await setDoc(telegramIdCheckRef, {
                    publicKey: publicKey.toBase58(),
                    telegramUserId: userId,
                });
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

    return (
        <div
            className={styles.SocialTaskTelegram_main_container}
            onClick={toggleDropdown}
            style={{ cursor: 'pointer' }}
        >
            <div className={styles.SocialTaskTelegram_visible_drop}>
                <div className={styles.SocialTaskTelegram_visible}>
                    <div>Join DrPepe.ai on Telegram</div>
                    <div className={styles.SocialTaskTelegram_input_button}>
                        <input
                            type="number"
                            placeholder={publicKey ? "TELEGRAM USER ID" : "TELEGRAM USER ID"}
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
                                borderColor: publicKey && membershipStatus !== 'green' ? 'var(--secondary-color)' : 'var(--tertiary-color-hover)',
                                border: publicKey && membershipStatus !== 'green' ? 'var(--border-container-width) solid var(--secondary-color)' : ' var(--border-container-width) solid var(--tertiary-color-hover)',
                                color: publicKey && membershipStatus !== 'green' ? 'var(--tertiary-color-hover)' : 'var(--tertiary-color-hover-text)', 
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
                            Verified Telegram ID: {verifiedTelegramId}
                        </div>
                    )}
                </div>

                <div
                    ref={dropdownRef}
                    className={styles.SocialTaskTelegram_dropdown}
                    style={{ height: 0, overflow: 'hidden' }}
                >
                            <strong className={styles.SocialTaskTelegram_p}>Description</strong>
                    <ul className={styles.SocialTaskTelegram_ul}>
                        <li>Join DrPepe.ai on Telegram and earn points that convert to $DRP.</li>
                    </ul>
                    <strong className={styles.SocialTaskTelegram_p}>Guide:</strong>
                    <ul className={styles.SocialTaskTelegram_ul}>
                        <li className={styles.SocialTaskTelegram_li}>1. Join <strong><a className={styles.SocialTaskTelegram_link} href="https://web.telegram.org/a/#-1002168191894" target="_blank" rel="noopener noreferrer">DrPepe.ai on Telegram</a></strong>.</li>
                        <li className={styles.SocialTaskTelegram_li}>2. Enter your Telegram ID to confirm your membership.</li>
                        <li className={styles.SocialTaskTelegram_li}>3. If you don't know your Telegram ID, use <strong><a className={styles.SocialTaskTelegram_link} href="https://telegram.me/userinfobot" target="_blank" rel="noopener noreferrer">this Telegram bot</a></strong> to get your ID.</li>
                        <li className={styles.SocialTaskTelegram_li}>4. Green arrow = member & points. Grey = check ID & follow. Red X = invalid ID or not following</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SocialTaskTelegram;
