import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './Label.module.scss';

const cx = classnames.bind(styles);
function Label({ children, className }) {
    return <h3 className={cx({ [className]: className })}>{children}</h3>;
}

Label.propTypes = {
    children: PropTypes.node,
    className: PropTypes.node,
};

export default Label;
