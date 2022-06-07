import React from 'react';
import clsx from 'clsx';
import styles from './CartLayout.module.scss';
import Header from '~/components/Layouts/Client/components/Header/Header';
import Footer from '~/components/Layouts/Client/components/Footer/Footer';

function CartLayout({ children }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <Header openButtonCategory openMenuCategory />
            <div className={clsx(styles.body)}>{children}</div>
            <div className={clsx(styles.footer)}>
                <Footer />
            </div>
        </div>
    );
}

export default CartLayout;
