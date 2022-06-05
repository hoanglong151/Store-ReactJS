import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faChartArea,
    faChartPie,
    faChevronDown,
    faChevronUp,
    faList,
    faMobileButton,
    faSackDollar,
} from '@fortawesome/free-solid-svg-icons';
import { faSalesforce } from '@fortawesome/free-brands-svg-icons';

function Siderbar(props) {
    const { onClick, toggleMenu } = props;
    const [toggleMenuArea, setToggleMenuArea] = useState(false);

    const handleCloseMenuArea = () => {
        setToggleMenuArea(!toggleMenuArea);
    };

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
                <NavLink
                    to="/Admin/SaleCodes"
                    className={({ isActive }) => clsx(styles.linkMenu, { [styles.active]: isActive })}
                >
                    <FontAwesomeIcon icon={faSalesforce} />
                    <span className={clsx(styles.titleMenu)}>Mã Khuyến Mãi</span>
                </NavLink>
                <div className={clsx(styles.linkMenu)} onClick={handleCloseMenuArea}>
                    <div className={clsx(styles.areaText)}>
                        <FontAwesomeIcon icon={faChartArea} />
                        <span className={clsx(styles.titleMenu, styles.areaTitle)}>Khu vực</span>
                        {toggleMenuArea ? (
                            <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                            <FontAwesomeIcon icon={faChevronDown} />
                        )}
                    </div>

                    <ul className={clsx(styles.areaMenu, { [styles.areaMenuActive]: toggleMenuArea })}>
                        <li>
                            <NavLink to="/Admin/Areas" className={clsx(styles.linkArea)}>
                                Vùng miền
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Admin/Provinces" className={clsx(styles.linkArea)}>
                                Tỉnh/Thành
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Admin/Districts" className={clsx(styles.linkArea)}>
                                Quận/Huyện
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Admin/AddressStores" className={clsx(styles.linkArea)}>
                                Danh Sách Cửa Hàng
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Siderbar;
