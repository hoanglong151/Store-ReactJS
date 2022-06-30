import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classnames.bind(styles);

function Header() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('auth'));
    const { bills } = useSelector((state) => state.bill);

    // useEffect(() => {
    //     bills.map((bill) => {
    //         const arr = bill.Bill.filter((item) => {
    //             return item.BillStatus.Name === 'Chờ xử lý';
    //         });
    //         console.log(arr);
    //     });
    // }, []);

    const handleHideVisible = () => {
        setVisible(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('auth');
        navigate('/Admin/Login');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img
                    className={cx('logo-img')}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/IOS_logo.svg/768px-IOS_logo.svg.png"
                />
            </div>
            <div className={cx('action')}>
                <button className={cx('notify')}>
                    <FontAwesomeIcon icon={faBell} />
                    <span className={cx('num-notifi')}>1</span>
                </button>
                <Tippy
                    interactive={true}
                    visible={visible}
                    render={(attrs) => (
                        <ul {...attrs} tabIndex="-1" className={cx('info-auth')}>
                            <li className={cx('item-info')}>
                                <p className={cx('btn-nfo')} onClick={handleLogout}>
                                    Đăng Xuất
                                </p>
                            </li>
                        </ul>
                    )}
                    onClickOutside={handleHideVisible}
                >
                    <div className={cx('info-account')} onClick={() => setVisible(true)}>
                        <img
                            className={cx('img')}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/IOS_logo.svg/768px-IOS_logo.svg.png"
                        />
                        <span className={cx('user-name')}>{user?.Name}</span>
                        <button className={cx('menu-user')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

export default Header;
