import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './NoSidebar.module.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function NoSidebar({ children }) {
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

export default NoSidebar;
