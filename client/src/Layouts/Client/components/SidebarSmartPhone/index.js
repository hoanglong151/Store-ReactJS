import React, { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './SidebarSmartPhone.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);
function SidebarSmartPhone() {
    const [firmByProduct, setFirmByProduct] = useState([]);
    const state = useSelector((state) => state);
    const { category, firm, typeProduct } = state;
    const { categories } = category;
    const { firms } = firm;
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
            <ul className={cx('sidebar')}>
                {categories.map((category, index) => (
                    <li className={cx('item')} key={category._id}>
                        <button className={cx('link')} onClick={() => handleGetCategory(category)}>
                            <img className={cx('image')} src={category.Image} />
                            <span className={cx('name')}>{category.Name}</span>
                        </button>

                        <ul className={cx('sub-menu')}>
                            {firmByProduct.map((firm, index) => (
                                <li key={firm._id}>
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
    );
}

export default SidebarSmartPhone;
