import React from 'react';
import clsx from 'clsx';
import styles from './MenuLeft.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MenuLeft() {
    const categories = useSelector((state) => state.category.categories);
    return (
        <div className={clsx(styles.wrapper)}>
            <ul className={clsx(styles.menu)}>
                {categories.map((category, index) => (
                    <li className={clsx(styles.item)} key={category._id}>
                        <Link to="/" className={clsx(styles.link)}>
                            <img className={clsx(styles.image)} src={category.Image} />
                            <span className={clsx(styles.name)}>{category.Name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MenuLeft;
