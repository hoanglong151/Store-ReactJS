import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Sliders from '~/components/Sliders/Slider';
import classnames from 'classnames/bind';
import styles from './DetailProduct.module.scss';

const cx = classnames.bind(styles);

function DetailProduct() {
    const { state } = useLocation();
    const { product } = state;
    const [productDetail, setProductDetail] = useState({});
    const [typeByColor, setTypeByColor] = useState({});
    const [typeSelect, setTypeSelect] = useState({});
    const [filterType, setFilterType] = useState([]);
    useEffect(() => {
        const mapCategories = product.Category_ID.map((category) => ({
            value: category._id,
            label: category.Name,
        }));

        const getTypeCheap = product.TypesProduct.reduce((pre, next) => {
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

        const detailProduct = { ...product, Category_ID: mapCategories };
        setProductDetail(detailProduct);
    }, [product]);

    const handleSelectTypeByColor = (type) => {
        setTypeByColor(type);
        setTypeSelect(type.type[0]);
    };

    const handleSelectType = (type) => {
        setTypeSelect(type);
    };

    useEffect(() => {
        if (productDetail.TypesProduct) {
            const result = productDetail.TypesProduct.reduce((pre, next) => {
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
                                            Images: next.Images,
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
                                    Images: next.Images,
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
                                Images: next.Images,
                                Sold: next.Sold,
                            },
                        ],
                    });
                }
                return pre;
            }, []);
            setFilterType(result);
            const data = result.find((product) => product.Color === typeSelect.Color);
            setTypeByColor(data);
        }
    }, [productDetail.TypesProduct]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('images')}>
                <Sliders data={typeSelect.Images || []} />
                <div className={cx('action')}>
                    <Link to={`/Admin/Products/EditProduct`} state={{ product: product }} className={cx('btn')}>
                        Edit
                    </Link>
                </div>
            </div>
            <div className={cx('content')}>
                <h1 className={cx('content__title')}>Giới Thiệu Sản Phẩm</h1>
                <h2 className={cx('content__name-product')}>
                    {productDetail.Name}
                    <span className={cx('show-description')}>{`(${typeSelect.Name} ${
                        filterType[0]?.Color && '- ' + typeByColor?.Color
                    })`}</span>
                </h2>
                <div className={cx('price-info')}>
                    <span className={cx('title-price')}>Giá: </span>
                    {typeSelect.Sale === 0 ? (
                        <span className={cx('price')}>
                            {new Intl.NumberFormat('de-DE').format(typeSelect.Price)} VNĐ
                        </span>
                    ) : (
                        <>
                            <span className={cx('sale')}>
                                {new Intl.NumberFormat('de-DE').format(typeSelect.Sale)} VNĐ
                            </span>
                            <span className={cx('sale-price')}>
                                {new Intl.NumberFormat('de-DE').format(typeSelect.Price)} VNĐ
                            </span>
                        </>
                    )}
                </div>
                <div className={cx('wrapper-type')}>
                    <div className={cx('wrapper-item')}>
                        {typeByColor.type &&
                            typeByColor?.type.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            className={cx('item', {
                                                active: item.Name === typeSelect.Name,
                                                soldOut: item.Amount <= 0,
                                            })}
                                            onClick={item.Amount <= 0 ? undefined : () => handleSelectType(item)}
                                        >
                                            <p className={cx('type-description')}>{item.Name}</p>
                                            <p className={cx('type-price')}>
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
                        <div className={cx('wrapper-color')}>
                            <h4 className={cx('title-select-color')}>Chọn màu để xem giá mặt hàng</h4>
                            <div className={cx('wrapper-item')}>
                                {filterType.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={cx('item', {
                                                active: item.Color === typeByColor.Color,
                                            })}
                                            onClick={() => handleSelectTypeByColor(item)}
                                        >
                                            <div>
                                                <p className={cx('type-description')}>{item.Color}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div
                className={cx('description')}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.Description) }}
            />
        </div>
    );
}

export default DetailProduct;
