import React, { useState } from 'react';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('auth'));

    const handleHideVisible = () => {
        setVisible(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('auth');
        navigate('/Admin/Login');
    };
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
                <Tippy
                    interactive={true}
                    visible={visible}
                    render={(attrs) => (
                        <ul {...attrs} tabIndex="-1" className={clsx(styles.infoAuth)}>
                            <li className={clsx(styles.itemInfo)}>
                                <p className={clsx(styles.btnInfo)} onClick={handleLogout}>
                                    Đăng Xuất
                                </p>
                            </li>
                        </ul>
                    )}
                    onClickOutside={handleHideVisible}
                >
                    <div className={clsx(styles.infoAccount)} onClick={() => setVisible(true)}>
                        <img
                            className={clsx(styles.img)}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/IOS_logo.svg/768px-IOS_logo.svg.png"
                        />
                        <span className={clsx(styles.userName)}>{user?.Name}</span>
                        <button className={clsx(styles.menuUser)}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

export default Header;
