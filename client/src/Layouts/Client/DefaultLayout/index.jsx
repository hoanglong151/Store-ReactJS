import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import BottomNavigation from '../components/BottomNavigationSmartPhone';
import chatBot from '~/util/chatBot';

const cx = classnames.bind(styles);

function DefaultLayout({ children }) {
    const [openButtonCategory, setOpenButtonCategory] = useState(false);
    const [openMenuCategory, setOpenMenuCategory] = useState(false);

    useEffect(() => {
        chatBot();
    }, []);

    useEffect(() => {
        const scrollID = window.addEventListener('scroll', () => {
            if (window.scrollY >= 200) {
                setOpenButtonCategory(true);
            } else {
                setOpenButtonCategory(false);
                setOpenMenuCategory(false);
            }
        });
        return () => {
            window.removeEventListener('scroll', scrollID);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header openButtonCategory={openButtonCategory} openMenuCategory={openMenuCategory} />
            <div className={cx('body')}>
                <div className={cx('sidebar')}>
                    <Sidebar />
                </div>
                {children}
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
            <div className={cx('bottom-navigation')}>
                <BottomNavigation />
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
