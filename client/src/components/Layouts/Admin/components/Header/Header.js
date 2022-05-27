import React from 'react';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

function Header() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.logo)}>
                <img
                    className={clsx(styles.logoImg)}
                    src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/241304414_217755000371428_4402519406709359752_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=lc21gyXXM6YAX9VEFIc&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT88CugSs300sSk6KMaqwX8c3U_agpCaf_6IiDVowKLeRA&oe=628E1A6E"
                />
            </div>
            <div className={clsx(styles.action)}>
                <button className={clsx(styles.notify)}>
                    <FontAwesomeIcon icon={faBell} />
                    <span className={clsx(styles.numNotifi)}>1</span>
                </button>
                <div className={clsx(styles.infoAccount)}>
                    <img
                        className={clsx(styles.img)}
                        src="https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/241304414_217755000371428_4402519406709359752_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=lc21gyXXM6YAX9VEFIc&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT88CugSs300sSk6KMaqwX8c3U_agpCaf_6IiDVowKLeRA&oe=628E1A6E"
                    />
                    <span className={clsx(styles.userName)}>Hoàng Long</span>
                    <button className={clsx(styles.menuUser)}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
