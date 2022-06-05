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
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/IOS_logo.svg/768px-IOS_logo.svg.png"
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
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/IOS_logo.svg/768px-IOS_logo.svg.png"
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
