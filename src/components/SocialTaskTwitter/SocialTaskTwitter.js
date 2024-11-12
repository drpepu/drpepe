import React, { useState, useEffect, useRef } from 'react';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useWallet } from '@solana/wallet-adapter-react';
import { db } from '../../firebase'; 
import gsap from 'gsap';
import styles from './SocialTaskTwitter.module.css';
import checkmark_green from '../../Assets/CHECKMARK_ICON_GREEN.svg';
import checkmark_grey from '../../Assets/CHECKMARK_ICON_GREY.svg';

const SocialTaskTwitter = () => {
    const [twitterHandle, setTwitterHandle] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [handleStatus, setHandleStatus] = useState('grey');
    const dropdownRef = useRef(null);
    const { publicKey } = useWallet();

    useEffect(() => {
        if (publicKey) {
            setIsWalletConnected(true);
            fetchTwitterHandle();
        } else {
            setIsWalletConnected(false);
            setTwitterHandle('');
            setHandleStatus('grey');
        }
    }, [publicKey]);

    const fetchTwitterHandle = async () => {
        if (!publicKey) return;

        const userDocRef = doc(db, 'social_verifications', publicKey.toBase58());
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData.twitterHandle) {
                setTwitterHandle(userData.twitterHandle);
                setHandleStatus('green'); // Set to green if handle exists
            }
        }
    };

    const saveTwitterHandle = async () => {
        if (!publicKey || !twitterHandle) {
            console.error("Wallet not connected or Twitter handle is empty.");
            return;
        }

        setLoading(true);

        try {
            const userDocRef = doc(db, 'social_verifications', publicKey.toBase58());

            // Save the Twitter handle to the database
            await setDoc(userDocRef, {
                publicKey: publicKey.toBase58(),
                twitterHandle,
                timestamp: serverTimestamp(),
            }, { merge: true });

            alert("Twitter handle saved successfully!");
            setHandleStatus('green'); // Set to green after saving successfully
        } catch (error) {
            console.error("Error saving Twitter handle:", error);
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

    const getHandleIcon = () => {
        return handleStatus === 'green' ? checkmark_green : checkmark_grey;
    };

    return (
        <div
            className={styles.SocialTaskTwitter_main_container}
            onClick={toggleDropdown}
            style={{ cursor: 'pointer' }}
        >
            <div className={styles.SocialTaskTwitter_visible_drop}>
                <div className={styles.SocialTaskTwitter_visible}>
                    <div className={styles.SocialTaskTelegram_title}>FOLLOW DRPEPE.AI ON X</div>
                    <div className={styles.SocialTaskTwitter_input_button}>
                        <input
                            type="text"
                            placeholder="@USERNAME"
                            value={twitterHandle}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setTwitterHandle(e.target.value)}
                            className={styles.SocialTaskTwitter_input}
                            disabled={!isWalletConnected || handleStatus === 'green'}
                        />
                        <button
                            onClick={(e) => { e.stopPropagation(); saveTwitterHandle(); }}
                            disabled={loading || !publicKey || handleStatus === 'green'}
                            className={styles.SocialTaskTwitter_button}
                            style={{
                                backgroundColor: publicKey && handleStatus !== 'green' ? 'var(--secondary-color)' : 'var(--tertiary-color-hover)',
                                cursor: publicKey && handleStatus !== 'green' ? 'pointer' : 'not-allowed',
                            }}
                        >
                            {loading ? 'SAVING...' : 'VERIFY X'}
                        </button>

                        {handleStatus === 'green' && (
                            <img src={getHandleIcon()} alt="handle status" className={styles.checkmarkIcon} />
                        )}
                    </div> 

                    {twitterHandle && handleStatus === 'green' && (
                        <div className={styles.SocialTaskTwitter_verified}>
                            VERIFIED
                        </div>
                    )}
                </div>

                <div
                    ref={dropdownRef}
                    className={styles.SocialTaskTwitter_dropdown}
                    style={{ height: 0, overflow: 'hidden' }}
                >
                    <strong className={styles.SocialTaskTwitter_p}>Description</strong>
                    <ul className={styles.SocialTaskTwitter_ul}>
                    <li>Follow <strong><a className={styles.SocialTaskTwitter_link} href="https://x.com/drpepeai" target="_blank" rel="noopener noreferrer">DrPepe.ai on X</a></strong>  and earn points that convert to $DRP.</li>
                        
                    </ul>
                    <strong className={styles.SocialTaskTwitter_p}>Guide</strong>
                        <ul className={styles.SocialTaskTwitter_ul}>
                        <li className={styles.SocialTaskTwitter_li}>1 .Enter your X handle in the input box.</li>
                        <li className={styles.SocialTaskTwitter_li}>2. Ensure your wallet is connected.</li>
                        <li className={styles.SocialTaskTwitter_li}>3. Click "Save Handle" to link your X handle to your wallet.</li>
                        <li className={styles.SocialTaskTwitter_li}>4. Points will be granted automatically after you save your handle.</li> 
                        <li className={styles.SocialTaskTwitter_li}>5. If you unfollow, the points will be removed.</li> 
                        </ul>


                </div>
            </div>
        </div>
    );
};

export default SocialTaskTwitter;
