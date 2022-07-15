import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faChartArea,
    faChartLine,
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
import { useSelector } from 'react-redux';

const cx = classnames.bind(styles);
function Siderbar(props) {
    const { onClick, toggleMenu } = props;
    const [toggleMenuArea, setToggleMenuArea] = useState(false);
    const { state } = useLocation();
    const { detailBills } = useSelector((state) => state.detailBill);

    const countBillPending = useMemo(() => {
        const result = detailBills.find((status) => status.status === 'Chờ xử lý');
        return result?.billByStatus.length;
    }, [detailBills]);

    useEffect(() => {
        state?.openSubMenu ? setToggleMenuArea(true) : setToggleMenuArea(false);
    }, [state]);

    const handleToggleMenuArea = () => {
        setToggleMenuArea(!toggleMenuArea);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('toggle-menu')} onClick={onClick}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={cx('menu', { ['mobile']: toggleMenu })}>
                <NavLink end to="/Admin" className={({ isActive }) => cx('link-menu', { ['active']: isActive })}>
                    <FontAwesomeIcon icon={faChartLine} />
                    <span className={cx('title-menu')}>Dashboard</span>
                </NavLink>
                <NavLink to="/Admin/Products" className={({ isActive }) => cx('link-menu', { ['active']: isActive })}>
                    <FontAwesomeIcon icon={faMobileButton} />
                    <span className={cx('title-menu')}>Sản Phẩm</span>
                </NavLink>
                <NavLink to="/Admin/Categories" className={({ isActive }) => cx('link-menu', { ['active']: isActive })}>
                    <FontAwesomeIcon icon={faChartPie} />
                    <span className={cx('title-menu')}>Danh Mục</span>
                </NavLink>
                <NavLink to="/Admin/Firms" className={({ isActive }) => cx('link-menu', { ['active']: isActive })}>
                    <FontAwesomeIcon icon={faList} />
                    <span className={cx('title-menu')}>Hãng</span>
                </NavLink>
                <NavLink
                    to="/Admin/Bills"
                    className={({ isActive }) => cx('link-menu', 'd-flex', { ['active']: isActive })}
                >
                    <FontAwesomeIcon icon={faSackDollar} />
                    <span className={cx('title-menu')}>Hóa Đơn</span>
                    <span className={cx('count-bill-pending')}>{countBillPending}</span>
                </NavLink>
                <NavLink to="/Admin/SaleCodes" className={({ isActive }) => cx('link-menu', { ['active']: isActive })}>
                    <FontAwesomeIcon icon={faSalesforce} />
                    <span className={cx('title-menu')}>Mã Khuyến Mãi</span>
                </NavLink>
                <NavLink to="/Admin/BillStatus" className={({ isActive }) => cx('link-menu', { ['active']: isActive })}>
                    <FontAwesomeIcon icon={faTruck} />
                    <span className={cx('title-menu')}>Tình Trạng ĐH</span>
                </NavLink>
                <div className={cx('sub-menu')} onClick={handleToggleMenuArea}>
                    <div className={cx('area-text', { ['open-menu']: toggleMenuArea })}>
                        <FontAwesomeIcon icon={faChartArea} />
                        <span className={cx('title-menu', 'area-title')}>Khu vực</span>
                        {toggleMenuArea ? (
                            <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                            <FontAwesomeIcon icon={faChevronDown} />
                        )}
                    </div>

                    <ul
                        className={cx('area-menu', {
                            ['area-menu-active']: toggleMenuArea,
                        })}
                    >
                        <li>
                            <NavLink
                                to="/Admin/Areas"
                                state={{ openSubMenu: true }}
                                className={({ isActive }) => cx('link-area', { ['active']: isActive })}
                            >
                                <FontAwesomeIcon icon={faEarthAfrica} />
                                <span className={cx('title-menu', 'area-title')}>Vùng miền</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Admin/Provinces"
                                state={{ openSubMenu: true }}
                                className={({ isActive }) => cx('link-area', { ['active']: isActive })}
                            >
                                <FontAwesomeIcon icon={faCity} />
                                <span className={cx('title-menu', 'area-title')}>Tỉnh/Thành</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Admin/Districts"
                                state={{ openSubMenu: true }}
                                className={({ isActive }) => cx('link-area', { ['active']: isActive })}
                            >
                                <FontAwesomeIcon icon={faNetworkWired} />
                                <span className={cx('title-menu', 'area-title')}>Quận/Huyện</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Admin/AddressStores"
                                state={{ openSubMenu: true }}
                                className={({ isActive }) => cx('link-area', { ['active']: isActive })}
                            >
                                <FontAwesomeIcon icon={faLocationPin} />
                                <span className={cx('title-menu', 'area-title')}> Danh Sách Cửa Hàng</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

Siderbar.propTypes = {
    onClick: PropTypes.func,
    toggleMenu: PropTypes.bool,
};

export default Siderbar;
