import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import SliderCard from '~/components/Sliders/SliderCard/SliderCard.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';
import { useSortProductByTitle } from '~/hooks';
import SidebarCategory from '~/components/SidebarCategory';
import { productsApi, categoriesApi } from '~/api';

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const productCheap = useSortProductByTitle(products, 'CHEAP');
    const productHot = useSortProductByTitle(products, 'HOT');
    const productNew = useSortProductByTitle(products, 'NEW');

    const getProducts = async () => {
        const result = await productsApi.getAll();
        setProducts(result.products);
    };

    const getCategories = async () => {
        const result = await categoriesApi.getAll();
        setCategories(result.categories);
    };

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.newProducts)}>
                <div className={clsx(styles.header)}>
                    <h1 className={clsx(styles.title)}>Sản Phẩm Bán Chạy</h1>
                    <Link
                        to="/products"
                        state={{ products: productHot, select: 'HOT', productsDefault: products }}
                        className={clsx(styles.showAll)}
                    >
                        <span className={clsx(styles.textShowAll)}>Xem tất cả</span>
                        <FontAwesomeIcon icon={faAngleRight} className={clsx(styles.arrowShowAll)} />
                    </Link>
                </div>
                <div className={clsx(styles.sidebarCategories)}>
                    {categories.length !== 0 &&
                        categories.map((cate) => (
                            <SidebarCategory key={cate._id} name={cate.Name} link={cate._id} select="HOT" />
                        ))}
                </div>
                <SliderCard slideShow={5} slideScroll={5} product={productHot} />
            </div>
            <div className={clsx(styles.sellProducts)}>
                <div className={clsx(styles.header)}>
                    <h1 className={clsx(styles.title)}>Sản Phẩm Mới</h1>
                    <Link
                        to="/products"
                        state={{ products: productNew, select: 'NEW', productsDefault: products }}
                        className={clsx(styles.showAll)}
                    >
                        <span className={clsx(styles.textShowAll)}>Xem tất cả</span>
                        <FontAwesomeIcon icon={faAngleRight} className={clsx(styles.arrowShowAll)} />
                    </Link>
                </div>
                <div className={clsx(styles.sidebarCategories)}>
                    {categories.length !== 0 &&
                        categories.map((cate) => (
                            <SidebarCategory key={cate._id} name={cate.Name} link={cate._id} select="NEW" />
                        ))}
                </div>
                <SliderCard slideShow={5} slideScroll={5} product={productNew} />
            </div>
            <div className={clsx(styles.products)}>
                <div className={clsx(styles.header)}>
                    <h1 className={clsx(styles.title, styles.yourSelf)}>Sản Phẩm Dành Cho Bạn</h1>
                    <Link
                        to="/products"
                        state={{ products: productCheap, select: 'CHEAP', productsDefault: products }}
                        className={clsx(styles.showAll, styles.yourSelf)}
                    >
                        <span className={clsx(styles.textShowAll)}>Xem tất cả</span>
                        <FontAwesomeIcon icon={faAngleRight} className={clsx(styles.arrowShowAll)} />
                    </Link>
                </div>
                <div className={clsx(styles.sidebarCategories)}>
                    {categories.length !== 0 &&
                        categories.map((cate) => (
                            <SidebarCategory
                                key={cate._id}
                                name={cate.Name}
                                link={cate._id}
                                className="itemCate"
                                select="CHEAP"
                            />
                        ))}
                </div>
                <div className={clsx(styles.wrapProducts)}>
                    {productCheap.length > 0 &&
                        productCheap
                            .map((product, index) => <CardProduct key={index} boxShadow product={product} />)
                            .slice(0, 20)}
                </div>
            </div>
        </div>
    );
}

export default Home;
