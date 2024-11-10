import React, { useState, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import { db } from '../../firebase'; // Assuming db is configured in a separate file
import styles from './SocialTaskTelegram.module.css';
import checkmark_green from '../../Assets/CHECKMARK_ICON_GREEN.svg';
import checkmark_grey from '../../Assets/CHECKMARK_ICON_GREY.svg';
import xmark_red from '../../Assets/XMARK_ICON.svg';

const SocialTaskTelegram = () => {
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [membershipStatus, setMembershipStatus] = useState('grey');
    const [isWalletConnected, setIsWalletConnected] = useState(false); // To track wallet connection status
    const dropdownRef = useRef(null);

    const { publicKey } = useWallet(); // Get the public key from the connected wallet

    // This effect will run every time the publicKey changes
    React.useEffect(() => {
        if (publicKey) {
            setIsWalletConnected(true);
        } else {
            setIsWalletConnected(false);
        }
    }, [publicKey]);

    const handleCheckMembership = async () => {
        if (!publicKey) {
            console.error("No public key found. Connect the wallet first.");
            return;
        }

        setLoading(true);
        setMembershipStatus('grey'); // Reset to grey state when starting the verification

        try {
            // Call the backend API to check Telegram membership
            const response = await axios.post('https://social-task-telegram-server.onrender.com/check-membership', { userId });
            const isMember = response.data.isMember;

            // Update membership status based on the response
            setMembershipStatus(isMember ? 'green' : 'red');

            // Reference to the social_verifications collection in Firestore
            const userDocRef = doc(db, 'social_verifications', publicKey.toBase58());

            // Write the verification status to Firestore
            await setDoc(userDocRef, {
                publicKey: publicKey.toBase58(),
                telegramVerification: {
                    telegramUserId: userId,
                    verifiedStatus: isMember,
                    timestamp: serverTimestamp(),
                }
            }, { merge: true }); // Use merge: true to avoid overwriting other fields

        } catch (error) {
            console.error('Error checking membership:', error);
            setMembershipStatus('red'); // Set red if there was an error
        } finally {
            setLoading(false); // Stop loading spinner
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
        switch (membershipStatus) {
            case 'green':
                return checkmark_green; 
            case 'red':
                return xmark_red; 
            default:
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
                            placeholder={publicKey ? "TELEGRAM USER ID" : "CONNECT YOUR WALLET"}
                            value={userId}
                            onClick={(e) => e.stopPropagation()} 
                            onChange={(e) => setUserId(e.target.value)}
                            className={styles.SocialTaskTelegram_input}
                            disabled={!isWalletConnected} // Disable input when wallet is not connected
                        />
                      <button
                            onClick={(e) => { e.stopPropagation(); handleCheckMembership(); }}
                            disabled={loading || !publicKey} // Disable button if no wallet connected or loading
                            className={styles.SocialTaskTelegram_button}
                            style={{
                                backgroundColor: publicKey ? 'var(--secondary-color)' : 'var(--tertiary-color-hover)',
                                borderColor: publicKey ? 'var(--secondary-color)' : 'var(--tertiary-color-hover)',
                                border: publicKey ? 'var(--border-container-width) solid var(--secondary-color)' : ' var(--border-container-width) solid var(--tertiary-color-hover)',
                                color: publicKey ? 'var(--tertiary-color-hover)' : 'var(--tertiary-color-hover-text)', 
                                cursor: publicKey ? 'pointer' : 'not-allowed', 
                            }}
                        >
                            {loading ? 'VERIFYING...' : 'VERIFY TELEGRAM'}
                        </button>

                        <img src={getMembershipIcon()} alt="membership status" className={styles.checkmarkIcon} />
                    </div>
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
                        <li className={styles.SocialTaskTelegram_li}>4. Green arrow = member & points. Grey = check ID & follow. Red X = invalid ID or not following.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SocialTaskTelegram;
