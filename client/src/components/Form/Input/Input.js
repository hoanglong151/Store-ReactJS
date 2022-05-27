import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

function Input(props) {
    const { errors, id, name, onChange, value, placeholder, type, dateNow, className } = props;
    return (
        <input
            id={id}
            name={name}
            onChange={onChange}
            value={value}
            type={type || 'text'}
            className={clsx(styles.input, {
                [styles.error]: errors,
                [className]: className,
            })}
            placeholder={placeholder}
        />
    );
}

export default Input;
