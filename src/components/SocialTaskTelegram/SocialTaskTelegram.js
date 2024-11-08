import React, { useState, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import styles from './SocialTaskTelegram.module.css';
import checkmark_green from '../../Assets/CHECKMARK_ICON_GREEN.svg';
import checkmark_grey from '../../Assets/CHECKMARK_ICON_GREY.svg';
import xmark_red from '../../Assets/XMARK_ICON.svg';

const SocialTaskTelegram = () => {
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [membershipStatus, setMembershipStatus] = useState('grey'); 

    const dropdownRef = useRef(null);

    const handleCheckMembership = async () => {
        setLoading(true);
        setMembershipStatus('grey'); 

        try {
            const response = await axios.post('https://social-task-telegram-server.onrender.com/check-membership', { userId });
            if (response.data.isMember) {
                setMembershipStatus('green'); 
            } else {
                setMembershipStatus('red'); 
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
                            placeholder="TELEGRAM USER ID"
                            value={userId}
                            onClick={(e) => e.stopPropagation()} 
                            onChange={(e) => setUserId(e.target.value)}
                            className={styles.SocialTaskTelegram_input}
                        />
                        <button
                            onClick={(e) => { e.stopPropagation(); handleCheckMembership(); }}
                            disabled={loading}
                            className={styles.SocialTaskTelegram_button}
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
                        <li className={styles.SocialTaskTelegram_li}>1. Join <strong> <a className={styles.SocialTaskTelegram_link} href="https://web.telegram.org/a/#-1002168191894" target="_blank" rel="noopener noreferrer">DrPepe.ai on Telegram</a> </strong>.</li>
                        <li className={styles.SocialTaskTelegram_li}>2. Enter your Telegram ID to confirm your membership.</li>
                        <li className={styles.SocialTaskTelegram_li}>3. If you don't know your Telegram ID, Use <strong> <a className={styles.SocialTaskTelegram_link} href="https://telegram.me/userinfobot" target="_blank" rel="noopener noreferrer">this Telegram bot</a> </strong>  to get your ID.</li>
                        <li className={styles.SocialTaskTelegram_li}>4. Green arrow = member & points. Grey = check ID & follow. Red X = invalid ID or not following.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SocialTaskTelegram;
