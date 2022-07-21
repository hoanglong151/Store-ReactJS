import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './NoSidebar.module.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BottomNavigationSmartPhone from '../components/BottomNavigationSmartPhone';
import chatBot from '~/util/chatBot';

const cx = classnames.bind(styles);

function NoSidebar({ children }) {
    useEffect(() => {
        chatBot();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Header openButtonCategory openMenuCategory />
            <div className={cx('body')}>{children}</div>
            <div className={cx('footer')}>
                <Footer />
            </div>
            <div className={cx('bottom-navigation')}>
                <BottomNavigationSmartPhone />
            </div>
        </div>
    );
}

NoSidebar.propTypes = {
    children: PropTypes.node,
};

export default NoSidebar;
