import React from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartPie, faList, faMobileButton, faSackDollar } from '@fortawesome/free-solid-svg-icons';

function Siderbar(props) {
    const { onClick, toggleMenu } = props;
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={styles.toggleMenu} onClick={onClick}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={clsx(styles.menu, { [styles.menuClose]: toggleMenu })}>
                <NavLink
                    to="/Admin/Products"
                    className={({ isActive }) => clsx(styles.linkMenu, { [styles.active]: isActive })}
                >
                    <FontAwesomeIcon icon={faMobileButton} />
                    <span className={clsx(styles.titleMenu)}>Sản Phẩm</span>
                </NavLink>
                <NavLink
                    to="/Admin/Categories"
                    className={({ isActive }) => clsx(styles.linkMenu, { [styles.active]: isActive })}
                >
                    <FontAwesomeIcon icon={faChartPie} />
                    <span className={clsx(styles.titleMenu)}>Danh Mục</span>
                </NavLink>
                <NavLink
                    to="/Admin/Firms"
                    className={({ isActive }) => clsx(styles.linkMenu, { [styles.active]: isActive })}
                >
                    <FontAwesomeIcon icon={faList} />
                    <span className={clsx(styles.titleMenu)}>Hãng</span>
                </NavLink>
                <NavLink
                    to="/Admin/Bills"
                    className={({ isActive }) => clsx(styles.linkMenu, { [styles.active]: isActive })}
                >
                    <FontAwesomeIcon icon={faSackDollar} />
                    <span className={clsx(styles.titleMenu)}>Hóa Đơn</span>
                </NavLink>
            </div>
        </div>
    );
}

export default Siderbar;
