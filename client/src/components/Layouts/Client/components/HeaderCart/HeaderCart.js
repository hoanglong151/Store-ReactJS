import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './HeaderCart.module.scss';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function HeaderCart({ title, link }) {
    return (
        <div className={clsx(styles.header)}>
            <Link to={link} className={clsx(styles.btnBack)}>
                <FontAwesomeIcon icon={faChevronLeft} className={clsx(styles.iconBack)} />
                <span className={clsx(styles.textBack)}>Trở về</span>
            </Link>
            <h2 className={clsx(styles.cart)}>{title}</h2>
        </div>
    );
}

export default HeaderCart;
