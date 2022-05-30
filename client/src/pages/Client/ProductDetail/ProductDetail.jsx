import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import styles from './ProductDetail.module.scss';
import Sliders from '~/components/Sliders/Slider/Slider';
import DOMPurify from 'dompurify';
import { addProductToCart } from '~/app/reducerCart';

function ProductDetail() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [productDetail, setProductDetail] = useState({});
    const [typeSelect, setTypeSelect] = useState({});
    const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();

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

            const detailProduct = { ...getProduct, Category_ID: mapCategories };
            setTypeSelect(getTypeCheap);
            setProductDetail(detailProduct);
        }
    }, [products]);

    const handleSelectType = (type) => {
        setTypeSelect(type);
    };

    const handleAddToCart = (product) => {
        dispatch(addProductToCart({ product, typeSelect: typeSelect }));
        navigate('/cart');
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.images)}>
                <Sliders data={productDetail.Image || []} />
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
                <button onClick={() => handleAddToCart(productDetail)} className={clsx(styles.btn)}>
                    <h3 className={clsx(styles.addCart)}>Mua Ngay</h3>
                    <p className={clsx(styles.methodPayment)}>(Giao tận nơi hoặc lấy tại cửa hàng)</p>
                </button>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.Description) }} />
            </div>
        </div>
    );
}

export default ProductDetail;
