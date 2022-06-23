import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import styles from './HeaderCart.module.scss';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classnames.bind(styles);

function HeaderCart({ title, link }) {
    return (
        <div className={cx('header')}>
            <Link to={link} className={cx('btn-back')}>
                <FontAwesomeIcon icon={faChevronLeft} className={cx('icon-back')} />
                <span className={cx('text-back')}>Trở về</span>
            </Link>
            <h2 className={cx('cart')}>{title}</h2>
        </div>
    );
}

export default HeaderCart;
