import React, { useState } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import { faCartShopping, faChevronRight, faMagnifyingGlass, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header(props) {
    const { openButtonCategory } = props;
    const [getFirms, setGetFirms] = useState([]);
    const categories = useSelector((state) => state.category.categories);
    const firms = useSelector((state) => state.firm.firms);
    const carts = useSelector((state) => state.cart.cartProducts);

    const handleGetCategory = (category) => {
        const getFirmsID = category.Products.reduce((pre, next) => {
            return pre.indexOf(next.Firm_ID) === -1 ? [...pre, next.Firm_ID] : pre;
        }, []);
        const getFirms = firms.filter((firm, index) => {
            return getFirmsID.includes(firm._id);
        });
        setGetFirms(getFirms);
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.header)}>
                <Link to="/">
                    <img
                        className={clsx(styles.image)}
                        src="https://freepngimg.com/thumb/mustang/23061-5-mustang-logo-transparent-image.png"
                    />
                </Link>
                {openButtonCategory && (
                    <div className={clsx(styles.buttonCategory)}>
                        <span>Danh mục sản phẩm</span>
                        <div className={clsx(styles.menu)}>
                            <ul className={clsx(styles.categories)}>
                                {categories.map((category, index) => (
                                    <li className={clsx(styles.itemCategory)} key={category._id}>
                                        <Link
                                            to={`/category/${category._id}`}
                                            className={clsx(styles.itemLink)}
                                            onMouseEnter={() => handleGetCategory(category)}
                                        >
                                            <img className={clsx(styles.itemImage)} src={category.Image} />
                                            <p className={clsx(styles.itemName)}>{category.Name}</p>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </Link>

                                        {/* Sub Menu */}
                                        <ul className={clsx(styles.subMenu)}>
                                            {getFirms.map((firm, index) => (
                                                <li key={firm._id} className={clsx(styles.subMenuItem)}>
                                                    <Link
                                                        to={`/firm/${category._id}/${firm._id}`}
                                                        className={clsx(styles.subMenuName)}
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

                <div className={clsx(styles.search)}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input className={clsx(styles.inputSearch)} placeholder="Bạn cần tìm gì ?" />
                </div>
                <div className={clsx(styles.other)}>
                    <Link to="/" className={clsx(styles.truck)}>
                        <FontAwesomeIcon icon={faTruckFast} />
                        <p className={clsx(styles.titleOther)}>Tra cứu đơn hàng</p>
                    </Link>
                    <Link to="/cart" className={clsx(styles.cart)}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span className={clsx(styles.numberCart)}>{carts?.length !== 0 ? carts?.length : ''}</span>
                        <p className={clsx(styles.titleOther)}>Giỏ hàng</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
