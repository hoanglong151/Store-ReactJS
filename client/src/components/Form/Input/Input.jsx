import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classnames.bind(styles);

function Input(props) {
    const { errors, id, name, onChange, value, placeholder, type, className, checked, maxLength, minLength } = props;
    return (
        <input
            id={id}
            name={name}
            onChange={onChange}
            value={value}
            type={type || 'text'}
            className={cx('input', {
                error: errors,
                [className]: className,
            })}
            minLength={minLength}
            maxLength={maxLength}
            checked={checked}
            placeholder={placeholder}
        />
    );
}

Input.propTypes = {
    errors: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.node,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.node,
    checked: PropTypes.bool,
    maxLength: PropTypes.string,
};

export default Input;
