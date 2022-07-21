import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './CartLayout.module.scss';
import Header from '~/Layouts/Client/components/Header/Header';
import Footer from '~/Layouts/Client/components/Footer/Footer';
import BottomNavigation from '../components/BottomNavigationSmartPhone';
import chatBot from '~/util/chatBot';

const cx = classnames.bind(styles);

function CartLayout({ children }) {
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
                <BottomNavigation />
            </div>
        </div>
    );
}

CartLayout.propTypes = {
    children: PropTypes.node,
};

export default CartLayout;
