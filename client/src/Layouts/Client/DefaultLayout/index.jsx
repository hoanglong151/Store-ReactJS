import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import BottomNavigation from '../components/BottomNavigationSmartPhone';

const cx = classnames.bind(styles);

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

    useEffect(() => {
        var chatbox = document.getElementById('fb-customer-chat');
        chatbox.setAttribute('page_id', '101296765104112');
        chatbox.setAttribute('attribution', 'biz_inbox');

        window.fbAsyncInit = function () {
            window.FB.init({
                xfbml: true,
                version: 'v14.0',
            });
        };

        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div id="fb-root"></div>

            <div id="fb-customer-chat" className="fb-customerchat"></div>

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
