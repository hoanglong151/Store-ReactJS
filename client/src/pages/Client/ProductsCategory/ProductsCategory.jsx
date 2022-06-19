import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
import SidebarFirm from '~/components/SidebarFirm';
import { useSortProductByTitle } from '~/hooks';
import styles from './ProductsCategory.module.scss';

function ProductsCategory() {
    const [products, setProducts] = useState([]);
    const [getFirms, setGetFirms] = useState([]);
    const { product, category, firm } = useSelector((state) => state);
    const { state } = useLocation();
    const { cateID, select } = state;
    const productSortByTitle = useSortProductByTitle(products, select);

    useEffect(() => {
        const getCategory = category.categories.find((selector) => selector._id === cateID);
        const getFirmsID = getCategory.Products.reduce((pre, next) => {
            return pre.indexOf(next.Firm_ID) === -1 ? [...pre, next.Firm_ID] : pre;
        }, []);
        const getFirms = firm.firms.filter((firm, index) => {
            return getFirmsID.includes(firm._id);
        });
        setGetFirms(getFirms);
        setProducts(getCategory.Products);
    }, [cateID]);

    return (
        <div className={clsx(styles.wrapper)}>
            <h1 className={clsx(styles.heading)}>Danh Sách Sản Phẩm</h1>
            {getFirms.map((firm) => (
                <SidebarFirm name={firm.Name} firmID={firm._id} cateID={cateID} select={select} />
            ))}

            <div className={clsx(styles.products)}>
                {productSortByTitle.map((product) => (
                    <CardProduct key={product._id} boxShadow product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductsCategory;
