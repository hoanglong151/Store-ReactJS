import React from 'react';
import classnames from 'classnames/bind';
import styles from './ErrorMessage.module.scss';

const cx = classnames.bind(styles);

function ErrorMessage({ children }) {
    return <div className={cx('error-message')}>{children}</div>;
}

export default ErrorMessage;
