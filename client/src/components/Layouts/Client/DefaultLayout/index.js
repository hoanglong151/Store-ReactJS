import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';

function DefaultLayout({ children }) {
    const [openButtonCategory, setOpenButtonCategory] = useState(false);
    const [openMenuCategory, setOpenMenuCategory] = useState(false);
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
        <div className={clsx(styles.wrapper)}>
            <Header openButtonCategory={openButtonCategory} openMenuCategory={openMenuCategory} />
            <div className={clsx(styles.body)}>
                <div className={clsx(styles.sidebar)}>
                    <Sidebar />
                </div>
                {children}
            </div>
            <div className={clsx(styles.footer)}>
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;
