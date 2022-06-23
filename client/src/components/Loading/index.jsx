import React from 'react';
import classnames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classnames.bind(styles);

function Loading() {
    return (
        <div className={cx('loading-area')}>
            <span className={cx('loader')}>Loading...</span>
            <span className={cx('load_anim1')}></span>
            <span className={cx('load_anim2')}></span>
        </div>
    );
}

export default Loading;
