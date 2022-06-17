import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import SliderCard from '~/components/Sliders/SliderCard/SliderCard.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import CardProduct from '~/components/Cards/CardProduct/CardProduct';

function Home() {
    const { product, category } = useSelector((state) => state);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.newProducts)}>
                <div className={clsx(styles.header)}>
                    <h1 className={clsx(styles.title)}>Sản Phẩm Bán Chạy</h1>
                    <Link to="/" className={clsx(styles.showAll)}>
                        <span className={clsx(styles.textShowAll)}>Xem tất cả</span>
                        <FontAwesomeIcon icon={faAngleRight} className={clsx(styles.arrowShowAll)} />
                    </Link>
                </div>
                <SliderCard slideShow={5} slideScroll={5} product={product.products} />
            </div>
            <div className={clsx(styles.sellProducts)}>
                <div className={clsx(styles.header)}>
                    <h1 className={clsx(styles.title)}>Sản Phẩm Mới</h1>
                    <Link to="/" className={clsx(styles.showAll)}>
                        <span className={clsx(styles.textShowAll)}>Xem tất cả</span>
                        <FontAwesomeIcon icon={faAngleRight} className={clsx(styles.arrowShowAll)} />
                    </Link>
                </div>
                <SliderCard slideShow={5} slideScroll={5} product={product.products} />
            </div>
            <div className={clsx(styles.products)}>
                <div className={clsx(styles.header)}>
                    <h1 className={clsx(styles.title, styles.yourSelf)}>Sản Phẩm Dành Cho Bạn</h1>
                    <Link to="/" className={clsx(styles.showAll, styles.yourSelf)}>
                        <span className={clsx(styles.textShowAll)}>Xem tất cả</span>
                        <FontAwesomeIcon icon={faAngleRight} className={clsx(styles.arrowShowAll)} />
                    </Link>
                </div>
                <div className={clsx(styles.wrapProducts)}>
                    {product.products.map((product, index) => (
                        <CardProduct key={index} boxShadow product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
