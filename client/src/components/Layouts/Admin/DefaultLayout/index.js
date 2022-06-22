import React, { useState } from 'react';
import Header from '~/components/Layouts/Admin/components/Header/Header';
import Sidebar from '~/components/Layouts/Admin/components/Sidebar/Siderbar';
import clsx from 'clsx';
import styles from './DefaultLayout.module.scss';

function DefaultLayout({ children }) {
    const [toggleMenu, setToggleMenu] = useState(false);
    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.sidebar, { [styles.menuMobile]: toggleMenu })}>
                <Sidebar onClick={handleToggleMenu} toggleMenu={toggleMenu} />
            </div>
            <div className={clsx(styles.container)}>
                <div className={clsx(styles.header)}>
                    <Header />
                </div>
                <div className={clsx(styles.content)}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
