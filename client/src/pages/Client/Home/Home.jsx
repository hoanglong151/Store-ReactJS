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

function Home() {
    const { product, category } = useSelector((state) => state);
    const [productCheap, setProductCheap] = useState([]);
    const [productHot, setProductHot] = useState([]);
    const [productNew, setProductNew] = useState([]);

    useEffect(() => {
        const data = product.products
            .map((product) => {
                const getProductsCheap = product.TypesProduct.reduce((pre, next) => {
                    if (next.Amount > 0) {
                        if (pre.Sale !== 0 && next.Sale !== 0) {
                            return pre.Sale < next.Sale ? pre : next;
                        } else if (pre.Sale !== 0 && next.Sale === 0) {
                            return pre.Sale < next.Price ? pre : next;
                        } else if (pre.Sale === 0 && next.Sale !== 0) {
                            return pre.Price < next.Sale ? pre : next;
                        } else {
                            return pre.Price < next.Price ? pre : next;
                        }
                    }
                    return pre;
                }, {});
                if (Object.keys(getProductsCheap).length !== 0) {
                    return {
                        ...getProductsCheap,
                        Image: product.Image,
                        NameProduct: product.Name,
                    };
                }
            })
            .filter((item) => item !== undefined);
        setProductCheap(data);
    }, [product.products]);

    useEffect(() => {
        let newPro = [];
        let initReduce = { ...product.products[0] };
        product.products.reduce((pre, next) => {
            const formatPreDay = new Intl.DateTimeFormat('en').format(new Date(pre.CreateDate));
            const formatNextDay = new Intl.DateTimeFormat('en').format(new Date(next.CreateDate));
            if (formatPreDay > formatNextDay) {
                newPro = [pre, ...newPro];
                return pre;
            } else {
                newPro = [next, ...newPro];
                return next;
            }
        }, initReduce);

        const data = newPro
            .map((product) => {
                const getProductsCheap = product.TypesProduct.reduce((pre, next) => {
                    if (next.Amount > 0) {
                        if (pre.Sale !== 0 && next.Sale !== 0) {
                            return pre.Sale < next.Sale ? pre : next;
                        } else if (pre.Sale !== 0 && next.Sale === 0) {
                            return pre.Sale < next.Price ? pre : next;
                        } else if (pre.Sale === 0 && next.Sale !== 0) {
                            return pre.Price < next.Sale ? pre : next;
                        } else {
                            return pre.Price < next.Price ? pre : next;
                        }
                    }
                    return pre;
                }, {});
                if (Object.keys(getProductsCheap).length !== 0) {
                    return {
                        ...getProductsCheap,
                        Image: product.Image,
                        NameProduct: product.Name,
                    };
                }
            })
            .filter((item) => item !== undefined);
        setProductNew(data);
    }, [product.products]);

    useEffect(() => {
        const productsHot = product.products.map((product) => {
            const getProductsHot = product.TypesProduct.reduce((pre, next) => {
                if (next.Amount > 0) {
                    return pre.Sold > next.Sold ? pre : next;
                }
                return pre;
            }, {});
            if (Object.keys(getProductsHot).length !== 0) {
                return {
                    ...getProductsHot,
                    Image: product.Image,
                    NameProduct: product.Name,
                };
            }
        });

        const data = productsHot.sort((a, b) => b.Sold - a.Sold).filter((item) => item !== undefined);
        setProductHot(data);
    }, [product.products]);

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.newProducts)}>
                <div className={clsx(styles.header)}>
                    <h1 className={clsx(styles.title)}>Sản Phẩm Bán Chạy</h1>
                    <Link to="/products" state={{ products: productHot }} className={clsx(styles.showAll)}>
                        <span className={clsx(styles.textShowAll)}>Xem tất cả</span>
                        <FontAwesomeIcon icon={faAngleRight} className={clsx(styles.arrowShowAll)} />
                    </Link>
                </div>
                <SliderCard slideShow={5} slideScroll={5} product={productHot} />
            </div>
            <div className={clsx(styles.sellProducts)}>
                <div className={clsx(styles.header)}>
                    <h1 className={clsx(styles.title)}>Sản Phẩm Mới</h1>
                    <Link to="/products" state={{ products: productNew }} className={clsx(styles.showAll)}>
                        <span className={clsx(styles.textShowAll)}>Xem tất cả</span>
                        <FontAwesomeIcon icon={faAngleRight} className={clsx(styles.arrowShowAll)} />
                    </Link>
                </div>
                <SliderCard slideShow={5} slideScroll={5} product={productNew} />
            </div>
            <div className={clsx(styles.products)}>
                <div className={clsx(styles.header)}>
                    <h1 className={clsx(styles.title, styles.yourSelf)}>Sản Phẩm Dành Cho Bạn</h1>
                    <Link
                        to="/products"
                        state={{ products: productCheap }}
                        className={clsx(styles.showAll, styles.yourSelf)}
                    >
                        <span className={clsx(styles.textShowAll)}>Xem tất cả</span>
                        <FontAwesomeIcon icon={faAngleRight} className={clsx(styles.arrowShowAll)} />
                    </Link>
                </div>
                <div className={clsx(styles.wrapProducts)}>
                    {productCheap.map((product, index) => (
                        <CardProduct key={index} boxShadow product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
