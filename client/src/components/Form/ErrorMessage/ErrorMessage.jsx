import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './ErrorMessage.module.scss';

const cx = classnames.bind(styles);

function ErrorMessage({ children }) {
    return <div className={cx('error-message')}>{children}</div>;
}

ErrorMessage.propTypes = {
    children: PropTypes.node,
};

export default ErrorMessage;
