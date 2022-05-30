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
    const [typeSelect, setTypeSelect] = useState({});
    const { products } = useSelector((state) => state.product);
    useEffect(() => {
        const getProduct = products.find((product) => product._id === id);
        if (getProduct !== undefined) {
            const mapCategories = getProduct.Category_ID.map((category) => ({
                value: category._id,
                label: category.Name,
            }));

            const getTypeCheap = getProduct.TypesProduct.reduce((pre, next) => {
                if (pre.sale !== 0 && next.sale !== 0) {
                    return pre.sale < next.sale ? pre : next;
                } else if (pre.sale !== 0 && next.sale === 0) {
                    return pre.sale < next.price ? pre : next;
                } else if (pre.sale === 0 && next.sale !== 0) {
                    return pre.price < next.sale ? pre : next;
                } else {
                    return pre.price < next.price ? pre : next;
                }
            });

            setTypeSelect(getTypeCheap);

            const detailProduct = { ...getProduct, Category_ID: mapCategories };
            setProductDetail(detailProduct);
        }
    }, [products]);

    const handleSelectType = (type) => {
        setTypeSelect(type);
    };
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
                <h2>
                    {productDetail.Name}
                    <span className={clsx(styles.showDescription)}>{`(${typeSelect.description})`}</span>
                </h2>
                <div className={clsx(styles.priceInfo)}>
                    <span className={clsx(styles.titlePrice)}>Giá: </span>
                    {typeSelect.sale === 0 ? (
                        <span className={clsx(styles.price)}>
                            {new Intl.NumberFormat('de-DE').format(typeSelect.price)} VNĐ
                        </span>
                    ) : (
                        <>
                            <span className={clsx(styles.sale)}>
                                {new Intl.NumberFormat('de-DE').format(typeSelect.sale)} VNĐ
                            </span>
                            <span className={clsx(styles.salePrice)}>
                                {new Intl.NumberFormat('de-DE').format(typeSelect.price)} VNĐ
                            </span>
                        </>
                    )}
                </div>
                <div className={clsx(styles.wrapperType)}>
                    <div>
                        {productDetail.TypesProduct ? (
                            productDetail.TypesProduct.map((type, index) => (
                                <div
                                    key={index}
                                    className={clsx(styles.item, {
                                        [styles.active]: type.description === typeSelect.description,
                                    })}
                                    onClick={() => handleSelectType(type)}
                                >
                                    <p className={clsx(styles.typeDescription)}>{type.description}</p>
                                    <p className={clsx(styles.typePrice)}>
                                        {type.sale !== 0 ? new Intl.NumberFormat().format(type.sale) : type.price} VNĐ
                                    </p>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.Description) }} />
            </div>
        </div>
    );
}

export default DetailProduct;
