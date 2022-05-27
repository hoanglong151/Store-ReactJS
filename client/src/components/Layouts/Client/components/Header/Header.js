import React from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import { faCartShopping, faChevronRight, faMagnifyingGlass, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header(props) {
    const { openButtonCategory, openMenuCategory } = props;
    const categories = useSelector((state) => state.category.categories);
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
                                        <Link to="/" className={clsx(styles.itemLink)}>
                                            <img className={clsx(styles.itemImage)} src={category.Image} />
                                            <p className={clsx(styles.itemName)}>{category.Name}</p>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </Link>

                                        {/* Sub Menu */}
                                        <ul className={clsx(styles.subMenu)}>
                                            <li className={clsx(styles.subMenuItem)}>
                                                <Link to="/" className={clsx(styles.subMenuName)}>
                                                    Apple
                                                </Link>
                                            </li>
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
                    <div className={clsx(styles.truck)}>
                        <FontAwesomeIcon icon={faTruckFast} />
                        <p className={clsx(styles.titleOther)}>Tra cứu đơn hàng</p>
                    </div>
                    <div className={clsx(styles.cart)}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <p className={clsx(styles.titleOther)}>Giỏ hàng</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
