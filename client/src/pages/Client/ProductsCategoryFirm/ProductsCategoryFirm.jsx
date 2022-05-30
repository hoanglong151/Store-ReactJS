import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import styles from './ProductsCategoryFirm.module.scss';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';

function ProductsCategoryFirm() {
    const { cateID, firmID } = useParams();
    const [products, setProducts] = useState([]);
    const { product, category } = useSelector((state) => state);
    useEffect(() => {
        const getCategory = category.categories.find((selector) => selector._id === cateID);
        // console.log(getCategory);
        const getProducts = getCategory.Products.filter((product, index) => {
            return product.Firm_ID === firmID;
        });
        setProducts(getProducts);
    }, [firmID]);
    return (
        <div className={clsx(styles.wrapper)}>
            <h1 className={clsx(styles.heading)}>Danh Sách Sản Phẩm</h1>
            <div className={clsx(styles.products)}>
                {products.map((product, index) => (
                    <CardProduct key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductsCategoryFirm;
