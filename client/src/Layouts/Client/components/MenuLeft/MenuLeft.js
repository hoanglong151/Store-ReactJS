import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './MenuLeft.module.scss';
import { Link } from 'react-router-dom';
import { categoriesApi, firmsApi } from '~/api';

const cx = classnames.bind(styles);

function MenuLeft() {
    const [firmByProduct, setFirmByProduct] = useState([]);
    const [firms, setFirms] = useState([]);
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const result = await categoriesApi.getAll();
        setCategories(result.categories);
    };

    const getFirms = async () => {
        const result = await firmsApi.getAll();
        setFirms(result.firms);
    };

    useEffect(() => {
        getCategories();
        getFirms();
    }, []);

    const handleGetCategory = (category) => {
        const getFirmsID = category.Products.reduce((pre, next) => {
            return pre.indexOf(next.Firm_ID) === -1 ? [...pre, next.Firm_ID] : pre;
        }, []);
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
                            <img className={cx('image')} src={category.Image} />
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
