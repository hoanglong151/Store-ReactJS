import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './MenuLeft.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MenuLeft() {
    const [getFirms, setGetFirms] = useState([]);
    const categories = useSelector((state) => state.category.categories);
    const firms = useSelector((state) => state.firm.firms);

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
            <ul className={clsx(styles.menu)}>
                {categories.map((category, index) => (
                    <li className={clsx(styles.item)} key={category._id}>
                        <Link
                            to={`/category/${category._id}`}
                            className={clsx(styles.link)}
                            onMouseEnter={() => handleGetCategory(category)}
                        >
                            <img className={clsx(styles.image)} src={category.Image} />
                            <span className={clsx(styles.name)}>{category.Name}</span>
                        </Link>

                        <ul className={clsx(styles.subMenu)}>
                            {getFirms.map((firm, index) => (
                                <li key={firm._id} className={clsx(styles.subMenuItem)}>
                                    <Link to={`/firm/${category._id}/${firm._id}`} className={clsx(styles.subMenuName)}>
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
