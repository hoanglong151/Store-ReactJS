import React from 'react';
import classnames from 'classnames/bind';
import styles from './MenuRight.module.scss';

const cx = classnames.bind(styles);

function MenuRight() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('menu-right')}>
                <a href="https://www.google.com/" className={cx('poster')}>
                    <img
                        className={cx('image')}
                        src="https://cdn1.hoanghamobile.com/tin-tuc/wp-content/uploads/2020/06/1-2-15-1024x536.jpg"
                    />
                </a>
                <a href="https://www.google.com/" className={cx('poster')}>
                    <img
                        className={cx('image')}
                        src="https://i.pinimg.com/originals/e9/d3/35/e9d335f25758c4eca3f59d2284d470bf.jpg"
                    />
                </a>
                <a href="https://www.google.com/" className={cx('poster')}>
                    <img
                        className={cx('image')}
                        src="https://i.pinimg.com/originals/e9/d3/35/e9d335f25758c4eca3f59d2284d470bf.jpg"
                    />
                </a>
            </div>
        </div>
    );
}

export default MenuRight;
