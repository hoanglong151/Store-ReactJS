import React from 'react';
import classnames from 'classnames/bind';
import styles from './LoadingCRUD.module.scss';

const cx = classnames.bind(styles);
function LoadingCRUD() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('loader')}></div>
        </div>
    );
}

export default LoadingCRUD;
