import React from 'react';
import classnames from 'classnames/bind';
import styles from './Label.module.scss';

const cx = classnames.bind(styles);
function Label({ children, className }) {
    return <h3 className={cx({ [className]: className })}>{children}</h3>;
}

export default Label;
