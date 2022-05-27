import React from 'react';
import clsx from 'clsx';
import styles from './ErrorMessage.module.scss';

function ErrorMessage({ children }) {
    return <div className={clsx(styles.errorMessage)}>{children}</div>;
}

export default ErrorMessage;
