import React from 'react';
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
                <SliderCard slideShow={5} slideScroll={5} />
            </div>
            <div className={clsx(styles.sellProducts)}>
                <div className={clsx(styles.header)}>
                    <h1 className={clsx(styles.title)}>Sản Phẩm Mới</h1>
                    <Link to="/" className={clsx(styles.showAll)}>
                        <span className={clsx(styles.textShowAll)}>Xem tất cả</span>
                        <FontAwesomeIcon icon={faAngleRight} className={clsx(styles.arrowShowAll)} />
                    </Link>
                </div>
                <SliderCard slideShow={5} slideScroll={5} />
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
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((product, index) => (
                        <div key={index}>
                            <CardProduct boxShadow />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
