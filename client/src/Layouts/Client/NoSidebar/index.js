import React from 'react';
import classnames from 'classnames/bind';
import styles from './NoSidebar.module.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const cx = classnames.bind(styles);

function NoSidebar({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header openButtonCategory openMenuCategory />
            <div className={cx('body')}>{children}</div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default NoSidebar;
