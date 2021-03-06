import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '~/Layouts/Admin/components/Header/Header';
import Sidebar from '~/Layouts/Admin/components/Sidebar/Siderbar';
import classnames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classnames.bind(styles);

function DefaultLayout({ children }) {
    const [toggleMenu, setToggleMenu] = useState(false);
    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    };

    useMemo(() => {
        if (window.innerWidth < 1024) {
            setToggleMenu(true);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('sidebar', {
                    'menu-mobile': toggleMenu,
                    'active-sidebar': !toggleMenu,
                })}
            >
                <Sidebar onClick={handleToggleMenu} toggleMenu={toggleMenu} />
            </div>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <Header />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};
export default DefaultLayout;
