import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import { faCartShopping, faChevronRight, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchProduct from '~/components/Search';

const cx = classnames.bind(styles);

function Header(props) {
    const { openButtonCategory } = props;
    const [firmByProduct, setFirmByProduct] = useState([]);
    const state = useSelector((state) => state);
    const { cart, category, firm, typeProduct } = state;
    const { categories } = category;
    const { firms } = firm;
    const { cartProducts } = cart;
    const { typeProducts } = typeProduct;

    const handleGetCategory = (category) => {
        const getFirmsID = typeProducts.map((type) => {
            if (type.Category_ID.includes(category._id)) {
                return type.Firm_ID;
            }
        });
        const getFirms = firms.filter((firm, index) => {
            return getFirmsID.includes(firm._id);
        });
        setFirmByProduct(getFirms);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Link to="/" className={cx('img-home')}>
                    <img
                        className={cx('image')}
                        src="https://freepngimg.com/thumb/mustang/23061-5-mustang-logo-transparent-image.png"
                    />
                </Link>
                {openButtonCategory && (
                    <div className={cx('button-category')}>
                        {/* PC */}
                        <span className={cx('category-title-pc')}>Danh mục sản phẩm</span>
                        {/* Tablet */}
                        <span className={cx('category-title-tablet')}>Danh mục</span>
                        <div className={cx('menu')}>
                            <ul className={cx('categories')}>
                                {categories.map((category, index) => (
                                    <li className={cx('item-category')} key={category._id}>
                                        <Link
                                            to={`/category`}
                                            state={{ cateID: category._id }}
                                            className={cx('item-link')}
                                            onMouseEnter={() => handleGetCategory(category)}
                                        >
                                            <img className={cx('item-image')} src={category.Image} />
                                            <p className={cx('item-name')}>{category.Name}</p>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </Link>

                                        {/* Sub Menu */}
                                        <ul className={cx('sub-menu')}>
                                            {firmByProduct.map((firm, index) => (
                                                <li key={firm._id} className={cx('sub-menu-item')}>
                                                    <Link
                                                        to={`/firm`}
                                                        state={{ cateID: category._id, firmID: firm._id }}
                                                        className={cx('sub-menu-name')}
                                                    >
                                                        {firm.Name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <SearchProduct />
                <div className={cx('other')}>
                    <Link to="/findBill" className={cx('truck')}>
                        <FontAwesomeIcon className={cx('icon-mobile')} icon={faTruckFast} />
                        <p className={cx('title-other')}>Tra cứu đơn hàng</p>
                    </Link>
                    <Link to="/cart" className={cx('cart')}>
                        <FontAwesomeIcon className={cx('icon-mobile')} icon={faCartShopping} />
                        <span className={cx('number-cart')}>
                            {cartProducts?.length !== 0 ? cartProducts?.length : ''}
                        </span>
                        <p className={cx('title-other')}>Giỏ hàng</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    openButtonCategory: PropTypes.bool,
};

export default Header;
