import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
import styles from './ProductsCategory.module.scss';

function ProductsCategory() {
    const [products, setProducts] = useState([]);
    const { product, category } = useSelector((state) => state);
    const { cateID } = useParams();

    useEffect(() => {
        const getCategory = category.categories.find((selector) => selector._id === cateID);
        setProducts(getCategory.Products);
    }, [cateID]);

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

export default ProductsCategory;
