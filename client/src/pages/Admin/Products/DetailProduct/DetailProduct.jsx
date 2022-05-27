import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import clsx from 'clsx';
import styles from './DetailProduct.module.scss';
import Sliders from '~/components/Sliders/Slider/Slider';

function DetailProduct() {
    let { id } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const { products } = useSelector((state) => state.product);
    useEffect(() => {
        const getProduct = products.find((product) => product._id === id);
        if (getProduct !== undefined) {
            const mapCategories = getProduct.Category_ID.map((category) => ({
                value: category._id,
                label: category.Name,
            }));

            const detailProduct = { ...getProduct, Category_ID: mapCategories };
            setProductDetail(detailProduct);
        }
    }, [products]);
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.images)}>
                <Sliders data={productDetail.Image || []} />
                <div className={clsx(styles.action)}>
                    <Link to={`/Admin/EditProduct/${productDetail._id}`} className={clsx(styles.btn)}>
                        Edit
                    </Link>
                </div>
            </div>
            <div className={clsx(styles.content)}>
                <h1>Giới Thiệu Sản Phẩm</h1>
                <h2>{productDetail.Name}</h2>
                <div>
                    <span className={clsx(styles.titlePrice)}>Giá: </span>
                    {productDetail.Sale === 0 ? (
                        <span className={clsx(styles.price)}>
                            {new Intl.NumberFormat('de-DE').format(productDetail.Price)} VNĐ
                        </span>
                    ) : (
                        <>
                            <span className={clsx(styles.sale)}>
                                {new Intl.NumberFormat('de-DE').format(productDetail.Sale)} VNĐ
                            </span>
                            <span className={clsx(styles.salePrice)}>
                                {new Intl.NumberFormat('de-DE').format(productDetail.Price)} VNĐ
                            </span>
                        </>
                    )}
                </div>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.Description) }} />
            </div>
        </div>
    );
}

export default DetailProduct;
