import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './ProductsCategoryFirm.module.scss';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
import { useSortProductByTitle } from '~/hooks';

function ProductsCategoryFirm() {
    const { state } = useLocation();
    const { cateID, firmID, select } = state;
    const [products, setProducts] = useState([]);
    const { product, category, firm } = useSelector((state) => state);
    const productSortByTitle = useSortProductByTitle(products, select);

    console.log(productSortByTitle);

    useEffect(() => {
        if (cateID) {
            const getCategory = category.categories.find((selector) => selector._id === cateID);
            const getProducts = getCategory.Products.filter((product, index) => {
                return product.Firm_ID === firmID;
            });
            console.log('CateID: ', getProducts);
            setProducts(getProducts);
        } else {
            const getFirm = firm.firms.find((selector) => selector._id === firmID);
            console.log(getFirm);
            const getProducts = getFirm.Products.filter((product, index) => {
                return product.Firm_ID === firmID;
            });
            console.log('None CateID: ', getProducts);

            setProducts(getProducts);
        }
    }, [firmID]);

    return (
        <div className={clsx(styles.wrapper)}>
            <h1 className={clsx(styles.heading)}>Danh Sách Sản Phẩm</h1>
            <div className={clsx(styles.products)}>
                {productSortByTitle.map((product, index) => (
                    <CardProduct key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductsCategoryFirm;
