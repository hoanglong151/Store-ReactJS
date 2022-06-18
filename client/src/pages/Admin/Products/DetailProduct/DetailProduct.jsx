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
    const [typeByColor, setTypeByColor] = useState({});
    const [typeSelect, setTypeSelect] = useState({});
    const [filterType, setFilterType] = useState([]);
    const { products } = useSelector((state) => state.product);
    useEffect(() => {
        const getProduct = products.find((product) => product._id === id);
        if (getProduct !== undefined) {
            const mapCategories = getProduct.Category_ID.map((category) => ({
                value: category._id,
                label: category.Name,
            }));

            const getTypeCheap = getProduct.TypesProduct.reduce((pre, next) => {
                if (pre.Sale !== 0 && next.Sale !== 0) {
                    return pre.Sale < next.Sale ? pre : next;
                } else if (pre.Sale !== 0 && next.Sale === 0) {
                    return pre.Sale < next.Price ? pre : next;
                } else if (pre.Sale === 0 && next.Sale !== 0) {
                    return pre.Price < next.Sale ? pre : next;
                } else {
                    return pre.Price < next.Price ? pre : next;
                }
            });

            setTypeSelect(getTypeCheap);

            const detailProduct = { ...getProduct, Category_ID: mapCategories };
            setProductDetail(detailProduct);
        }
    }, [products]);

    const handleSelectTypeByColor = (type) => {
        setTypeByColor(type);
        setTypeSelect(type.type[0]);
    };

    const handleSelectType = (type) => {
        setTypeSelect(type);
    };

    useEffect(() => {
        if (productDetail.TypesProduct) {
            const result = productDetail.TypesProduct.reduce((pre, next, i) => {
                if (pre.length !== 0) {
                    const getTypeByColor = pre.find((item) => item.Color === next.Color);
                    const getTypeByColorIndex = pre.findIndex((item) => item.Color === next.Color);
                    if (getTypeByColor) {
                        getTypeByColor.type.map((typeByColor) => {
                            if (typeByColor.Name === next.Name) {
                                return typeByColor;
                            } else {
                                pre[getTypeByColorIndex] = {
                                    ...pre[getTypeByColorIndex],
                                    type: [
                                        ...pre[getTypeByColorIndex].type,
                                        {
                                            _id: next._id,
                                            Name: next.Name,
                                            Price: next.Price,
                                            Sale: next.Sale,
                                            Amount: next.Amount,
                                            Sold: next.Sold,
                                        },
                                    ],
                                };
                                return pre;
                            }
                        });
                    } else {
                        pre.push({
                            Color: next.Color,
                            type: [
                                {
                                    _id: next._id,
                                    Name: next.Name,
                                    Price: next.Price,
                                    Sale: next.Sale,
                                    Amount: next.Amount,
                                    Sold: next.Sold,
                                },
                            ],
                        });
                    }
                } else {
                    pre.push({
                        Color: next.Color,
                        type: [
                            {
                                _id: next._id,
                                Name: next.Name,
                                Price: next.Price,
                                Sale: next.Sale,
                                Amount: next.Amount,
                                Sold: next.Sold,
                            },
                        ],
                    });
                }
                return pre;
            }, []);
            setFilterType(result);
            const data = result.find((product) => product.Color == typeSelect.Color);
            setTypeByColor(data);
        }
    }, [productDetail.TypesProduct]);

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
                    <span className={clsx(styles.showDescription)}>{`(${typeSelect.Name} ${
                        filterType[0]?.Color && '- ' + typeByColor?.Color
                    })`}</span>
                </h2>
                <div className={clsx(styles.priceInfo)}>
                    <span className={clsx(styles.titlePrice)}>Giá: </span>
                    {typeSelect.Sale === 0 ? (
                        <span className={clsx(styles.price)}>
                            {new Intl.NumberFormat('de-DE').format(typeSelect.Price)} VNĐ
                        </span>
                    ) : (
                        <>
                            <span className={clsx(styles.sale)}>
                                {new Intl.NumberFormat('de-DE').format(typeSelect.Sale)} VNĐ
                            </span>
                            <span className={clsx(styles.salePrice)}>
                                {new Intl.NumberFormat('de-DE').format(typeSelect.Price)} VNĐ
                            </span>
                        </>
                    )}
                </div>
                <div className={clsx(styles.wrapperType)}>
                    <div className={clsx(styles.wrapperItem)}>
                        {typeByColor.type &&
                            typeByColor?.type.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            className={clsx(styles.item, {
                                                [styles.active]: item.Name === typeSelect.Name,
                                                [styles.soldOut]: item.Amount <= 0,
                                            })}
                                            onClick={item.Amount <= 0 ? undefined : () => handleSelectType(item)}
                                        >
                                            <p className={clsx(styles.typeDescription)}>{item.Name}</p>
                                            <p className={clsx(styles.typePrice)}>
                                                {item.Sale !== 0
                                                    ? new Intl.NumberFormat().format(item.Sale)
                                                    : item.Price}{' '}
                                                VNĐ
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    {filterType[0]?.Color && (
                        <div className={clsx(styles.wrapperColor)}>
                            <h4 className={clsx(styles.titleSelectColor)}>Chọn màu để xem giá mặt hàng</h4>
                            <div className={clsx(styles.wrapperItem)}>
                                {filterType.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={clsx(styles.item, {
                                                [styles.active]: item.Color === typeByColor.Color,
                                            })}
                                            onClick={() => handleSelectTypeByColor(item)}
                                        >
                                            <div>
                                                <p className={clsx(styles.typeDescription)}>{item.Color}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.Description) }} />
            </div>
        </div>
    );
}

export default DetailProduct;
