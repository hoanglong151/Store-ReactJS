import React from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Products.module.scss';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
import { useSelector } from 'react-redux';
import SidebarCategory from '~/components/SidebarCategory';
import SidebarFirm from '~/components/SidebarFirm';

function Products() {
    const { state } = useLocation();
    const { products, select } = state;
    const { category, firm } = useSelector((state) => state);
    return (
        <div className={clsx(styles.wrapper)}>
            <h1 className={clsx(styles.heading)}>Danh Sách Sản Phẩm</h1>
            <div>
                <h3 className={clsx(styles.title)}>Danh Mục</h3>
                {category.categories.map((cate) => (
                    <SidebarCategory key={cate._id} name={cate.Name} link={cate._id} select={select} />
                ))}
            </div>
            <div>
                <h3 className={clsx(styles.title)}>Hãng</h3>
                {firm.firms.map((firm) => (
                    <SidebarFirm key={firm._id} name={firm.Name} select={select} firmID={firm._id} />
                ))}
            </div>
            <div className={clsx(styles.products)}>
                {products.map((product) => (
                    <CardProduct key={product._id} boxShadow product={product} />
                ))}
            </div>
        </div>
    );
}

export default Products;
