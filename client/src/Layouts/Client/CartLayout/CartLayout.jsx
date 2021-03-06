import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './CartLayout.module.scss';
import Header from '~/Layouts/Client/components/Header/Header';
import Footer from '~/Layouts/Client/components/Footer/Footer';
import BottomNavigation from '../components/BottomNavigationSmartPhone';

const cx = classnames.bind(styles);

function CartLayout({ children }) {
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
