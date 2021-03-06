import React, { useState } from 'react';
import classnames from 'classnames/bind';
import styles from './MenuLeft.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classnames.bind(styles);

function MenuLeft() {
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
            <ul className={cx('menu')}>
                {categories.map((category, index) => (
                    <li className={cx('item')} key={category._id}>
                        <Link
                            to={`/category`}
                            state={{ cateID: category._id }}
                            className={cx('link')}
                            onMouseEnter={() => handleGetCategory(category)}
                        >
                            <img alt={'Danh Mục Sản Phẩm'} className={cx('image')} src={category.Image} />
                            <span className={cx('name')}>{category.Name}</span>
                        </Link>

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

export default MenuLeft;
