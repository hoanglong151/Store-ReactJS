import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faChartArea,
    faChartPie,
    faChevronDown,
    faChevronUp,
    faCity,
    faEarthAfrica,
    faList,
    faLocationPin,
    faMobileButton,
    faNetworkWired,
    faSackDollar,
    faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { faSalesforce } from '@fortawesome/free-brands-svg-icons';

function Siderbar(props) {
    const { onClick, toggleMenu } = props;
    const [toggleMenuArea, setToggleMenuArea] = useState(false);
    const { state } = useLocation();

    useEffect(() => {
        state?.openSubMenu ? setToggleMenuArea(true) : setToggleMenuArea(false);
    }, [state]);

    const handleToggleMenuArea = () => {
        setToggleMenuArea(!toggleMenuArea);
    };

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={styles.toggleMenu} onClick={onClick}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={clsx(styles.menu, { [styles.mobile]: toggleMenu })}>
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
                <NavLink
                    to="/Admin/BillStatus"
                    className={({ isActive }) => clsx(styles.linkMenu, { [styles.active]: isActive })}
                >
                    <FontAwesomeIcon icon={faTruck} />
                    <span className={clsx(styles.titleMenu)}>Tình Trạng ĐH</span>
                </NavLink>
                <div className={clsx(styles.subMenu)} onClick={handleToggleMenuArea}>
                    <div className={clsx(styles.areaText, { [styles.openMenu]: toggleMenuArea })}>
                        <FontAwesomeIcon icon={faChartArea} />
                        <span className={clsx(styles.titleMenu, styles.areaTitle)}>Khu vực</span>
                        {toggleMenuArea ? (
                            <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                            <FontAwesomeIcon icon={faChevronDown} />
                        )}
                    </div>

                    <ul
                        className={clsx(styles.areaMenu, {
                            [styles.areaMenuActive]: toggleMenuArea,
                        })}
                    >
                        <li>
                            <NavLink
                                to="/Admin/Areas"
                                state={{ openSubMenu: true }}
                                className={({ isActive }) => clsx(styles.linkArea, { [styles.active]: isActive })}
                            >
                                <FontAwesomeIcon icon={faEarthAfrica} />
                                <span className={clsx(styles.titleMenu, styles.areaTitle)}>Vùng miền</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Admin/Provinces"
                                state={{ openSubMenu: true }}
                                className={({ isActive }) => clsx(styles.linkArea, { [styles.active]: isActive })}
                            >
                                <FontAwesomeIcon icon={faCity} />
                                <span className={clsx(styles.titleMenu, styles.areaTitle)}>Tỉnh/Thành</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Admin/Districts"
                                state={{ openSubMenu: true }}
                                className={({ isActive }) => clsx(styles.linkArea, { [styles.active]: isActive })}
                            >
                                <FontAwesomeIcon icon={faNetworkWired} />
                                <span className={clsx(styles.titleMenu, styles.areaTitle)}>Quận/Huyện</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Admin/AddressStores"
                                state={{ openSubMenu: true }}
                                className={({ isActive }) => clsx(styles.linkArea, { [styles.active]: isActive })}
                            >
                                <FontAwesomeIcon icon={faLocationPin} />
                                <span className={clsx(styles.titleMenu, styles.areaTitle)}> Danh Sách Cửa Hàng</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Siderbar;
