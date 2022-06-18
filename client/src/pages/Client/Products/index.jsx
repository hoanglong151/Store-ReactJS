import React from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Products.module.scss';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';

function Products() {
    const { state } = useLocation();
    const { products } = state;
    return (
        <div className={clsx(styles.wrapper)}>
            <h1 className={clsx(styles.heading)}>Danh Sách Sản Phẩm</h1>
            <div className={clsx(styles.products)}>
                {products.map((product) => (
                    <CardProduct key={product._id} boxShadow product={product} />
                ))}
            </div>
        </div>
    );
}

export default Products;
