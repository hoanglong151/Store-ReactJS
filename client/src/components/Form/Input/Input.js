import React from 'react';
import classnames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classnames.bind(styles);

function Input(props) {
    const { errors, id, name, onChange, value, placeholder, type, dateNow, className, checked } = props;
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
            checked={checked}
            placeholder={placeholder}
        />
    );
}

export default Input;
