import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './MenuLeft.module.scss';
import { Link } from 'react-router-dom';
import { categoriesApi, firmsApi } from '~/api';

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
        <div className={clsx(styles.wrapper)}>
            <ul className={clsx(styles.menu)}>
                {categories.map((category, index) => (
                    <li className={clsx(styles.item)} key={category._id}>
                        <Link
                            to={`/category`}
                            state={{ cateID: category._id }}
                            className={clsx(styles.link)}
                            onMouseEnter={() => handleGetCategory(category)}
                        >
                            <img className={clsx(styles.image)} src={category.Image} />
                            <span className={clsx(styles.name)}>{category.Name}</span>
                        </Link>

                        <ul className={clsx(styles.subMenu)}>
                            {firmByProduct.map((firm, index) => (
                                <li key={firm._id} className={clsx(styles.subMenuItem)}>
                                    <Link
                                        to={`/firm`}
                                        state={{ cateID: category._id, firmID: firm._id }}
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
    );
}

export default MenuLeft;
