import React from 'react';
import classnames from 'classnames/bind';
import styles from './CartLayout.module.scss';
import Header from '~/Layouts/Client/components/Header/Header';
import Footer from '~/Layouts/Client/components/Footer/Footer';

const cx = classnames.bind(styles);

function CartLayout({ children }) {
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

export default CartLayout;
